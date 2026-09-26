const fs = require('fs');
const s = fs.readFileSync('comp_HeroSection.js', 'utf8');
const qCallIdx = s.indexOf('(0,t.jsx)(Q,');
console.log(s.slice(qCallIdx, qCallIdx + 4000));
