import { execSync, spawnSync } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const files = await fs.readdir(dirname);
const outDir = path.resolve(dirname, '../img');
for (const file of files) {
  if (file.endsWith('.txt')) {
    console.log(`==== Processing ${file}`);
    const result = spawnSync('mmdc', ['-i', file, '-o', path.join(outDir, path.basename(file, '.txt') + '.svg')], {
      stdio: 'inherit',
      shell: true,
      env: {
        PATH: process.env.PATH + path.delimiter + path.resolve(dirname, 'node_modules/.bin'),
      }
    });
    if (result.error) {
      throw result.error;
    }
    if (result.status !== 0) {
      process.exit(result.status);
    }
  }
}
