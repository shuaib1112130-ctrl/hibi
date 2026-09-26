const fs = require('fs');

function extractAndSave(sourceFile, targetFile, startIdx) {
  const content = fs.readFileSync(sourceFile, 'utf8');
  const code = content.slice(startIdx);
  fs.writeFileSync(targetFile, code);
  console.log(`Saved ${targetFile}, length ${code.length}`);
}

extractAndSave('mod_HeroSection.js', 'comp_HeroSection.js', 12362);
extractAndSave('mod_MadeForYou.js', 'comp_MadeForYou.js', 11053);
extractAndSave('sec5_full.js', 'comp_Sec5.js', 8000);
