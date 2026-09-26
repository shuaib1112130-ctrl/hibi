const fs = require('fs');
const s = fs.readFileSync('mod_ScrapbookPageFlip.js', 'utf8');

// Replace standard Next.js JSX calls
// (0,t.jsx)(r.default,{...}) -> <img ... />
// (0,t.jsx)("div",{className:"...",children:...})
fs.writeFileSync('raw_scrapbook.js', s);
console.log('Saved raw scrapbook module.');
