const fs = require('fs');

const s = fs.readFileSync('mod_ScrapbookPageFlip.js', 'utf8');

// Find all matches for book-page
// Split by "book-page"
const parts = s.split('book-page');
console.log('Number of page splits:', parts.length);

// Write each page's content into a readable summary file
const pages = [];
for (let i = 1; i < parts.length; i++) {
  const p = parts[i];
  // extract images and classNames
  const imgs = [];
  const imgRegex = /src:"([^"]+)"(?:,[^}]*className:"([^"]*)")?/g;
  let m;
  while ((m = imgRegex.exec(p)) !== null) {
    imgs.push({ src: m[1], className: m[2] || '' });
  }
  pages.push({ pageIndex: i, images: imgs });
}

fs.writeFileSync('parsed_scrapbook.json', JSON.stringify(pages, null, 2));
console.log('Saved parsed_scrapbook.json with', pages.length, 'pages.');
