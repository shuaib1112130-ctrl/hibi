import fs from 'fs';

const step64Path = 'C:\\Users\\dell\\.gemini\\antigravity-ide\\brain\\d616bc3d-ba04-4cf1-ba67-97be3426f531\\.system_generated\\steps\\64\\content.md';
const content = fs.readFileSync(step64Path, 'utf8');

const modules = [
  { id: 55415, name: 'HeroSection' },
  { id: 85470, name: 'MadeForYou' },
  { id: 39426, name: 'ScrapbookPageFlip' },
  { id: 71101, name: 'Section5' },
];

for (const mod of modules) {
  const searchStr = `${mod.id},e=>{`;
  const idx = content.indexOf(searchStr);
  if (idx !== -1) {
    // Find the next module definition or take 15000 chars
    const slice = content.slice(idx, idx + 25000);
    fs.writeFileSync(`mod_${mod.name}.js`, slice);
    console.log(`Saved mod_${mod.name}.js, length ${slice.length}`);
  } else {
    const fallbackIdx = content.indexOf(String(mod.id));
    console.log(`Fallback for ${mod.name}: idx ${fallbackIdx}`);
    if (fallbackIdx !== -1) {
      const slice = content.slice(fallbackIdx, fallbackIdx + 25000);
      fs.writeFileSync(`mod_${mod.name}.js`, slice);
    }
  }
}
