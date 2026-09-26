const fs = require('fs');
const s = fs.readFileSync('mod_ScrapbookPageFlip.js', 'utf8');

// Find all pages and elements
const bookPageIdx = s.indexOf('book-page');
console.log(s.slice(bookPageIdx - 50, bookPageIdx + 4000));
