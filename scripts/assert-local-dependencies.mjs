import { realpathSync } from 'node:fs';
import { join } from 'node:path';

// Shared/symlinked dependencies change webpack's relative module and loader
// identifiers. Production builds must use the same layout as a normal install.
export function assertLocalDependencies(root) {
    const dependencies = join(realpathSync(root), 'node_modules');
    if (realpathSync(dependencies) !== dependencies) {
        throw new Error(
            "Production builds require checkout-local node_modules. Install with yarn install --frozen-lockfile; do not share another checkout's dependencies."
        );
    }
}
