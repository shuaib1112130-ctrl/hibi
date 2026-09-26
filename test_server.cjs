const http = require('http');

http.get('http://127.0.0.1:3000/', (res) => {
  console.log('STATUS:', res.statusCode);
  let bytes = 0;
  res.on('data', chunk => bytes += chunk.length);
  res.on('end', () => {
    console.log('SUCCESS! Read', bytes, 'bytes from server.');
  });
}).on('error', (err) => {
  console.error('ERROR:', err.message);
});
