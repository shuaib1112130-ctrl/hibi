const fs = require('fs');
const s = fs.readFileSync('comp_MadeForYou.js', 'utf8');
const expIdx = s.indexOf('e.s(["default"');
console.log(s.slice(expIdx, expIdx + 4000));
