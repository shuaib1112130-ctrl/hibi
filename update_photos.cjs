const fs = require('fs');
const path = require('path');

const hibbbbDir = path.join(__dirname, 'public', 'hibbbb');
const publicRefDir = path.join(__dirname, 'public', 'ref');
const distRefDir = path.join(__dirname, 'dist', 'ref');
const rootRefDir = path.join(__dirname, 'ref');

[publicRefDir, distRefDir, rootRefDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Sync files between dist/hibbbb and public/hibbbb if exists
const distHib = path.join(__dirname, 'dist', 'hibbbb');
if (fs.existsSync(distHib)) {
  fs.readdirSync(distHib).forEach(f => {
    const src = path.join(distHib, f);
    const dst = path.join(hibbbbDir, f);
    if (!fs.existsSync(dst)) {
      fs.copyFileSync(src, dst);
    }
  });
}

// Copy main screenshot as girl.jpg if available
const screenshotPath = path.join(hibbbbDir, 'Screenshot_20260925_103723.jpg');
if (fs.existsSync(screenshotPath)) {
  [publicRefDir, distRefDir, rootRefDir].forEach(dir => {
    fs.copyFileSync(screenshotPath, path.join(dir, 'girl.jpg'));
  });
  console.log('Copied Screenshot_20260925_103723.jpg => girl.jpg');
}

// Copy girl1.jpg through girl18.jpg
for (let i = 1; i <= 18; i++) {
  const filename = `girl${i}.jpg`;
  const src = path.join(hibbbbDir, filename);
  if (fs.existsSync(src)) {
    [publicRefDir, distRefDir, rootRefDir].forEach(dir => {
      fs.copyFileSync(src, path.join(dir, filename));
    });
    console.log(`Copied ${filename}`);
  }
}

// Ensure all files in public/ref are copied to dist/ref and rootRefDir
fs.readdirSync(publicRefDir).forEach(f => {
  const src = path.join(publicRefDir, f);
  [distRefDir, rootRefDir].forEach(dir => {
    fs.copyFileSync(src, path.join(dir, f));
  });
});

console.log('All images in folder ref updated and synchronized successfully!');
