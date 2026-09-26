const fs = require('fs');
const s = fs.readFileSync('sec5_full.js', 'utf8');

// Find audio
const audioMatches = s.match(/https?:[^\s"'`]+\.(?:mp3|wav|ogg|m4a)|\/[^\s"'`]+\.(?:mp3|wav|ogg|m4a)/g);
console.log('Audio files:', audioMatches);

// Find JSX or text
const textMatches = [...s.matchAll(/>([^<>{}]*[\w]{3,}[^<>{}]*)</g)].map(m => m[1].trim()).filter(Boolean);
console.log('JSX text:', textMatches);

// Look for component names or hooks
console.log('Canvas or 3D:', s.includes('Canvas'), s.includes('OrbitControls'), s.includes('Sphere'));
