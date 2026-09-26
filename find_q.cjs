const fs = require('fs');
const s = fs.readFileSync('mod_HeroSection.js', 'utf8');

// Find where Q or the marquee component is defined
const qIdx = s.indexOf('function Q(');
if (qIdx !== -1) {
  console.log('Found function Q:');
  console.log(s.slice(qIdx, qIdx + 3000));
} else {
  // Let's find const Q = or var Q =
  const match = s.match(/(?:function|const|var|let)\s+Q\s*=?\s*(\([^)]*\)|function)/);
  if (match) {
    const idx = match.index;
    console.log(s.slice(idx, idx + 3000));
  }
}
