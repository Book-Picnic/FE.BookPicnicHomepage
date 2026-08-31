import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const root = resolve(import.meta.dirname, '..');
const sourceArgument = process.argv[2];

if (!sourceArgument) {
  console.error('Usage: node scripts/generate-profile-assets.mjs <private-source-image>');
  process.exit(1);
}

const source = resolve(process.cwd(), sourceArgument);
const output = resolve(root, 'public/images/profile');

await mkdir(output, { recursive: true });

const hero = sharp(source).rotate().resize({
  width: 1280,
  height: 1600,
  fit: 'cover',
  position: 'centre',
});

await Promise.all([
  hero.clone().avif({ quality: 72, effort: 6 }).toFile(resolve(output, 'kim-yoonjung-hero-1280.avif')),
  hero.clone().webp({ quality: 84, effort: 6 }).toFile(resolve(output, 'kim-yoonjung-hero-1280.webp')),
  sharp(source)
    .rotate()
    .resize({ width: 760, height: 950, fit: 'cover', position: 'centre' })
    .avif({ quality: 70, effort: 6 })
    .toFile(resolve(output, 'kim-yoonjung-hero-760.avif')),
  sharp(source)
    .rotate()
    .resize({ width: 760, height: 950, fit: 'cover', position: 'centre' })
    .webp({ quality: 82, effort: 6 })
    .toFile(resolve(output, 'kim-yoonjung-hero-760.webp')),
  sharp(source)
    .rotate()
    .resize({ width: 1200, height: 630, fit: 'cover', position: 'attention' })
    .jpeg({ quality: 86, progressive: true, chromaSubsampling: '4:4:4' })
    .toFile(resolve(output, 'bookpicnic-og.jpg')),
  sharp(source)
    .rotate()
    .resize({ width: 180, height: 180, fit: 'cover', position: 'attention' })
    .png({ compressionLevel: 9 })
    .toFile(resolve(root, 'public/apple-touch-icon.png')),
  sharp(source)
    .rotate()
    .resize({ width: 64, height: 64, fit: 'cover', position: 'attention' })
    .png({ compressionLevel: 9 })
    .toFile(resolve(root, 'public/favicon.png')),
]);

console.log(`Generated public profile assets in ${output}`);
