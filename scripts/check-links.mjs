import { access, readdir, readFile } from 'node:fs/promises';
import { dirname, extname, join, normalize } from 'node:path';
import process from 'node:process';

const projectRoot = new URL('../', import.meta.url).pathname;
const distRoot = join(projectRoot, 'dist');

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    if (entry.isFile()) files.push(path);
  }
  return files;
}

const files = await walk(distRoot);
const htmlFiles = files.filter((file) => extname(file) === '.html');
const failures = [];

function candidatePaths(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split('#')[0].split('?')[0]);
  if (cleanPath === '/' || cleanPath === '') return [join(distRoot, 'index.html')];

  const relativePath = cleanPath.replace(/^\//u, '');
  if (extname(relativePath)) return [join(distRoot, relativePath)];

  return [
    join(distRoot, relativePath),
    join(distRoot, relativePath, 'index.html'),
    join(distRoot, `${relativePath}.html`),
  ];
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

for (const htmlFile of htmlFiles) {
  const html = await readFile(htmlFile, 'utf8');
  const ids = new Set([...html.matchAll(/\sid=["']([^"']+)["']/gu)].map((match) => match[1]));
  const links = [...html.matchAll(/\s(?:href|src)=["']([^"']+)["']/gu)].map((match) => match[1]);

  for (const link of links) {
    if (link.startsWith('data:')) continue;
    if (link.startsWith('http://')) {
      failures.push(`${htmlFile}: 안전하지 않은 외부 링크 ${link}`);
      continue;
    }
    if (link.startsWith('https://') || link.startsWith('tel:')) continue;
    if (link.startsWith('#')) {
      const id = link.slice(1);
      if (id && !ids.has(id)) failures.push(`${htmlFile}: 존재하지 않는 앵커 ${link}`);
      continue;
    }

    const linkPath = link.startsWith('/')
      ? link
      : normalize(join('/', dirname(htmlFile.slice(distRoot.length + 1)), link));
    const candidates = candidatePaths(linkPath);
    if (!(await Promise.all(candidates.map(exists))).some(Boolean)) {
      failures.push(`${htmlFile}: 존재하지 않는 내부 링크 ${link}`);
    }
  }
}

if (failures.length > 0) {
  console.error('정적 링크 검사 실패');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`정적 링크 검사 통과: HTML ${htmlFiles.length}개`);
