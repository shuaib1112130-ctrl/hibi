const fs = require('fs');
const s = fs.readFileSync('mod_HeroSection.js', 'utf8');

const qIdx = s.indexOf('let Q=({children:e');
const qEndIdx = s.indexOf('ee=[{src:"/ref/heart.jpg"}');

console.log('Q length:', qEndIdx - qIdx);
fs.writeFileSync('raw_CurvedMarquee.js', s.slice(qIdx, qEndIdx));
console.log('Saved raw_CurvedMarquee.js');
