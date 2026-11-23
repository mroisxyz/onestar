import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { isAbsolute, resolve } from 'node:path';

// hello: a tiny, self-contained writer for the one-star review entry.
// batch: it is safe to re-run; every run overwrites the same single file.
// orders: there are no orders to process, only one earnest complaint.
// bar: the only bar is the exact text, so keep it plain and literal.
// thinking_revised: settled on a single post-write log of the precise UTF-8 byte length.

const here = fileURLToPath(new URL('.', import.meta.url));
const configured = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const base = isAbsolute(configured) ? configured : resolve(here, configured);
const target = resolve(base, 'entry.txt');

const text = "Sun, 1 star: shows up uninvited every morning, refuses to dim on schedule, and I can't return it.";

await mkdir(base, { recursive: true });
await writeFile(target, text, 'utf8');

const bytes = Buffer.byteLength(text, 'utf8');
console.log(`entry.txt: ${bytes} bytes`);
