const fs = require('fs');
const https = require('https');
const path = require('path');

const files = [
  'birthday.html',
  'mod_HeroSection.js',
  'mod_MadeForYou.js',
  'mod_ScrapbookPageFlip.js',
  'sec5_full.js'
];

const urls = new Set();

for (const f of files) {
  if (fs.existsSync(f)) {
    const text = fs.readFileSync(f, 'utf8');
    const matches = text.match(/(?:\/ref\/[a-zA-Z0-9_\-\.]+|\/pages\/[a-zA-Z0-9_\-\.]+|\/elements\/[a-zA-Z0-9_\-\.]+|\/frames\/[a-zA-Z0-9_\-\.]+|[a-zA-Z0-9_\-\.\/]+\.(?:png|jpg|jpeg|webp|gif|svg|mp3|wav|ogg))/gi) || [];
    for (const m of matches) {
      if (m.startsWith('/ref/') || m.startsWith('/pages/') || m.startsWith('/elements/') || m.startsWith('/frames/') || m.startsWith('/assets/')) {
        urls.add(m);
      }
    }
  }
}

console.log('Total asset paths identified:', urls.size);
console.log(Array.from(urls).sort());

fs.writeFileSync('asset_list.json', JSON.stringify(Array.from(urls).sort(), null, 2));
