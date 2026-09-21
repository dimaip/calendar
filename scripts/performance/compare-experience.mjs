import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { compareExperienceReports } from './lib/experience-artifacts.mjs';
import { parseComparisonArguments } from './lib/experience-options.mjs';

const readReport = (file, label, incompatibilities) => {
    try {
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (error) {
        incompatibilities.push(`${label} report ${file} could not be read as JSON: ${String(error?.message ?? error)}`);
        return null;
    }
};

export const runExperienceComparison = (options) => {
    const readIncompatibilities = [];
    const baseline = readReport(options.baseline, 'Baseline', readIncompatibilities);
    const candidate = readReport(options.candidate, 'Candidate', readIncompatibilities);
    const result = compareExperienceReports({ ...options, baseline, candidate });
    const incompatibilities = [...readIncompatibilities, ...result.incompatibilities];
    return {
        ...result,
        baseline: options.baseline,
        candidate: options.candidate,
        compatible: result.compatible && readIncompatibilities.length === 0,
        incompatibilities,
        passed: result.passed && readIncompatibilities.length === 0,
        recordedAt: new Date().toISOString(),
        schemaVersion: 1,
    };
};

export const writeExperienceComparison = (output, comparison) => {
    const target = path.resolve(output);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, `${JSON.stringify(comparison, null, 2)}\n`, { flag: 'wx' });
    return target;
};

const main = () => {
    const options = parseComparisonArguments();
    let comparison = runExperienceComparison(options);
    try {
        writeExperienceComparison(options.output, comparison);
    } catch (error) {
        comparison = {
            ...comparison,
            compatible: false,
            incompatibilities: [
                ...comparison.incompatibilities,
                `Comparison output ${options.output} was not written: ${String(error?.message ?? error)}`,
            ],
            passed: false,
        };
    }
    process.stdout.write(`${JSON.stringify(comparison, null, 2)}\n`);
    if (!comparison.passed) process.exitCode = 1;
};

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
