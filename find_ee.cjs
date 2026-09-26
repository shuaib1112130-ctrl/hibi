const fs = require('fs');
const s = fs.readFileSync('comp_HeroSection.js', 'utf8');
const match = s.match(/(?:let|var|const)\s+ee\s*=\s*(\[[^\]]*\])/);
if (match) {
  console.log('Found ee:', match[1]);
} else {
  // search for /ref/
  const idx = s.indexOf('/ref/');
  console.log(s.slice(idx - 100, idx + 400));
}
