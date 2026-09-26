const fs = require('fs');
const s = fs.readFileSync('mod_HeroSection.js', 'utf8');
const idx = s.indexOf('/ref/');
if (idx !== -1) {
  console.log(s.slice(idx - 100, idx + 600));
} else {
  console.log('No /ref/ in mod_HeroSection.js? Searching for .jpg:');
  const jpgIdx = s.indexOf('.jpg');
  console.log(s.slice(jpgIdx - 100, jpgIdx + 600));
}
