const fs = require('fs');

console.log('=== COMPARING BIRTHDAY.HTML ===');
const localBday = fs.readFileSync('birthday.html', 'utf8');
const refBday = fs.readFileSync('ref_birthday.html', 'utf8');

// Check line counts
const localLines = localBday.split('\n');
const refLines = refBday.split('\n');
console.log(`Local lines: ${localLines.length}, Ref lines: ${refLines.length}`);

// Find differences
const max = Math.max(localLines.length, refLines.length);
let diffCount = 0;
for (let i = 0; i < max; i++) {
  if (localLines[i] !== refLines[i]) {
    diffCount++;
    if (diffCount <= 15) {
      console.log(`Line ${i+1}:`);
      console.log(`  LOCAL: ${localLines[i]}`);
      console.log(`  REF  : ${refLines[i]}`);
    }
  }
}
console.log(`Total diff lines in birthday.html: ${diffCount}`);
