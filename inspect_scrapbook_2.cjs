const fs = require('fs');
const s = fs.readFileSync('mod_ScrapbookPageFlip.js', 'utf8');

const bookPageIdx = s.indexOf('book-page');
console.log(s.slice(bookPageIdx + 3000));
