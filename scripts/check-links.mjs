import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const root = new URL('../dist/', import.meta.url);
const rootPath = decodeURIComponent(root.pathname);
const htmlFiles = [];

function collect(directory) {
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) collect(path);
    else if (path.endsWith('.html')) htmlFiles.push(path);
  }
}

function routeFor(path) {
  const route = `/${relative(rootPath, path).replaceAll('\\', '/')}`;
  return route.endsWith('/index.html') ? route.slice(0, -10) || '/' : route;
}

function targetFor(pathname) {
  const clean = decodeURIComponent(pathname).replace(/^\//, '');
  const candidates = extname(clean)
    ? [join(rootPath, clean)]
    : [join(rootPath, clean, 'index.html'), join(rootPath, `${clean}.html`)];
  return candidates.find(existsSync);
}

collect(rootPath);
const errors = [];

for (const source of htmlFiles) {
  const html = readFileSync(source, 'utf8');
  const route = routeFor(source);
  for (const match of html.matchAll(/\shref=["']([^"']+)["']/g)) {
    const href = match[1];
    if (/^(?:https?:|mailto:|tel:|javascript:)/.test(href)) continue;
    const url = new URL(href, `https://toolbunker.dev${route}`);
    const target = targetFor(url.pathname);
    if (!target) {
      errors.push(`${route}: missing ${href}`);
      continue;
    }
    if (!url.hash || !target.endsWith('.html')) continue;
    const targetHtml = readFileSync(target, 'utf8');
    const id = decodeURIComponent(url.hash.slice(1)).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (!new RegExp(`\\sid=["']${id}["']`).test(targetHtml)) {
      errors.push(`${route}: missing anchor ${href}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Checked ${htmlFiles.length} HTML files: internal links resolve.`);
}
