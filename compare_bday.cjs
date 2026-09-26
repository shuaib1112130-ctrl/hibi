const fs = require('fs');

const bday = fs.readFileSync('birthday.html', 'utf8');
const refBday = fs.readFileSync('ref_birthday.html', 'utf8');

// Compare script parts
const getScript = (s) => {
  const m = s.match(/<script[\s\S]*?<\/script>/gi);
  return m ? m.join('\n') : '';
};

console.log('Script in local length:', getScript(bday).length);
console.log('Script in ref length:', getScript(refBday).length);

// Compare body parts
const getBody = (s) => {
  const m = s.match(/<body[\s\S]*?<\/body>/gi);
  return m ? m[0] : '';
};

console.log('Body in local length:', getBody(bday).length);
console.log('Body in ref length:', getBody(refBday).length);

// Check differences in text content
const getText = (s) => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
console.log('Local text:', getText(bday));
console.log('Ref text  :', getText(refBday));

// Check any target numbers or configurations in JS
const findConfigs = (s) => {
  return {
    targetYear: s.match(/20\d\d/g),
    targetNum: s.match(/TARGET\s*=\s*\d+|target\s*:\s*\d+|countTo\s*:\s*\d+/gi),
    audio: s.match(/\.mp3/g),
    images: s.match(/['"][^'"]+\.(?:jpg|png|svg|webp)['"]/gi)
  };
};

console.log('Local configs:', JSON.stringify(findConfigs(bday), null, 2));
console.log('Ref configs  :', JSON.stringify(findConfigs(refBday), null, 2));
