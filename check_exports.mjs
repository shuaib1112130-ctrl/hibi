import fs from 'fs';

const step64Path = 'C:\\Users\\dell\\.gemini\\antigravity-ide\\brain\\d616bc3d-ba04-4cf1-ba67-97be3426f531\\.system_generated\\steps\\64\\content.md';
const content = fs.readFileSync(step64Path, 'utf8');

const regex = /e\.s\(\[[\s\S]*?\]\s*,\s*(\d+)\)/g;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log(`Module ID: ${match[1]}, definition: ${match[0].slice(0, 150)}`);
}
