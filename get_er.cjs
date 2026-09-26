const fs = require('fs');
const s = fs.readFileSync('mod_MadeForYou.js', 'utf8');

const idx = s.indexOf('s.motion.div,{ref:d,drag:!0');
console.log(s.slice(idx - 1200, idx + 100));
