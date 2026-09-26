const fs = require('fs');
const s = fs.readFileSync('comp_MadeForYou.js', 'utf8');

const m1 = s.match(/(?:let|var|const)\s+es\s*=\s*(\[[^\]]*\])/);
console.log('es (images):', m1 ? m1[1] : 'not found');

const m2 = s.match(/(?:let|var|const)\s+eo\s*=\s*(\[[^\]]*\])/);
console.log('eo (labels):', m2 ? m2[1] : 'not found');

const m3 = s.match(/(?:let|var|const)\s+el\s*=\s*(\[[^\]]*\])/);
console.log('el (positions/classes):', m3 ? m3[1] : 'not found');
