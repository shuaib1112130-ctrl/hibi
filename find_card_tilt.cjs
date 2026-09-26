const fs = require('fs');
const s = fs.readFileSync('mod_MadeForYou.js', 'utf8');

const idx = s.indexOf('lassName:(0,r.cn)("[perspective:3000px]');
console.log(s.slice(idx - 1500, idx + 200));
