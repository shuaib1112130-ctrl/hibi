const fs = require('fs');

const sec4 = fs.readFileSync('vercel_sec4.html', 'utf8');
console.log('Sec4 total length:', sec4.length);

const imgs = [];
const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
let m;
while ((m = imgRegex.exec(sec4)) !== null) {
  imgs.push(m[1]);
}
console.log('Images in sec4 count:', imgs.length);
console.log('Unique images:', Array.from(new Set(imgs)));

// Find all pages
const pageRegex = /<div class="[^"]*page[^"]*"[\s\S]*?(?=<div class="[^"]*page[^"]*"|$)/g;
// Or check classes inside sec4
const classes = new Set();
const classRegex = /class="([^"]+)"/g;
while ((m = classRegex.exec(sec4)) !== null) {
  m[1].split(/\s+/).forEach(c => classes.add(c));
}
console.log('Classes containing book or page:');
Array.from(classes).filter(c => /book|page|flip|scrap/i.test(c)).forEach(c => console.log(' ', c));

// Also print the structure of top-level children in sec4
const clean = sec4.replace(/><(?!\/)/g, '>\n<');
fs.writeFileSync('vercel_sec4_formatted.html', clean);
console.log('Saved vercel_sec4_formatted.html');
