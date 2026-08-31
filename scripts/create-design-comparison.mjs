import process from 'node:process';
import sharp from 'sharp';

const [referencePath, implementationPath, outputPath, mode = 'desktop'] = process.argv.slice(2);

if (!referencePath || !implementationPath || !outputPath) {
  console.error('Usage: node scripts/create-design-comparison.mjs <reference> <implementation> <output>');
  process.exit(1);
}

const isMobile = mode === 'mobile';
const width = isMobile ? 372 : 1136;
const height = 1024;
const gutter = 20;
const referenceLeft = isMobile ? 1164 : 0;

const reference = await sharp(referencePath)
  .extract({ left: referenceLeft, top: 0, width, height })
  .png()
  .toBuffer();

const implementation = await sharp(implementationPath)
  .resize(width, height, { fit: 'fill' })
  .png()
  .toBuffer();

await sharp({
  create: {
    width: width * 2 + gutter,
    height,
    channels: 3,
    background: '#d7d4cc',
  },
})
  .composite([
    { input: reference, left: 0, top: 0 },
    { input: implementation, left: width + gutter, top: 0 },
  ])
  .png()
  .toFile(outputPath);

console.log(`디자인 비교 이미지 생성: ${outputPath}`);
