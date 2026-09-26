const fs = require('fs');

const html = fs.readFileSync('vercel_index.html', 'utf8');

// Match sections
const secRegex = /<section\b[^>]*>([\s\S]*?)<\/section>/gi;
let match;
let count = 0;
while ((match = secRegex.exec(html)) !== null) {
  count++;
  fs.writeFileSync(`vercel_sec${count}.html`, match[0]);
  console.log(`Saved vercel_sec${count}.html, length: ${match[0].length}`);
}

// Also check any script/json payloads or next.js __NEXT_DATA__
const nextDataMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
if (nextDataMatch) {
  fs.writeFileSync('vercel_next_data.json', nextDataMatch[1]);
  console.log('Saved vercel_next_data.json');
} else {
  console.log('No __NEXT_DATA__ script found');
}
