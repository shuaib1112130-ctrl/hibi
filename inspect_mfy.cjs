const fs = require('fs');
const s = fs.readFileSync('comp_MadeForYou.js', 'utf8');

// Find the export or main component in comp_MadeForYou.js
const expMatch = s.match(/e\.s\(\[[^\]]*\]/);
console.log('Export match:', expMatch ? expMatch[0] : 'not found');

// Print last 4000 characters of comp_MadeForYou.js
console.log(s.slice(s.length - 4000));
