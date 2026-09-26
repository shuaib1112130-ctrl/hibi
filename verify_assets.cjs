const fs = require('fs');
const path = require('path');

const imgs = new Set();
const checkFiles = ['vercel_sec2.html', 'vercel_sec3.html', 'vercel_sec4.html'];

checkFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const regex = /(?:\/ref\/[a-zA-Z0-9_\.]+|\/pages\/[a-zA-Z0-9_\.]+|\/elements\/[a-zA-Z0-9_\.]+|\/frames\/[a-zA-Z0-9_\.]+)/g;
    let m;
    while ((m = regex.exec(content)) !== null) {
      imgs.add(m[0]);
    }
  }
});

console.log('Total unique images referenced:', imgs.size);
const missing = [];
const found = [];

imgs.forEach(img => {
  const p1 = path.join(__dirname, img);
  const p2 = path.join(__dirname, 'public', img);
  if (fs.existsSync(p1) || fs.existsSync(p2)) {
    found.push(img);
  } else {
    missing.push(img);
  }
});

console.log('Found:', found.length);
console.log('Missing:', missing.length);
if (missing.length > 0) {
  console.log('Missing files:', missing);
}
