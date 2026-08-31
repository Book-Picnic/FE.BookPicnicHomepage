import { readdir, readFile, stat } from 'node:fs/promises';
import { extname, join } from 'node:path';
import process from 'node:process';

const projectRoot = new URL('../', import.meta.url).pathname;
const mode = process.argv.includes('--dist') ? 'dist' : 'source';
const roots = mode === 'dist' ? ['dist'] : ['src', 'public'];
const textExtensions = new Set(['.astro', '.css', '.html', '.js', '.json', '.mjs', '.ts', '.txt', '.xml']);
const excludedTextFiles = new Set(['public/fonts/Pretendard-LICENSE.txt', 'dist/fonts/Pretendard-LICENSE.txt']);
const banned = [
  ['공개하지 않을 정보: 가격', /가격/u],
  ['공개하지 않을 정보: 시간표', /시간표/u],
  ['공개하지 않을 정보: 모집 마감', /모집\s*마감/u],
  ['공개하지 않을 정보: 잔여 자리', /잔여\s*자리/u],
  ['공개하지 않을 정보: 팔로워 수', /팔로워/u],
  ['개인 생활 계정', /@yj_palette/iu],
  ['로컬 절대경로', /\/Users\//u],
  ['원본 사진 파일명', /KakaoTalk_Photo_/u],
  ['원본 자료 폴더', /images\/originals/u],
  ['환경 파일명', /(?:^|[/'"`])\.env(?:\.|[/'"`]|$)/mu],
  ['em dash', /—/u],
  ['en dash', /–/u],
];

async function walk(directory) {
  const fullDirectory = join(projectRoot, directory);
  const entries = await readdir(fullDirectory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relativePath = join(directory, entry.name);
    if (entry.name === '.DS_Store') {
      throw new Error(`금지된 파일이 있습니다: ${relativePath}`);
    }
    if (entry.isDirectory()) files.push(...await walk(relativePath));
    if (entry.isFile()) files.push(relativePath);
  }

  return files;
}

const allFiles = (await Promise.all(roots.map(walk))).flat();
const failures = [];

for (const file of allFiles) {
  if (excludedTextFiles.has(file) || !textExtensions.has(extname(file))) continue;
  const content = await readFile(join(projectRoot, file), 'utf8');
  for (const [label, pattern] of banned) {
    if (pattern.test(content)) failures.push(`${file}: ${label}`);
  }
}

const publicImageRoot = mode === 'dist' ? 'dist/images' : 'public/images';
const publicImages = allFiles.filter((file) => file.startsWith(`${publicImageRoot}/`));
const allowedImageExtensions = new Set(['.avif', '.webp', '.jpg', '.png']);

for (const image of publicImages) {
  const fileStat = await stat(join(projectRoot, image));
  if (!allowedImageExtensions.has(extname(image).toLowerCase())) {
    failures.push(`${image}: 허용되지 않은 공개 이미지 형식`);
  }
  if (fileStat.size > 700_000) {
    failures.push(`${image}: 공개 이미지가 700 KB를 초과함`);
  }
}

if (failures.length > 0) {
  console.error(`공개 콘텐츠 검사 실패 (${mode})`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`공개 콘텐츠 검사 통과 (${mode}): ${allFiles.length}개 파일`);
