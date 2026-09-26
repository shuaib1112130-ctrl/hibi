const fs = require('fs');
const s = fs.readFileSync('raw_CurvedMarquee.js', 'utf8');

// Look at the return statement of Q
const returnIdx = s.lastIndexOf('return(');
console.log('Return statement:');
console.log(s.slice(returnIdx));
