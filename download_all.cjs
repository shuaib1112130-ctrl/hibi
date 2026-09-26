const fs = require('fs');
const path = require('path');
const https = require('https');

const BASE_URL = 'https://original-bday-website.vercel.app';

function downloadFile(urlPath, destPath) {
  return new Promise((resolve, reject) => {
    const fullUrl = BASE_URL + urlPath;
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    const file = fs.createWriteStream(destPath);
    https.get(fullUrl, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        https.get(response.headers.location, (res2) => {
          res2.pipe(file);
          file.on('finish', () => { file.close(); resolve(); });
        }).on('error', (err) => { fs.unlink(destPath, () => {}); reject(err); });
        return;
      }
      if (response.statusCode !== 200) {
        fs.unlink(destPath, () => {});
        return reject(new Error(`Failed to get ${fullUrl}: ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('Downloading birthday.html...');
  await downloadFile('/birthday.html', 'birthday.html');
  console.log('birthday.html downloaded successfully.');

  const assets = JSON.parse(fs.readFileSync('asset_list.json', 'utf8'));
  console.log(`Downloading ${assets.length} assets...`);

  let count = 0;
  for (const asset of assets) {
    const localPath = path.join('public', asset.replace(/^\//, ''));
    try {
      await downloadFile(asset, localPath);
      count++;
      console.log(`[${count}/${assets.length}] Downloaded ${asset}`);
    } catch (err) {
      console.error(`Error downloading ${asset}:`, err.message);
    }
  }

  // Also copy birthday.html to public/birthday.html
  fs.copyFileSync('birthday.html', path.join('public', 'birthday.html'));
  console.log('Finished downloading all assets!');
}

main().catch(console.error);
