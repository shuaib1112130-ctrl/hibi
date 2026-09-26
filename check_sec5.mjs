import fs from 'fs';

const step64Path = 'C:\\Users\\dell\\.gemini\\antigravity-ide\\brain\\d616bc3d-ba04-4cf1-ba67-97be3426f531\\.system_generated\\steps\\64\\content.md';
const content = fs.readFileSync(step64Path, 'utf8');

const id71101 = '71101,';
const idx = content.indexOf(id71101);
console.log('71101 index:', idx);

// find next module header like ',12345,' or '],[12345,' or similar
// Let's search for "default" after idx
const defIdx = content.indexOf('"default"', idx);
console.log('"default" after 71101:', defIdx);
if (defIdx !== -1) {
  console.log(content.slice(defIdx - 100, defIdx + 1500));
}
