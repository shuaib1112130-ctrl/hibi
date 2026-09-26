const fs = require('fs');
const path = require('path');

const hibbbbDir = path.join(__dirname, 'public', 'hibbbb');
const publicRefDir = path.join(__dirname, 'public', 'ref');
const distRefDir = path.join(__dirname, 'dist', 'ref');

const screenshot = path.join(hibbbbDir, 'Screenshot_20260925_103723.jpg');
if (fs.existsSync(screenshot)) {
  fs.copyFileSync(screenshot, path.join(publicRefDir, 'girl.jpg'));
  fs.copyFileSync(screenshot, path.join(distRefDir, 'girl.jpg'));
  console.log('Copied Screenshot to girl.jpg');
} else {
  // fallback to girl1.jpg
  fs.copyFileSync(path.join(hibbbbDir, 'girl1.jpg'), path.join(publicRefDir, 'girl.jpg'));
  fs.copyFileSync(path.join(hibbbbDir, 'girl1.jpg'), path.join(distRefDir, 'girl.jpg'));
}
