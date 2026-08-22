import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const failures = [];

function requireMatch(pattern, message) {
  if (!pattern.test(html)) failures.push(message);
}

requireMatch(/<!doctype html>/i, 'index.html must declare an HTML5 doctype');
requireMatch(/<canvas\s+id="game"/, 'index.html must include the game canvas');
requireMatch(/<link\s+rel="manifest"/, 'index.html must link the web manifest');
requireMatch(/smoke-mode/, 'compact smoke-mode layout hooks must remain present');

if (/user-scalable\s*=\s*no/i.test(html)) {
  failures.push('viewport metadata must not disable user zoom');
}

const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
if (duplicateIds.length) failures.push(`duplicate HTML ids: ${duplicateIds.join(', ')}`);

const scriptBlocks = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
if (!scriptBlocks.length) failures.push('index.html must contain game JavaScript');

for (const [index, block] of scriptBlocks.entries()) {
  try {
    const attributes = block[0].slice(0, block[0].indexOf('>'));
    const moduleArgs = /type=["']module["']/i.test(attributes) ? ['--input-type=module'] : [];
    execFileSync(process.execPath, [...moduleArgs, '--check', '-'], {
      input: block[1],
      stdio: ['pipe', 'pipe', 'pipe'],
    });
  } catch (error) {
    failures.push(`inline script ${index + 1}: ${error.stderr?.toString().trim() || error.message}`);
  }
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'));
  process.exit(1);
}

console.log(`Project checks passed: ${ids.length} unique ids and ${scriptBlocks.length} valid inline script.`);
