const fs = require('fs');
const s = fs.readFileSync('C:\\Users\\dell\\.gemini\\antigravity-ide\\brain\\d616bc3d-ba04-4cf1-ba67-97be3426f531\\.system_generated\\steps\\389\\content.md', 'utf8');
const sections = s.split('<section class="h-screen');
console.log('Found sections:', sections.length);
sections.slice(1).forEach((sec, i) => {
  console.log(`=== Section ${i + 1} ===`);
  console.log(sec.slice(0, 300));
});
