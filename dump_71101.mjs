import fs from 'fs';

const step64Path = 'C:\\Users\\dell\\.gemini\\antigravity-ide\\brain\\d616bc3d-ba04-4cf1-ba67-97be3426f531\\.system_generated\\steps\\64\\content.md';
const content = fs.readFileSync(step64Path, 'utf8');

const target = '71101, definition:';
const pattern = 'e.s(["default",0,function(){let[e,t]=(0,C.useState)(!1)';
const idx = content.indexOf(pattern);
console.log('Match idx:', idx);
if (idx !== -1) {
  // Grab before and after
  console.log(content.slice(idx - 1500, idx + 4000));
}
