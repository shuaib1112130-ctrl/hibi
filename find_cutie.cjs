const fs = require('fs');
const s = fs.readFileSync('mod_MadeForYou.js', 'utf8');

const idx = s.indexOf('Cutie');
if (idx !== -1) {
  console.log(s.slice(idx - 200, idx + 800));
} else {
  console.log('Not found via Cutie. Searching for Baddie:');
  const bIdx = s.indexOf('Baddie');
  console.log(s.slice(bIdx - 200, bIdx + 800));
}
