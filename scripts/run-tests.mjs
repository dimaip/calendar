import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pendingDirectories = [path.join(repositoryRoot, 'app')];
const testFiles = [];

while (pendingDirectories.length > 0) {
    const directory = pendingDirectories.pop();

    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        const entryPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            pendingDirectories.push(entryPath);
        } else if (entry.isFile() && entry.name.endsWith('.test.mjs')) {
            testFiles.push(entryPath);
        }
    }
}

testFiles.sort();

if (testFiles.length === 0) {
    console.error('No *.test.mjs files were found below app.');
    process.exit(1);
}

console.log(`Running ${testFiles.length} frontend test files.`);

const result = spawnSync(
    process.execPath,
    [path.join(repositoryRoot, 'node_modules/tsx/dist/cli.mjs'), '--test', ...testFiles],
    {
        cwd: repositoryRoot,
        stdio: 'inherit',
    }
);

if (result.error) {
    console.error(result.error);
    process.exit(1);
}

process.exit(result.status ?? 1);
