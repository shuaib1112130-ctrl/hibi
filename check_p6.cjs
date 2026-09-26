const fs = require('fs');
const s = fs.readFileSync('mod_ScrapbookPageFlip.js', 'utf8');

const p6Idx = s.indexOf('girl5.jpg');
console.log(s.slice(p6Idx - 200, p6Idx + 500));
