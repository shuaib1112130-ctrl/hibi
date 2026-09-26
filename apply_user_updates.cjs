const fs = require('fs');

console.log('Applying Section 2 image match and Book smoothness/menu removal...');

const memories = [
  { src: "/ref/heart.jpg" },
  { src: "/ref/girl.jpg" },
  { src: "/ref/girl2.jpg" },
  { src: "/ref/girl3.jpg" },
  { src: "/ref/girl4.jpg" },
  { src: "/ref/girl5.jpg" },
  { src: "/ref/girl6.jpg" },
  { src: "/ref/girl7.jpg" },
  { src: "/ref/girl8.jpg" },
  { src: "/ref/girl9.jpg" },
  { src: "/ref/girl10.jpg" },
  { src: "/ref/girl11.jpg" },
];

// 24 nodes (memories repeated twice)
const marqueeItems = [...memories, ...memories];

let marqueeNodesHtml = '';
marqueeItems.forEach((item, idx) => {
  const percent = (idx * (100 / marqueeItems.length)).toFixed(4);
  marqueeNodesHtml += `
            <div class="absolute top-0 left-0 cursor-grab active:cursor-grabbing select-none" style="offset-path: path('M1 209.434C58.5872 255.935 387.926 325.938 482.583 209.434C600.905 63.8051 525.516 -43.2211 427.332 19.9613C329.149 83.1436 352.902 242.723 515.041 267.302C644.752 286.966 943.56 181.94 995 156.5'); offset-rotate: auto; offset-distance: ${percent}%; will-change: offset-distance; backface-visibility: hidden; z-index: 1;">
              <div class="h-20 w-20 sm:h-24 sm:w-24 bg-white p-1 sm:p-1.5 shadow-md border border-neutral-200/80 rounded-sm overflow-hidden transition-transform duration-300 ease-out hover:scale-110 hover:shadow-xl">
                <img src="${item.src}" alt="Memory ${idx + 1}" draggable="false" class="h-full w-full object-cover grayscale transition-[filter] duration-300 ease-out hover:grayscale-0 pointer-events-none" />
              </div>
            </div>`;
});

// Section 2 HTML matching uploaded image exactly
const section2Html = `      <!-- ================= SECTION 2: HERO SECTION ================= -->
      <section class="h-screen w-full snap-start snap-always shrink-0 overflow-hidden relative z-10 bg-[#FAFAF7]">
        <!-- Left Content: Headline and Subtitle -->
        <div class="absolute left-0 top-0 bottom-0 z-20 flex flex-col justify-center px-8 sm:px-14 lg:px-20 max-w-xl pointer-events-none">
          <div>
            <h1 class="hero-display text-[15vw] sm:text-7xl lg:text-[5.5rem] leading-[0.88] tracking-tight text-[#14140F]">
              <span class="font-light block">Happy</span>
              <span class="font-bold block text-black">Birthday</span>
              <span class="font-bold block text-amber-500">Sweety</span>
            </h1>
            <div class="mt-6 h-[2px] w-16 bg-[#9C7A3F]"></div>
            <p class="hero-body mt-6 max-w-sm text-base sm:text-lg leading-relaxed text-[#4A4A42]">
              May this year bring you closer to everything you're chasing.
            </p>
          </div>
        </div>

        <!-- Right / Background: Ribbon Curved Marquee Loop -->
        <div class="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-auto">
          <div id="marqueeContainer" class="relative w-full h-[360px] sm:h-[460px] lg:h-[520px] cursor-grab active:cursor-grabbing select-none overflow-visible">
            <svg id="marqueeSvg" width="100%" height="100%" viewBox="0 0 996 330" preserveAspectRatio="xMidYMid meet" class="w-full h-full pointer-events-none opacity-0">
              <path id="marqueePath" d="M1 209.434C58.5872 255.935 387.926 325.938 482.583 209.434C600.905 63.8051 525.516 -43.2211 427.332 19.9613C329.149 83.1436 352.902 242.723 515.041 267.302C644.752 286.966 943.56 181.94 995 156.5" stroke="none" fill="none"></path>
            </svg>
            <div id="marqueeNodes" class="absolute inset-0 w-full h-full">
${marqueeNodesHtml}
            </div>
          </div>
        </div>

        <!-- Bottom Right Footer: MADE FOR YOU -->
        <div class="absolute bottom-0 right-0 z-20 flex items-center justify-end px-8 pb-8 sm:px-14 w-full pointer-events-none">
          <div class="h-px flex-1 max-w-[220px] bg-[#14140F]/15 mr-4"></div>
          <span class="hero-mono text-[10px] uppercase tracking-[0.25em] text-[#8A8A80]">MADE FOR YOU</span>
        </div>
      </section>`;

// Section 4 HTML (Cleaned: NO MENU, NO BUTTONS, NO INDICATOR, just pure smooth book!)
const section4CleanHtml = `      <!-- ================= SECTION 4: SCRAPBOOK FLIPBOOK ================= -->
      <section class="h-screen w-full snap-start snap-always shrink-0 overflow-visible relative z-10">
        <div class="flex h-screen overflow-hidden flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black select-none">
          <div id="flipBook" class="shadow-2xl cursor-pointer">
            <!-- Page 1: Hard Front Cover -->
            <div class="book-page bg-blue-700 text-white cursor-pointer" data-density="hard" style="width:400px; height:500px">
              <img src="/pages/front.png" alt="Front Cover" draggable="false" class="scrapbook-el" style="transform: translate(12px, 0px) scale(1.3);" />
              <div class="flex h-full items-center justify-center text-5xl font-bold"></div>
            </div>

            <!-- Page 2: Left Page (Wine, mouse, butterfly, photo, frame10, text1) -->
            <div class="book-page relative overflow-hidden bg-amber-50 text-black cursor-pointer" style="width:400px; height:500px">
              <img src="/pages/left.jpg" alt="Paper" draggable="false" class="scrapbook-el" style="transform: none;" />
              <img src="/elements/fwine.png" alt="Wine" draggable="false" class="scrapbook-el" style="transform: translate(-136px, -132px) rotate(-12deg) scale(0.35);" />
              <img src="/elements/side3.png" alt="Tape" draggable="false" class="scrapbook-el" style="transform: translate(-92px, -56px) scale(0.78);" />
              <img src="/elements/mouse.png" alt="Mouse" draggable="false" class="scrapbook-el" style="transform: translate(80px, 184px) scale(0.55); z-index: 50;" />
              <img src="/elements/butter.png" alt="Butterfly" draggable="false" class="scrapbook-el" style="transform: translate(-112px, 128px) rotate(30deg) scale(0.45);" />
              <img src="/ref/girl.jpg" alt="Memory" draggable="false" class="scrapbook-el" style="transform: translate(56px, -92px) rotate(10deg) scale(0.33);" />
              <img src="/elements/frame10.png" alt="Frame" draggable="false" class="scrapbook-el" style="transform: translate(56px, -80px) rotate(10deg) scale(0.65);" />
              <img src="/elements/text1.png" alt="Text" draggable="false" class="scrapbook-el" style="transform: translate(40px, 60px) scale(0.45);" />
            </div>

            <!-- Page 3: Right Page (Paper, starB, 3 photos, frame9, text2, kit) -->
            <div class="book-page relative overflow-hidden bg-amber-50 text-black cursor-pointer" style="width:400px; height:500px">
              <img src="/pages/right.jpg" alt="Paper" draggable="false" class="scrapbook-el" style="transform: none;" />
              <img src="/elements/paper.png" alt="Paper" draggable="false" class="scrapbook-el scrapbook-shadow" style="transform: translate(72px, 152px) rotate(90deg) scale(0.5);" />
              <img src="/elements/starB.png" alt="Star" draggable="false" class="scrapbook-el scrapbook-shadow" style="transform: translate(-68px, 120px) rotate(-50deg) scale(0.5);" />
              <img src="/ref/girl.jpg" alt="Photo" draggable="false" class="scrapbook-el scrapbook-shadow" style="transform: translate(76px, -88px) rotate(20deg) scale(0.22);" />
              <img src="/ref/girl2.jpg" alt="Photo" draggable="false" class="scrapbook-el scrapbook-shadow" style="transform: translate(104px, -172px) rotate(20deg) scale(0.22);" />
              <img src="/ref/girl3.jpg" alt="Photo" draggable="false" class="scrapbook-el scrapbook-shadow" style="transform: translate(44px, 4px) rotate(20deg) scale(0.22);" />
              <img src="/elements/frame9.png" alt="Frame" draggable="false" class="scrapbook-el scrapbook-shadow" style="transform: translate(72px, -80px) rotate(12deg) scale(0.8);" />
              <img src="/elements/text2.png" alt="Text" draggable="false" class="scrapbook-el scrapbook-shadow" style="transform: translate(-52px, -160px) scale(0.6);" />
              <img src="/elements/kit.png" alt="Kit" draggable="false" class="scrapbook-el scrapbook-shadow" style="transform: translate(-52px, -64px) scale(0.6);" />
            </div>

            <!-- Page 4: Left Page (Billa cat, side1, star, girl4, frame11, moon, fits, note1, lovetape) -->
            <div class="book-page relative overflow-hidden bg-amber-50 text-black cursor-pointer" style="width:400px; height:500px">
              <img src="/pages/left.jpg" alt="Paper" draggable="false" class="scrapbook-el" style="transform: none;" />
              <img src="/elements/billa6.png" alt="Cat" draggable="false" class="scrapbook-el" style="transform: translate(-120px, -40px) rotate(1deg) scale(0.55);" />
              <img src="/elements/side1.png" alt="Side" draggable="false" class="scrapbook-el" style="transform: translate(-104px, 124px) rotate(180deg) scale(0.5);" />
              <img src="/elements/starem.png" alt="Star" draggable="false" class="scrapbook-el" style="transform: translate(72px, -224px) rotate(-18deg) scale(0.16); z-index: 20;" />
              <img src="/ref/girl4.jpg" alt="Photo" draggable="false" class="scrapbook-el" style="transform: translate(52px, -84px) rotate(17deg) scale(0.33); z-index: 30;" />
              <img src="/elements/frame11.png" alt="Frame" draggable="false" class="scrapbook-el" style="transform: translate(40px, -44px) rotate(18deg) scale(0.75); z-index: 30;" />
              <img src="/elements/moon.png" alt="Moon" draggable="false" class="scrapbook-el" style="transform: translate(-80px, 120px) rotate(-14deg) scale(0.34); z-index: 40;" />
              <img src="/elements/fits.png" alt="Fits" draggable="false" class="scrapbook-el" style="transform: translate(-120px, -200px) rotate(-14deg) scale(0.44); z-index: 40;" />
              <img src="/elements/note1.png" alt="Note" draggable="false" class="scrapbook-el" style="transform: translate(56px, 152px) rotate(-7deg) scale(0.68); z-index: 50;" />
              <img src="/elements/lovetape.png" alt="Tape" draggable="false" class="scrapbook-el" style="transform: translate(40px, 96px) scale(0.19); z-index: 50;" />
            </div>

            <!-- Page 5: Right Page (Side2, billa, boqey, girl5, frame5, miss) -->
            <div class="book-page relative overflow-hidden bg-amber-50 text-black cursor-pointer" style="width:400px; height:500px">
              <img src="/pages/right.jpg" alt="Paper" draggable="false" class="scrapbook-el" style="transform: none;" />
              <img src="/elements/side2.png" alt="Tape" draggable="false" class="scrapbook-el" style="transform: translate(64px, 92px) scale(0.68); z-index: 50;" />
              <img src="/elements/billa.png" alt="Cat" draggable="false" class="scrapbook-el" style="transform: translate(-56px, -112px) scale(0.38); z-index: 50;" />
              <img src="/elements/boqey.png" alt="Bouquet" draggable="false" class="scrapbook-el" style="transform: translate(-56px, 112px) scale(0.48); z-index: 50;" />
              <img src="/ref/girl5.jpg" alt="Girl 5" draggable="false" class="scrapbook-el" style="transform: translate(76px, -128px) scale(0.32); z-index: 50;" />
              <img src="/frames/frame5.png" alt="Frame" draggable="false" class="scrapbook-el" style="transform: translate(72px, -112px) scale(0.68); z-index: 50;" />
              <img src="/elements/miss.png" alt="Miss" draggable="false" class="scrapbook-el" style="transform: translate(112px, 16px) rotate(18deg) scale(0.48); z-index: 50;" />
            </div>

            <!-- Page 6: Left Page (Side4, disk, billa5, girl11, girl10, frame8, twoStar, text3) -->
            <div class="book-page relative overflow-hidden bg-amber-50 text-black cursor-pointer" style="width:400px; height:500px">
              <img src="/pages/left.jpg" alt="Paper" draggable="false" class="scrapbook-el" style="transform: none;" />
              <img src="/elements/side4.png" alt="Side deco" draggable="false" class="scrapbook-el" style="transform: translate(-88px, 92px) scale(0.68); z-index: 50;" />
              <img src="/elements/disk.png" alt="Disk" draggable="false" class="scrapbook-el" style="transform: translate(-200px, -60px) scale(0.68); z-index: 50;" />
              <img src="/elements/billa5.png" alt="Cat" draggable="false" class="scrapbook-el" style="transform: translate(76px, 132px) scale(0.68); z-index: 50;" />
              <img src="/ref/girl11.jpg" alt="Girl 11" draggable="false" class="scrapbook-el" style="transform: translate(16px, -48px) rotate(-11deg) scale(0.26); z-index: 50;" />
              <img src="/ref/girl10.jpg" alt="Girl 10" draggable="false" class="scrapbook-el" style="transform: translate(64px, -160px) rotate(11deg) scale(0.26); z-index: 50;" />
              <img src="/elements/frame8.png" alt="Frame" draggable="false" class="scrapbook-el" style="transform: translate(40px, -100px) scale(0.68); z-index: 50;" />
              <img src="/elements/twoStar.png" alt="Stars" draggable="false" class="scrapbook-el" style="transform: translate(-56px, 80px) scale(0.38); z-index: 50;" />
              <img src="/elements/text3.png" alt="Text" draggable="false" class="scrapbook-el" style="transform: translate(-88px, -192px) scale(0.48); z-index: 50;" />
            </div>

            <!-- Page 7: Right Page (Side5, text4, girl9, girl8, frame7, billa4) -->
            <div class="book-page relative overflow-hidden bg-amber-50 text-black cursor-pointer" style="width:400px; height:500px">
              <img src="/pages/right.jpg" alt="Paper" draggable="false" class="scrapbook-el" style="transform: none;" />
              <img src="/elements/side5.png" alt="Side deco" draggable="false" class="scrapbook-el" style="transform: translate(88px, 56px) scale(0.78); z-index: 50;" />
              <img src="/elements/text4.png" alt="Text" draggable="false" class="scrapbook-el" style="transform: translate(-24px, -160px) scale(0.58); z-index: 50;" />
              <img src="/ref/girl9.jpg" alt="Girl 9" draggable="false" class="scrapbook-el" style="transform: translate(-72px, -64px) rotate(-4deg) scale(0.28); z-index: 50;" />
              <img src="/ref/girl8.jpg" alt="Girl 8" draggable="false" class="scrapbook-el" style="transform: translate(-44px, 52px) rotate(10deg) scale(0.27); z-index: 50;" />
              <img src="/elements/frame7.png" alt="Frame" draggable="false" class="scrapbook-el" style="transform: translate(-56px, 4px) scale(0.68); z-index: 50;" />
              <img src="/elements/billa4.png" alt="Cat" draggable="false" class="scrapbook-el" style="transform: translate(-68px, 160px) scale(0.58); z-index: 50;" />
            </div>

            <!-- Page 8: Hard Back Cover -->
            <div class="book-page bg-blue-700 text-white cursor-pointer" data-density="hard" style="width:400px; height:500px">
              <img src="/pages/back.png" alt="Back Cover" draggable="false" class="scrapbook-el" style="transform: translate(12px, 0px) scale(1.3);" />
            </div>
          </div>
        </div>
      </section>`;

// Read index.html
let html = fs.readFileSync('index.html', 'utf8');

// Replace Section 2
const sec2Regex = /<!-- ================= SECTION 2: HERO SECTION[\s\S]*?<!-- ================= SECTION 3/i;
html = html.replace(sec2Regex, `${section2Html}\n\n    <!-- ================= SECTION 3`);

// Replace Section 4
const sec4Regex = /<!-- ================= SECTION 4: SCRAPBOOK[\s\S]*?<\/section>/i;
html = html.replace(sec4Regex, section4CleanHtml);

// Update Script for Section 2 (smooth drag & auto marquee) and Section 4 (smooth efficient book flip)
const newScripts = `    // ==========================================
    // SECTION 2: CURVED MARQUEE ANIMATION & DRAG
    // ==========================================
    (function initCurvedMarquee() {
      const container = document.getElementById('marqueeContainer');
      if (!container) return;

      const nodes = container.querySelectorAll('#marqueeNodes > div');
      if (!nodes || nodes.length === 0) return;

      const totalNodes = nodes.length;
      const basePositions = [];
      nodes.forEach((node, i) => {
        const val = node.style.offsetDistance ? parseFloat(node.style.offsetDistance) : (i * (100 / totalNodes));
        basePositions.push(val);
      });

      let currentOffset = 0;
      let isHovered = false;
      let isDragging = false;
      let startX = 0;
      let dragVelocity = 0;

      container.addEventListener('mouseenter', () => isHovered = true);
      container.addEventListener('mouseleave', () => isHovered = false);

      container.addEventListener('pointerdown', (e) => {
        isDragging = true;
        startX = e.clientX;
        dragVelocity = 0;
        container.style.cursor = 'grabbing';
      });

      window.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        startX = e.clientX;
        const delta = dx * 0.09;
        dragVelocity = delta * 25;
        currentOffset = (currentOffset - delta) % 100;
        if (currentOffset < 0) currentOffset += 100;
        updatePositions();
      });

      window.addEventListener('pointerup', () => {
        if (isDragging) {
          isDragging = false;
          container.style.cursor = 'grab';
        }
      });

      function updatePositions() {
        nodes.forEach((node, i) => {
          let pos = (basePositions[i] + currentOffset) % 100;
          if (pos < 0) pos += 100;
          node.style.offsetDistance = \`\${pos}%\`;
          node.style.zIndex = Math.floor(1 + (pos / 100) * 15);
        });
      }

      let lastTime = performance.now();
      function animate(now) {
        const dt = (now - lastTime) / 1000;
        lastTime = now;

        if (!isDragging) {
          if (Math.abs(dragVelocity) > 0.01) {
            currentOffset = (currentOffset + dragVelocity * dt) % 100;
            dragVelocity *= 0.96;
          }
          const speed = isHovered ? 1.5 : 4.5;
          currentOffset = (currentOffset + speed * dt) % 100;
          if (currentOffset < 0) currentOffset += 100;
          updatePositions();
        }

        requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
    })();

    // ==========================================
    // SECTION 4: SMOOTH & EFFICIENT BOOK FLIP (NO MENU)
    // ==========================================
    (function initScrapbook() {
      const bookEl = document.getElementById('flipBook');
      if (!bookEl) return;

      let attempts = 0;
      function setupPageFlip() {
        if (!window.St || !window.St.PageFlip) {
          if (attempts++ < 50) setTimeout(setupPageFlip, 80);
          return;
        }

        try {
          const pageFlip = new St.PageFlip(bookEl, {
            width: 400,
            height: 500,
            size: "fixed",
            minWidth: 320,
            maxWidth: 500,
            minHeight: 400,
            maxHeight: 620,
            drawShadow: true,
            maxShadowOpacity: 0.35,
            showCover: true,
            usePortrait: false,
            startPage: 0,
            flippingTime: 650, // fast, buttery smooth turning duration
            useMouseEvents: true,
            swipeDistance: 25,
            showPageCorners: true,
          });

          pageFlip.loadFromHTML(bookEl.querySelectorAll('.book-page'));

          // Click on right page turns next; left page turns previous smoothly
          bookEl.addEventListener('click', (e) => {
            const rect = bookEl.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            if (clickX > rect.width / 2) {
              pageFlip.flipNext('top');
            } else {
              pageFlip.flipPrev('top');
            }
          });

          // Keyboard arrow navigation
          window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') pageFlip.flipNext('top');
            if (e.key === 'ArrowLeft') pageFlip.flipPrev('top');
          });
        } catch (e) {
          console.warn('PageFlip init:', e);
        }
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupPageFlip);
      } else {
        setupPageFlip();
      }
    })();`;

// Replace the scripts in index.html
const scriptsRegex = /\/\/ ==========================================\s*\n\s*\/\/ SECTION 2: CURVED MARQUEE[\s\S]*?\}\)\(\);/i;
// Also replace section 4 script
html = html.replace(/\/\/ ==========================================\s*\n\s*\/\/ SECTION 2: CURVED MARQUEE[\s\S]*?(?=\/\/ ==========================================\s*\n\s*\/\/ SECTION 3)/i, 
`// ==========================================
    // SECTION 2: CURVED MARQUEE ANIMATION & DRAG
    // ==========================================
    (function initCurvedMarquee() {
      const container = document.getElementById('marqueeContainer');
      if (!container) return;

      const nodes = container.querySelectorAll('#marqueeNodes > div');
      if (!nodes || nodes.length === 0) return;

      const totalNodes = nodes.length;
      const basePositions = [];
      nodes.forEach((node, i) => {
        const val = node.style.offsetDistance ? parseFloat(node.style.offsetDistance) : (i * (100 / totalNodes));
        basePositions.push(val);
      });

      let currentOffset = 0;
      let isHovered = false;
      let isDragging = false;
      let startX = 0;
      let dragVelocity = 0;

      container.addEventListener('mouseenter', () => isHovered = true);
      container.addEventListener('mouseleave', () => isHovered = false);

      container.addEventListener('pointerdown', (e) => {
        isDragging = true;
        startX = e.clientX;
        dragVelocity = 0;
        container.style.cursor = 'grabbing';
      });

      window.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        startX = e.clientX;
        const delta = dx * 0.09;
        dragVelocity = delta * 25;
        currentOffset = (currentOffset - delta) % 100;
        if (currentOffset < 0) currentOffset += 100;
        updatePositions();
      });

      window.addEventListener('pointerup', () => {
        if (isDragging) {
          isDragging = false;
          container.style.cursor = 'grab';
        }
      });

      function updatePositions() {
        nodes.forEach((node, i) => {
          let pos = (basePositions[i] + currentOffset) % 100;
          if (pos < 0) pos += 100;
          node.style.offsetDistance = \`\${pos}%\`;
          node.style.zIndex = Math.floor(1 + (pos / 100) * 15);
        });
      }

      let lastTime = performance.now();
      function animate(now) {
        const dt = (now - lastTime) / 1000;
        lastTime = now;

        if (!isDragging) {
          if (Math.abs(dragVelocity) > 0.01) {
            currentOffset = (currentOffset + dragVelocity * dt) % 100;
            dragVelocity *= 0.96;
          }
          const speed = isHovered ? 1.5 : 4.5;
          currentOffset = (currentOffset + speed * dt) % 100;
          if (currentOffset < 0) currentOffset += 100;
          updatePositions();
        }

        requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
    })();\n\n    `);

// Replace Section 4 script
html = html.replace(/\/\/ ==========================================\s*\n\s*\/\/ SECTION 4: SCRAPBOOK PAGEFLIP[\s\S]*?\}\)\(\);/i,
`// ==========================================
    // SECTION 4: SMOOTH & EFFICIENT BOOK FLIP (NO MENU)
    // ==========================================
    (function initScrapbook() {
      const bookEl = document.getElementById('flipBook');
      if (!bookEl) return;

      let attempts = 0;
      function setupPageFlip() {
        if (!window.St || !window.St.PageFlip) {
          if (attempts++ < 50) setTimeout(setupPageFlip, 80);
          return;
        }

        try {
          const pageFlip = new St.PageFlip(bookEl, {
            width: 400,
            height: 500,
            size: "fixed",
            minWidth: 320,
            maxWidth: 500,
            minHeight: 400,
            maxHeight: 620,
            drawShadow: true,
            maxShadowOpacity: 0.35,
            showCover: true,
            usePortrait: false,
            startPage: 0,
            flippingTime: 650,
            useMouseEvents: true,
            swipeDistance: 25,
            showPageCorners: true,
          });

          pageFlip.loadFromHTML(bookEl.querySelectorAll('.book-page'));

          bookEl.addEventListener('click', (e) => {
            const rect = bookEl.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            if (clickX > rect.width / 2) {
              pageFlip.flipNext('top');
            } else {
              pageFlip.flipPrev('top');
            }
          });

          window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') pageFlip.flipNext('top');
            if (e.key === 'ArrowLeft') pageFlip.flipPrev('top');
          });
        } catch (e) {
          console.warn('PageFlip init:', e);
        }
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupPageFlip);
      } else {
        setupPageFlip();
      }
    })();`);

fs.writeFileSync('index.html', html);
console.log('Successfully updated index.html! File length:', html.length);
