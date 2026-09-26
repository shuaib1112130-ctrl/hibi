const fs = require('fs');
const h = fs.readFileSync('birthday.html', 'utf8');
console.log('Scripts:', h.match(/<script[^>]*>/gi));
console.log('Audio/video:', h.match(/<(audio|video|source)[^>]*>/gi));
console.log('External urls:', Array.from(new Set(h.match(/https?:\/\/[^\s"'<>]+/gi) || [])));
