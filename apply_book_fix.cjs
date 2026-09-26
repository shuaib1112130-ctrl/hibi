const fs = require('fs');

console.log('Restoring the scrapbook flipbook section as made before...');

const scrapbookSectionHtml = `      <!-- ================= SECTION 4: SCRAPBOOK FLIPBOOK ================= -->
      <section class="h-screen w-full snap-start snap-always shrink-0 overflow-visible relative z-10">
        <div class="flex h-screen overflow-hidden flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black select-none">
          <div id="flipBook" class="shadow-2xl">
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

          <!-- Scrapbook Controls & Navigation -->
          <div class="mt-8 flex items-center justify-center gap-5 z-20">
            <button id="bookPrevBtn" class="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 dark:bg-zinc-800/90 shadow-md hover:shadow-lg transition-all duration-200 text-neutral-800 dark:text-neutral-200 font-medium text-sm hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm border border-neutral-200 dark:border-zinc-700">
              <span class="text-base leading-none">❮</span>
              <span>Previous</span>
            </button>
            <span id="bookPageIndicator" class="hero-mono text-xs uppercase tracking-widest text-[#8A8A80] font-semibold min-w-[130px] text-center px-4 py-1.5 bg-white/70 dark:bg-zinc-800/70 rounded-full border border-neutral-200 dark:border-zinc-700 shadow-sm">
              Front Cover
            </span>
            <button id="bookNextBtn" class="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 dark:bg-zinc-800/90 shadow-md hover:shadow-lg transition-all duration-200 text-neutral-800 dark:text-neutral-200 font-medium text-sm hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm border border-neutral-200 dark:border-zinc-700">
              <span>Next</span>
              <span class="text-base leading-none">❯</span>
            </button>
          </div>
          <p class="mt-3 text-xs text-[#8A8A80] tracking-wide pointer-events-none">
            Click page edges, drag corners, or use ← → arrow keys to flip
          </p>
        </div>
      </section>`;

// 1. Read current index.html
const indexHtml = fs.readFileSync('index.html', 'utf8');

// 2. Replace Section 4
const sec4Regex = /<!-- ================= SECTION 4: SCRAPBOOK[\s\S]*?<\/section>/i;
let updatedHtml = indexHtml.replace(sec4Regex, scrapbookSectionHtml);

// 3. Ensure the CSS has .scrapbook-el and .scrapbook-shadow
const extraCss = `
    .book-page {
      position: relative;
      background-color: #fffbeb;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
      overflow: hidden;
      width: 400px;
      height: 500px;
      transform-origin: center center;
    }

    .scrapbook-el {
      position: absolute;
      top: 0;
      left: 0;
      width: 400px;
      height: 500px;
      object-fit: contain;
      pointer-events: none;
      user-select: none;
      transform-origin: center center;
      translate: none !important;
      rotate: none !important;
      scale: none !important;
    }

    .scrapbook-shadow {
      filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.35));
    }
`;

if (!updatedHtml.includes('.scrapbook-el')) {
  updatedHtml = updatedHtml.replace('</style>', extraCss + '\n  </style>');
}

// 4. Update the initScrapbook script to wire up prevBtn, nextBtn, indicator, and click/key events
const scrapbookScript = `
    // ==========================================
    // SECTION 4: SCRAPBOOK PAGEFLIP
    // ==========================================
    (function initScrapbook() {
      const bookEl = document.getElementById("flipBook");
      if (!bookEl) return;

      const prevBtn = document.getElementById("bookPrevBtn");
      const nextBtn = document.getElementById("bookNextBtn");
      const indicator = document.getElementById("bookPageIndicator");

      function updatePageIndicator(pageIndex) {
        if (!indicator) return;
        if (pageIndex === 0) {
          indicator.textContent = "Front Cover";
        } else if (pageIndex >= 7) {
          indicator.textContent = "Back Cover";
        } else {
          indicator.textContent = \`Pages \${pageIndex}-\${pageIndex + 1} of 8\`;
        }
      }

      let attempts = 0;
      function setupPageFlip() {
        if (!window.St || !window.St.PageFlip) {
          if (attempts++ < 50) {
            setTimeout(setupPageFlip, 100);
          }
          return;
        }

        try {
          const pageFlip = new St.PageFlip(bookEl, {
            width: 400,
            height: 500,
            size: "fixed",
            autoSize: false,
            showCover: true,
            drawShadow: true,
            maxShadowOpacity: 0.5,
            usePortrait: false,
            startPage: 0
          });

          pageFlip.loadFromHTML(bookEl.querySelectorAll(".book-page"));

          // Click on left/right half to turn page
          bookEl.addEventListener("click", (e) => {
            const rect = bookEl.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            if (clickX > rect.width / 2) {
              pageFlip.flipNext();
            } else {
              pageFlip.flipPrev();
            }
          });

          if (prevBtn) {
            prevBtn.addEventListener("click", (e) => {
              e.stopPropagation();
              pageFlip.flipPrev();
            });
          }

          if (nextBtn) {
            nextBtn.addEventListener("click", (e) => {
              e.stopPropagation();
              pageFlip.flipNext();
            });
          }

          pageFlip.on("flip", (e) => {
            updatePageIndicator(e.data);
          });

          pageFlip.on("changeState", () => {
            try {
              updatePageIndicator(pageFlip.getCurrentPageIndex());
            } catch (_) {}
          });

          // Keyboard arrow support
          window.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight") {
              pageFlip.flipNext();
            } else if (e.key === "ArrowLeft") {
              pageFlip.flipPrev();
            }
          });

          updatePageIndicator(0);
        } catch (e) {
          console.warn("PageFlip instantiation:", e);
        }
      }

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", setupPageFlip);
      } else {
        setupPageFlip();
      }
    })();
`;

const oldScriptRegex = /\/\/ ==========================================\s*\n\s*\/\/ SECTION 4: SCRAPBOOK PAGEFLIP[\s\S]*?\}\)\(\);/i;
if (oldScriptRegex.test(updatedHtml)) {
  updatedHtml = updatedHtml.replace(oldScriptRegex, scrapbookScript.trim());
}

fs.writeFileSync('index.html', updatedHtml);
console.log('Successfully updated index.html with the previous book section! Length:', updatedHtml.length);
