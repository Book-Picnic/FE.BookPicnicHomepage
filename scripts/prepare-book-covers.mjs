import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const [sourceDirectory, outputDirectory = 'public/images/books'] = process.argv.slice(2);

if (!sourceDirectory) {
  throw new Error('Usage: node scripts/prepare-book-covers.mjs <source-directory> [output-directory]');
}

const covers = [
  ['moonhaenaegong.jpg', 'moonhaenaegong'],
  ['ebs-literacy.jpg', 'ebs-literacy'],
  ['elementary-literacy.jpg', 'elementary-literacy'],
  ['elementary-writing.jpg', 'elementary-writing'],
];

await mkdir(outputDirectory, { recursive: true });

for (const [sourceName, outputName] of covers) {
  const sourcePath = path.join(sourceDirectory, sourceName);
  const base = sharp(sourcePath).rotate().resize({ width: 500, withoutEnlargement: true });

  await Promise.all([
    base.clone().avif({ quality: 74, effort: 8 }).toFile(path.join(outputDirectory, `${outputName}.avif`)),
    base.clone().webp({ quality: 84, effort: 6 }).toFile(path.join(outputDirectory, `${outputName}.webp`)),
  ]);
}
