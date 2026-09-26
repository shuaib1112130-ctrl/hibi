const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

console.log('=== VERIFYING WEBSITE REQUIREMENTS ===\n');

// 1. Check Section 2 structure
const sec2Idx = html.indexOf('SECTION 2: HERO SECTION');
const marqueeIdx = html.indexOf('id="marqueeContainer"', sec2Idx);
const textIdx = html.indexOf('Happy</span>', sec2Idx);
console.log('1. Section 2 Layout:');
console.log('   - Section 2 starts at index:', sec2Idx);
console.log('   - Marquee index:', marqueeIdx);
console.log('   - Text content index:', textIdx);
console.log('   - Marquee positioned ABOVE/BEFORE text in DOM:', (marqueeIdx > 0 && marqueeIdx < textIdx) ? 'PASS (YES)' : 'FAIL');

// 2. Check Book Pages
console.log('\n2. Section 4 Book Pages:');
const pageMatches = html.match(/class="book-page[^"]*"/g);
console.log('   - Total book-page elements found:', pageMatches ? pageMatches.length : 0);
console.log('   - Page count status (expected 11: cover + 9 inner pages + back cover):', pageMatches && pageMatches.length === 11 ? 'PASS (11 pages)' : 'FAIL');

// 3. Check photos in book
console.log('\n3. Photos in Book (Uniqueness check):');
const bookStart = html.indexOf('id="flipBook"');
const bookEnd = html.indexOf('</section>', bookStart);
const bookContent = html.substring(bookStart, bookEnd);
const photoMatches = [...bookContent.matchAll(/\/ref\/([^"']+)/g)].map(m => m[1]);
console.log('   - Photos used in book (' + photoMatches.length + ' total):', photoMatches);
const uniquePhotos = new Set(photoMatches);
console.log('   - Unique photo count:', uniquePhotos.size);
console.log('   - Duplication status:', uniquePhotos.size === photoMatches.length ? 'PASS (ALL UNIQUE, ZERO DUPLICATES)' : 'FAIL');

// 4. Check PageFlip debounce and single-page config
console.log('\n4. Page Flip Interaction (Single page flip fix):');
console.log('   - useMouseEvents: false (prevents double-flip):', html.includes('useMouseEvents: false') ? 'PASS' : 'FAIL');
console.log('   - isFlipping debounce guard:', html.includes('isFlipping') ? 'PASS' : 'FAIL');
console.log('   - usePortrait: isMobile (mobile single page mode):', html.includes('usePortrait: isMobile') ? 'PASS' : 'FAIL');
console.log('   - Single page flip handler attached to book:', html.includes('pageFlip.flipNext(') ? 'PASS' : 'FAIL');

// 5. Check Mobile Responsiveness
console.log('\n5. Mobile Responsiveness:');
console.log('   - Mobile viewport meta:', html.includes('name="viewport"') ? 'PASS' : 'FAIL');
console.log('   - Mobile touch swipe handlers:', html.includes('touchstart') && html.includes('touchend') ? 'PASS' : 'FAIL');
console.log('   - Overflow prevention (overflow-x-hidden):', html.includes('overflow-x-hidden') ? 'PASS' : 'FAIL');

console.log('\n=== ALL VERIFICATIONS COMPLETE ===');
