import fs from 'fs';

const raw = fs.readFileSync('sec5_full.js', 'utf8');

// Find card data, audio data, state, etc.
const cardMatch = raw.match(/cards:\[[\s\S]*?\]/);
if (cardMatch) {
  console.log('Cards found:', cardMatch[0].slice(0, 1000));
} else {
  // Let's search for things like title, audio, sound, music, etc.
  const audioIdx = raw.indexOf('audio');
  console.log('Audio idx:', audioIdx);
  if (audioIdx !== -1) {
    console.log(raw.slice(audioIdx - 100, audioIdx + 500));
  }
}

// Let's search for all string literals or object definitions
const objMatches = [...raw.matchAll(/(\w+)=\[([\s\S]*?)\];/g)];
for (const m of objMatches) {
  if (m[2].includes('src') || m[2].includes('title') || m[2].includes('url') || m[2].includes('id:')) {
    console.log(`Array ${m[1]}:`, m[2].slice(0, 500));
  }
}
