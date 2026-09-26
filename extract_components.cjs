const fs = require('fs');

function inspectModule(filename) {
  const content = fs.readFileSync(filename, 'utf8');
  console.log(`=== ${filename} ===`);
  const exportMatch = content.match(/e\.s\(\["default",\s*0,\s*function\s*\(([^)]*)\)\s*\{([\s\S]*)\}\]\)/);
  if (exportMatch) {
    console.log('Found default export function!');
    fs.writeFileSync(`component_${filename}`, exportMatch[0]);
    console.log(`Saved component_${filename}, length: ${exportMatch[0].length}`);
  } else {
    // Look for any e.s or return
    const sIdx = content.lastIndexOf('e.s(');
    if (sIdx !== -1) {
      console.log('Found e.s at', sIdx);
      fs.writeFileSync(`component_${filename}`, content.slice(sIdx));
    }
  }
}

inspectModule('mod_HeroSection.js');
inspectModule('mod_MadeForYou.js');
inspectModule('mod_ScrapbookPageFlip.js');
inspectModule('sec5_full.js');
