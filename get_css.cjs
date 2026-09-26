const https = require('https');
const fs = require('fs');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', reject);
  });
}

async function run() {
  await download('https://original-bday-website.vercel.app/_next/static/chunks/056frpohsb62e.css', 'original_app.css');
  await download('https://original-bday-website.vercel.app/_next/static/chunks/0ighvof6m558u.css', 'original_font.css');
  console.log('Downloaded original CSS files.');
}

run().catch(console.error);
