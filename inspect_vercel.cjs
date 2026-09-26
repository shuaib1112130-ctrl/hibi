const fs = require('fs');

const html = fs.readFileSync('vercel_index.html', 'utf8');

// Find all script tags
const scripts = [];
const scriptRegex = /<script[^>]+src=["']([^"']+)["']/g;
let m;
while ((m = scriptRegex.exec(html)) !== null) {
  scripts.push(m[1]);
}
console.log('Scripts found:', scripts);

// Find all css tags
const css = [];
const cssRegex = /<link[^>]+href=["']([^"']+\.css[^"']*)["']/g;
while ((m = cssRegex.exec(html)) !== null) {
  css.push(m[1]);
}
console.log('CSS found:', css);

// Check sections or main tags
const sections = [];
const sectionRegex = /<section[\s\S]*?<\/section>/g;
let secMatch;
let secIdx = 0;
while ((secMatch = sectionRegex.exec(html)) !== null) {
  secIdx++;
  const content = secMatch[0];
  console.log(`\n--- SECTION ${secIdx} --- (len: ${content.length})`);
  console.log('Classes:', content.slice(0, 200).match(/class="([^"]+)"/)?.[1] || 'no class');
  // First 300 chars of text
  const cleanText = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 200);
  console.log('Text preview:', cleanText);
}

// Also check overall body structure
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (bodyMatch) {
  const bodyContent = bodyMatch[1];
  console.log('\nBody length:', bodyContent.length);
  // Find top level tags in body
}
