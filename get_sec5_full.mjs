import fs from 'fs';

const step64Path = 'C:\\Users\\dell\\.gemini\\antigravity-ide\\brain\\d616bc3d-ba04-4cf1-ba67-97be3426f531\\.system_generated\\steps\\64\\content.md';
const content = fs.readFileSync(step64Path, 'utf8');

const pattern = 'e.s(["default",0,function(){let[e,t]=(0,C.useState)(!1)';
const idx = content.indexOf(pattern);

// Let's go back 12000 chars to find where this component tree starts
const start = Math.max(0, idx - 12000);
const slice = content.slice(start, idx + 2000);
fs.writeFileSync('sec5_full.js', slice);
console.log('Saved sec5_full.js');
