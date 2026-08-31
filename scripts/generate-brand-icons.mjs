import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const projectRoot = process.cwd();
const source = path.join(projectRoot, 'public/favicon.svg');
const outputs = [
  ['public/favicon-16.png', 16],
  ['public/favicon-32.png', 32],
  ['public/favicon.png', 64],
  ['public/apple-touch-icon.png', 180],
];

await Promise.all(
  outputs.map(([output, size]) =>
    sharp(source, { density: 768 })
      .resize(size, size, { fit: 'fill' })
      .png({ compressionLevel: 9, palette: false })
      .toFile(path.join(projectRoot, output)),
  ),
);
