const http = require('http');

const endpoints = [
  '/',
  '/birthday.html',
  '/ref/heart.jpg',
  '/ref/girl.jpg',
  '/pages/front.png',
  '/elements/fwine.png',
  '/frames/frame5.png'
];

async function check(urlPath) {
  return new Promise((resolve) => {
    http.get('http://127.0.0.1:3000' + urlPath, (res) => {
      resolve({ path: urlPath, status: res.statusCode, type: res.headers['content-type'] });
    }).on('error', (err) => {
      resolve({ path: urlPath, error: err.message });
    });
  });
}

async function run() {
  console.log('Verifying server endpoints...');
  for (const ep of endpoints) {
    const r = await check(ep);
    console.log(r.path, '=> Status:', r.status, 'Type:', r.type || r.error);
  }
}

run();
