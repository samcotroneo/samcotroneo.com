#!/usr/bin/env node
// Embed a prompt string into a PNG as a tEXt chunk (keyword: "prompt").
// Usage: node embed-prompt.mjs <image.png> --prompt-file <file> | --prompt "<text>"
// One-off replacement for the skill's embed-prompt.mjs, which is absent in this install.
import fs from 'node:fs';

const args = process.argv.slice(2);
const pngPath = args[0];
if (!pngPath || !pngPath.toLowerCase().endsWith('.png')) {
  console.error('usage: embed-prompt.mjs <image.png> --prompt-file <file> | --prompt "<text>"');
  process.exit(1);
}
let prompt = null;
const pi = args.indexOf('--prompt');
const pfi = args.indexOf('--prompt-file');
if (pi !== -1) prompt = args[pi + 1];
else if (pfi !== -1) prompt = fs.readFileSync(args[pfi + 1], 'utf8').trim();
if (!prompt) { console.error('no prompt provided'); process.exit(1); }

// CRC32 (PNG polynomial), same as generate-image.mjs
const crcTable = new Int32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  crcTable[n] = c;
}
function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}
function pngChunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}

let png = fs.readFileSync(pngPath);
const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
if (!png.subarray(0, 8).equals(sig)) { console.error('not a PNG'); process.exit(1); }

// tEXt payload: keyword + NUL + text, Latin-1 safe
const payload = Buffer.concat([
  Buffer.from('prompt', 'latin1'),
  Buffer.from([0]),
  Buffer.from(prompt.replace(/[^\x20-\x7E\n]/g, ' '), 'latin1'),
]);
const textChunk = pngChunk('tEXt', payload);

// Insert right after IHDR (8 sig bytes + 4 len + 4 type + ihdrLen + 4 crc)
const ihdrLen = png.readUInt32BE(8);
const insertAt = 8 + 12 + ihdrLen;
png = Buffer.concat([png.subarray(0, insertAt), textChunk, png.subarray(insertAt)]);
fs.writeFileSync(pngPath, png);

// Verify: walk chunks to confirm structural integrity
let off = 8, ok = true, lastType = '';
while (off < png.length) {
  const len = png.readUInt32BE(off);
  const type = png.subarray(off + 4, off + 8).toString('ascii');
  lastType = type;
  off += 12 + len;
  if (off > png.length) { ok = false; break; }
}
if (!ok || lastType !== 'IEND') { console.error('verification FAILED'); process.exit(1); }
console.log(`embedded prompt tEXt chunk (${payload.length} bytes) -> ${pngPath} [verified]`);
