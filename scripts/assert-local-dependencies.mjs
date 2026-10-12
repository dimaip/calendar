import { lstatSync, realpathSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Shared/symlinked dependencies change webpack's relative module and loader
// identifiers. Production builds must use the same layout as a normal install.
export function assertLocalDependencies(root) {
    const dependencies = join(realpathSync(root), 'node_modules');
    try {
        if (lstatSync(dependencies).isSymbolicLink()) {
            throw new Error(
                'Production builds require checkout-local node_modules. Remove only the shared dependency symlink, then run yarn install --frozen-lockfile.'
            );
        }
    } catch (error) {
        // A fresh checkout can install dependencies after the pre-install gate.
        // lstat still detects and rejects a dangling shared dependency symlink.
        if (error.code !== 'ENOENT') throw error;
    }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    assertLocalDependencies(fileURLToPath(new URL('..', import.meta.url)));
}
