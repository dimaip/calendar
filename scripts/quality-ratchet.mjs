import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const baselinePath = path.join(repositoryRoot, 'quality-baseline.json');
const packageJson = JSON.parse(fs.readFileSync(path.join(repositoryRoot, 'package.json'), 'utf8'));
const toolchain = {
    eslint: packageJson.devDependencies.eslint,
    prettier: packageJson.devDependencies.prettier,
    typescript: packageJson.dependencies.typescript,
    typescriptEslint: packageJson.devDependencies['@typescript-eslint/eslint-plugin'],
};
const mode = process.argv[2] ?? 'all';
const supportedModes = new Set(['all', 'lint', 'types', 'update']);

if (!supportedModes.has(mode)) {
    console.error(`Unknown mode "${mode}". Expected one of: ${[...supportedModes].join(', ')}.`);
    process.exit(2);
}

const runLint = () => {
    const result = spawnSync(
        process.execPath,
        [
            path.join(repositoryRoot, 'node_modules/eslint/bin/eslint.js'),
            'app',
            '--format',
            'json',
        ],
        {
            cwd: repositoryRoot,
            encoding: 'utf8',
            maxBuffer: 64 * 1024 * 1024,
        }
    );

    if (result.error || result.status === null || result.status > 1) {
        throw result.error ?? new Error(result.stderr || `ESLint exited with status ${result.status}.`);
    }

    const reports = JSON.parse(result.stdout);
    const files = {};
    let errors = 0;
    let warnings = 0;

    for (const report of reports) {
        errors += report.errorCount;
        warnings += report.warningCount;

        if (report.messages.length === 0) {
            continue;
        }

        const relativeFile = path.relative(repositoryRoot, report.filePath).split(path.sep).join('/');
        files[relativeFile] = {};

        for (const message of report.messages) {
            const key = `${message.severity === 2 ? 'error' : 'warning'}:${message.ruleId ?? 'fatal'}`;
            files[relativeFile][key] = (files[relativeFile][key] ?? 0) + 1;
        }
    }

    return { errors, warnings, files };
};

const runTypeScript = () => {
    const result = spawnSync(
        process.execPath,
        [path.join(repositoryRoot, 'node_modules/typescript/bin/tsc'), '--noEmit', '--pretty', 'false'],
        {
            cwd: repositoryRoot,
            encoding: 'utf8',
            maxBuffer: 64 * 1024 * 1024,
        }
    );

    if (result.error || result.status === null || result.status > 2) {
        throw result.error ?? new Error(result.stderr || `TypeScript exited with status ${result.status}.`);
    }

    const files = {};
    let diagnostics = 0;

    for (const line of `${result.stdout}\n${result.stderr}`.split(/\r?\n/)) {
        const fileDiagnostic = line.match(/^(.+?)\(\d+,\d+\): error (TS\d+):/);
        const projectDiagnostic = line.match(/^error (TS\d+):/);

        if (!fileDiagnostic && !projectDiagnostic) {
            continue;
        }

        diagnostics += 1;
        const relativeFile = fileDiagnostic
            ? path.relative(repositoryRoot, path.resolve(repositoryRoot, fileDiagnostic[1])).split(path.sep).join('/')
            : '<project>';
        const code = fileDiagnostic?.[2] ?? projectDiagnostic[1];
        files[relativeFile] ??= {};
        files[relativeFile][code] = (files[relativeFile][code] ?? 0) + 1;
    }

    return { diagnostics, files };
};

const compareCategory = (name, current, baseline, totalKeys) => {
    const regressions = [];

    for (const totalKey of totalKeys) {
        if (current[totalKey] > baseline[totalKey]) {
            regressions.push(`${name} ${totalKey}: ${current[totalKey]} (baseline ${baseline[totalKey]})`);
        }
    }

    for (const [file, currentDiagnostics] of Object.entries(current.files)) {
        const baselineDiagnostics = baseline.files[file] ?? {};

        for (const [diagnostic, count] of Object.entries(currentDiagnostics)) {
            const baselineCount = baselineDiagnostics[diagnostic] ?? 0;
            if (count > baselineCount) {
                regressions.push(`${file} ${diagnostic}: ${count} (baseline ${baselineCount})`);
            }
        }
    }

    if (regressions.length > 0) {
        console.error(`${name} quality baseline regressed:\n${regressions.map((item) => `  - ${item}`).join('\n')}`);
        return false;
    }

    console.log(
        `${name} ratchet passed (${totalKeys
            .map((totalKey) => `${current[totalKey]} ${totalKey}, baseline ${baseline[totalKey]}`)
            .join('; ')}).`
    );
    return true;
};

try {
    if (mode === 'update') {
        const baseline = {
            version: 2,
            toolchain,
            lint: runLint(),
            typescript: runTypeScript(),
        };
        fs.writeFileSync(baselinePath, `${JSON.stringify(baseline, null, 2)}\n`);
        console.log(`Updated ${path.relative(repositoryRoot, baselinePath)}.`);
        process.exit(0);
    }

    if (!fs.existsSync(baselinePath)) {
        throw new Error('quality-baseline.json is missing. Run "yarn quality:baseline" intentionally to create it.');
    }

    const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
    if (baseline.version !== 2 || JSON.stringify(baseline.toolchain) !== JSON.stringify(toolchain)) {
        throw new Error(
            'quality-baseline.json was generated for a different toolchain. Run "yarn quality:baseline" intentionally after reviewing the diagnostics.'
        );
    }
    let passed = true;

    if (mode === 'all' || mode === 'lint') {
        passed = compareCategory('ESLint', runLint(), baseline.lint, ['errors', 'warnings']) && passed;
    }

    if (mode === 'all' || mode === 'types') {
        passed = compareCategory('TypeScript', runTypeScript(), baseline.typescript, ['diagnostics']) && passed;
    }

    process.exit(passed ? 0 : 1);
} catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(2);
}
