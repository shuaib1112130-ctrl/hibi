const fs = require('fs');

console.log('Building updated website with Section 2 photos above text, 3 new book pages with unique photos, single-page flip fix, and mobile responsiveness...');

// All 19 unique photos
// Photo assignments:
// Page 2: girl.jpg
// Page 3: girl6.jpg, girl2.jpg, girl3.jpg
// Page 4: girl4.jpg
// Page 5: girl5.jpg, girl1.jpg
// Page 6: girl11.jpg, girl10.jpg
// Page 7: girl9.jpg, girl8.jpg
// Page 8: girl12.jpg, girl13.jpg
// Page 9: girl14.jpg, girl15.jpg, girl16.jpg
// Page 10: girl17.jpg, girl18.jpg, girl7.jpg
// ALL 19 PHOTOS ARE COMPLETELY UNIQUE! ZERO DUPLICATES!

// Define the 10 book pages
const bookPagesHtml = `
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

            <!-- Page 3: Right Page (Paper, starB, girl6, girl2, girl3, frame9, text2, kit) -->
            <div class="book-page relative overflow-hidden bg-amber-50 text-black cursor-pointer" style="width:400px; height:500px">
              <img src="/pages/right.jpg" alt="Paper" draggable="false" class="scrapbook-el" style="transform: none;" />
              <img src="/elements/paper.png" alt="Paper" draggable="false" class="scrapbook-el scrapbook-shadow" style="transform: translate(72px, 152px) rotate(90deg) scale(0.5);" />
              <img src="/elements/starB.png" alt="Star" draggable="false" class="scrapbook-el scrapbook-shadow" style="transform: translate(-68px, 120px) rotate(-50deg) scale(0.5);" />
              <img src="/ref/girl6.jpg" alt="Photo" draggable="false" class="scrapbook-el scrapbook-shadow" style="transform: translate(76px, -88px) rotate(20deg) scale(0.22);" />
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

            <!-- Page 5: Right Page (Side2, billa, boqey, girl5, frame5, miss, girl1) -->
            <div class="book-page relative overflow-hidden bg-amber-50 text-black cursor-pointer" style="width:400px; height:500px">
              <img src="/pages/right.jpg" alt="Paper" draggable="false" class="scrapbook-el" style="transform: none;" />
              <img src="/elements/side2.png" alt="Tape" draggable="false" class="scrapbook-el" style="transform: translate(64px, 92px) scale(0.68); z-index: 50;" />
              <img src="/elements/billa.png" alt="Cat" draggable="false" class="scrapbook-el" style="transform: translate(-56px, -112px) scale(0.38); z-index: 50;" />
              <img src="/elements/boqey.png" alt="Bouquet" draggable="false" class="scrapbook-el" style="transform: translate(-56px, 112px) scale(0.48); z-index: 50;" />
              <img src="/ref/girl5.jpg" alt="Girl 5" draggable="false" class="scrapbook-el" style="transform: translate(76px, -128px) scale(0.32); z-index: 50;" />
              <img src="/ref/girl1.jpg" alt="Girl 1" draggable="false" class="scrapbook-el" style="transform: translate(72px, -112px) scale(0.68); z-index: 50;" />
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

            <!-- Page 8: NEW Left Page (Girl12, Girl13, Paper note, Butter, Frame10) -->
            <div class="book-page relative overflow-hidden bg-amber-50 text-black cursor-pointer" style="width:400px; height:500px">
              <img src="/pages/left.jpg" alt="Paper" draggable="false" class="scrapbook-el" style="transform: none;" />
              <img src="/elements/paper.png" alt="Paper" draggable="false" class="scrapbook-el scrapbook-shadow" style="transform: translate(-60px, -120px) rotate(-15deg) scale(0.52);" />
              <img src="/elements/side1.png" alt="Tape" draggable="false" class="scrapbook-el" style="transform: translate(90px, -180px) rotate(45deg) scale(0.48);" />
              <img src="/ref/girl12.jpg" alt="Girl 12" draggable="false" class="scrapbook-el scrapbook-shadow" style="transform: translate(-40px, -60px) rotate(-6deg) scale(0.32); z-index: 25;" />
              <img src="/elements/frame10.png" alt="Frame" draggable="false" class="scrapbook-el" style="transform: translate(-40px, -50px) rotate(-6deg) scale(0.62); z-index: 26;" />
              <img src="/ref/girl13.jpg" alt="Girl 13" draggable="false" class="scrapbook-el scrapbook-shadow" style="transform: translate(65px, 80px) rotate(8deg) scale(0.30); z-index: 25;" />
              <img src="/elements/butter.png" alt="Butterfly" draggable="false" class="scrapbook-el" style="transform: translate(-100px, 140px) rotate(15deg) scale(0.42); z-index: 30;" />
              <img src="/elements/billa.png" alt="Cat" draggable="false" class="scrapbook-el" style="transform: translate(80px, -50px) scale(0.35); z-index: 30;" />
              <img src="/elements/text1.png" alt="Text" draggable="false" class="scrapbook-el" style="transform: translate(30px, 170px) scale(0.40); z-index: 30;" />
            </div>

            <!-- Page 9: NEW Right Page (Girl14, Girl15, Girl16, Side3, StarB, Lovetape) -->
            <div class="book-page relative overflow-hidden bg-amber-50 text-black cursor-pointer" style="width:400px; height:500px">
              <img src="/pages/right.jpg" alt="Paper" draggable="false" class="scrapbook-el" style="transform: none;" />
              <img src="/elements/side3.png" alt="Tape" draggable="false" class="scrapbook-el" style="transform: translate(-90px, -170px) scale(0.65);" />
              <img src="/ref/girl14.jpg" alt="Girl 14" draggable="false" class="scrapbook-el scrapbook-shadow" style="transform: translate(60px, -110px) rotate(12deg) scale(0.28); z-index: 20;" />
              <img src="/ref/girl15.jpg" alt="Girl 15" draggable="false" class="scrapbook-el scrapbook-shadow" style="transform: translate(-45px, 10px) rotate(-8deg) scale(0.30); z-index: 20;" />
              <img src="/elements/frame11.png" alt="Frame" draggable="false" class="scrapbook-el" style="transform: translate(-45px, 15px) rotate(-8deg) scale(0.68); z-index: 21;" />
              <img src="/ref/girl16.jpg" alt="Girl 16" draggable="false" class="scrapbook-el scrapbook-shadow" style="transform: translate(55px, 115px) rotate(14deg) scale(0.28); z-index: 20;" />
              <img src="/elements/starB.png" alt="Star" draggable="false" class="scrapbook-el scrapbook-shadow" style="transform: translate(-80px, 140px) rotate(25deg) scale(0.45); z-index: 25;" />
              <img src="/elements/lovetape.png" alt="Love tape" draggable="false" class="scrapbook-el" style="transform: translate(75px, -30px) scale(0.22); z-index: 25;" />
              <img src="/elements/text2.png" alt="Text" draggable="false" class="scrapbook-el" style="transform: translate(-50px, -120px) scale(0.48); z-index: 25;" />
            </div>

            <!-- Page 10: NEW Left Page (Girl17, Girl18, Girl7, Side4, Moon, Kit) -->
            <div class="book-page relative overflow-hidden bg-amber-50 text-black cursor-pointer" style="width:400px; height:500px">
              <img src="/pages/left.jpg" alt="Paper" draggable="false" class="scrapbook-el" style="transform: none;" />
              <img src="/elements/side4.png" alt="Side deco" draggable="false" class="scrapbook-el" style="transform: translate(-100px, 70px) scale(0.62);" />
              <img src="/ref/girl17.jpg" alt="Girl 17" draggable="false" class="scrapbook-el scrapbook-shadow" style="transform: translate(-45px, -90px) rotate(-10deg) scale(0.30); z-index: 20;" />
              <img src="/elements/frame9.png" alt="Frame" draggable="false" class="scrapbook-el" style="transform: translate(-45px, -85px) rotate(-10deg) scale(0.72); z-index: 21;" />
              <img src="/ref/girl18.jpg" alt="Girl 18" draggable="false" class="scrapbook-el scrapbook-shadow" style="transform: translate(65px, -70px) rotate(15deg) scale(0.28); z-index: 20;" />
              <img src="/ref/girl7.jpg" alt="Girl 7" draggable="false" class="scrapbook-el scrapbook-shadow" style="transform: translate(30px, 85px) rotate(5deg) scale(0.32); z-index: 20;" />
              <img src="/elements/moon.png" alt="Moon" draggable="false" class="scrapbook-el" style="transform: translate(-90px, -160px) scale(0.30); z-index: 25;" />
              <img src="/elements/billa5.png" alt="Cat" draggable="false" class="scrapbook-el" style="transform: translate(-70px, 140px) scale(0.55); z-index: 25;" />
              <img src="/elements/text4.png" alt="Text" draggable="false" class="scrapbook-el" style="transform: translate(40px, 170px) scale(0.45); z-index: 25;" />
            </div>

            <!-- Page 11: Hard Back Cover -->
            <div class="book-page bg-blue-700 text-white cursor-pointer" data-density="hard" style="width:400px; height:500px">
              <img src="/pages/back.png" alt="Back Cover" draggable="false" class="scrapbook-el" style="transform: translate(12px, 0px) scale(1.3);" />
            </div>
`;

// Section 2 HTML: Photos above the text!
// On desktop: Photos float prominently in front of and above the text (z-index 30 over text z-10).
// On mobile: Stacked with marquee photo track at top, headline directly beneath it!
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

const marqueeItems = [...memories, ...memories];

let marqueeNodesHtml = '';
marqueeItems.forEach((item, idx) => {
  const percent = (idx * (100 / marqueeItems.length)).toFixed(4);
  marqueeNodesHtml += `
            <div class="absolute top-0 left-0 cursor-grab active:cursor-grabbing select-none" style="offset-path: path('M1 209.434C58.5872 255.935 387.926 325.938 482.583 209.434C600.905 63.8051 525.516 -43.2211 427.332 19.9613C329.149 83.1436 352.902 242.723 515.041 267.302C644.752 286.966 943.56 181.94 995 156.5'); offset-rotate: auto; offset-distance: ${percent}%; will-change: offset-distance; backface-visibility: hidden; z-index: 30;">
              <div class="h-16 w-16 sm:h-22 sm:w-22 md:h-24 md:w-24 bg-white p-1 sm:p-1.5 shadow-lg border border-neutral-200/90 rounded-sm overflow-hidden transition-transform duration-300 ease-out hover:scale-115 hover:shadow-2xl">
                <img src="${item.src}" alt="Memory ${idx + 1}" draggable="false" class="h-full w-full object-cover grayscale transition-[filter] duration-300 ease-out hover:grayscale-0 pointer-events-none" />
              </div>
            </div>`;
});

const section2Html = `      <!-- ================= SECTION 2: HERO SECTION ================= -->
      <section class="min-h-screen h-screen w-full snap-start snap-always shrink-0 overflow-hidden relative z-10 bg-[#FAFAF7] flex flex-col justify-between">
        
        <!-- PHOTOS ABOVE TEXT LAYER: Full-width ribbon loop positioned prominently -->
        <div class="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-auto z-30">
          <div id="marqueeContainer" class="relative w-full h-[320px] sm:h-[420px] md:h-[480px] lg:h-[540px] cursor-grab active:cursor-grabbing select-none overflow-visible">
            <svg id="marqueeSvg" width="100%" height="100%" viewBox="0 0 996 330" preserveAspectRatio="xMidYMid meet" class="w-full h-full pointer-events-none opacity-0">
              <path id="marqueePath" d="M1 209.434C58.5872 255.935 387.926 325.938 482.583 209.434C600.905 63.8051 525.516 -43.2211 427.332 19.9613C329.149 83.1436 352.902 242.723 515.041 267.302C644.752 286.966 943.56 181.94 995 156.5" stroke="none" fill="none"></path>
            </svg>
            <div id="marqueeNodes" class="absolute inset-0 w-full h-full">
${marqueeNodesHtml}
            </div>
          </div>
        </div>

        <!-- TEXT CONTENT: Headline & Subtitle rendered cleanly behind the floating ribbon -->
        <div class="relative z-10 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20 max-w-2xl my-auto pointer-events-none pt-12 sm:pt-0">
          <h1 class="hero-display text-[13vw] sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.88] tracking-tight text-[#14140F]">
            <span class="font-light block">Happy</span>
            <span class="font-bold block text-black">Birthday</span>
            <span class="font-bold block text-amber-500">Sweety</span>
          </h1>
          <div class="mt-4 sm:mt-6 h-[2px] w-14 sm:w-16 bg-[#9C7A3F]"></div>
          <p class="hero-body mt-4 sm:mt-6 max-w-sm text-sm sm:text-base md:text-lg leading-relaxed text-[#4A4A42]">
            May this year bring you closer to everything you're chasing.
          </p>
        </div>

        <!-- Footer: MADE FOR YOU -->
        <div class="relative z-10 flex items-center justify-end px-6 pb-6 sm:px-14 sm:pb-8 w-full pointer-events-none">
          <div class="h-px flex-1 max-w-[200px] bg-[#14140F]/15 mr-4"></div>
          <span class="hero-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#8A8A80]">MADE FOR YOU</span>
        </div>
      </section>`;

// Section 3: Fully responsive Polaroid Cards
const section3Html = `      <!-- ================= SECTION 3: MADE FOR YOU ================= -->
      <section class="min-h-screen h-screen w-full snap-start snap-always shrink-0 overflow-hidden relative z-10">
        <div id="madeForYouContainer"
          class="[perspective:3000px] w-full h-full relative min-h-screen overflow-hidden bg-[#d9d3c7] before:absolute before:inset-0 before:pointer-events-none before:bg-[linear-gradient(rgba(120,110,90,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(120,110,90,0.12)_1px,transparent_1px)] before:bg-[size:40px_40px] after:absolute after:inset-0 after:pointer-events-none after:bg-[radial-gradient(circle,transparent_30%,rgba(0,0,0,0.08))]">
          
          <!-- 9 Draggable Polaroid Cards with 3D Spring Tilt -->
          <div class="min-h-48 sm:min-h-60 w-40 sm:w-52 transform-3d absolute top-[8%] left-[4%] sm:left-[8%] rotate-[-8deg] bg-white rounded-xl shadow-xl p-2 sm:p-3 overflow-visible cursor-grab active:cursor-grabbing touch-none select-none z-10 hover:scale-[1.03]" draggable="false">
            <div class="relative overflow-visible">
              <img src="/ref/girl3.jpg" alt="girl3.jpg" draggable="false" class="h-40 w-40 sm:h-56 sm:w-56 rounded-lg object-cover pointer-events-none select-none" />
              <div class="absolute -top-5 sm:-top-7 -right-5 sm:-right-7 text-3xl sm:text-5xl z-50 pointer-events-none drop-shadow-md">❤️</div>
              <p class="mt-2 sm:mt-3 text-center text-neutral-700 text-2xl sm:text-3xl font-semibold font-caveat pointer-events-none">Cutie 🥹</p>
            </div>
            <div class="pointer-events-none absolute inset-0 bg-white select-none mix-blend-overlay" style="opacity:0"></div>
          </div>

          <div class="min-h-48 sm:min-h-60 w-40 sm:w-52 transform-3d absolute top-[14%] left-[48%] sm:left-[35%] rotate-[6deg] bg-white rounded-xl shadow-xl p-2 sm:p-3 overflow-visible cursor-grab active:cursor-grabbing touch-none select-none z-10 hover:scale-[1.03]" draggable="false">
            <div class="relative overflow-visible">
              <img src="/ref/girl4.jpg" alt="girl4.jpg" draggable="false" class="h-40 w-40 sm:h-56 sm:w-56 rounded-lg object-cover pointer-events-none select-none" />
              <div class="absolute -top-5 sm:-top-7 -right-5 sm:-right-7 text-3xl sm:text-5xl z-50 pointer-events-none drop-shadow-md">❤️</div>
              <p class="mt-2 sm:mt-3 text-center text-neutral-700 text-2xl sm:text-3xl font-semibold font-caveat pointer-events-none">Baddie 😎</p>
            </div>
            <div class="pointer-events-none absolute inset-0 bg-white select-none mix-blend-overlay" style="opacity:0"></div>
          </div>

          <div class="min-h-48 sm:min-h-60 w-40 sm:w-52 transform-3d absolute top-[10%] right-[4%] sm:right-[10%] rotate-[-5deg] bg-white rounded-xl shadow-xl p-2 sm:p-3 overflow-visible cursor-grab active:cursor-grabbing touch-none select-none z-10 hover:scale-[1.03]" draggable="false">
            <div class="relative overflow-visible">
              <img src="/ref/girl5.jpg" alt="girl5.jpg" draggable="false" class="h-40 w-40 sm:h-56 sm:w-56 rounded-lg object-cover pointer-events-none select-none" />
              <div class="absolute -top-5 sm:-top-7 -right-5 sm:-right-7 text-3xl sm:text-5xl z-50 pointer-events-none drop-shadow-md">❤️</div>
              <p class="mt-2 sm:mt-3 text-center text-neutral-700 text-2xl sm:text-3xl font-semibold font-caveat pointer-events-none">Pretty ✨</p>
            </div>
            <div class="pointer-events-none absolute inset-0 bg-white select-none mix-blend-overlay" style="opacity:0"></div>
          </div>

          <div class="min-h-48 sm:min-h-60 w-40 sm:w-52 transform-3d absolute top-[42%] left-[6%] sm:left-[12%] rotate-[7deg] bg-white rounded-xl shadow-xl p-2 sm:p-3 overflow-visible cursor-grab active:cursor-grabbing touch-none select-none z-10 hover:scale-[1.03]" draggable="false">
            <div class="relative overflow-visible">
              <img src="/ref/girl6.jpg" alt="girl6.jpg" draggable="false" class="h-40 w-40 sm:h-56 sm:w-56 rounded-lg object-cover pointer-events-none select-none" />
              <div class="absolute -top-5 sm:-top-7 -right-5 sm:-right-7 text-3xl sm:text-5xl z-50 pointer-events-none drop-shadow-md">❤️</div>
              <p class="mt-2 sm:mt-3 text-center text-neutral-700 text-2xl sm:text-3xl font-semibold font-caveat pointer-events-none">My Love 🤍</p>
            </div>
            <div class="pointer-events-none absolute inset-0 bg-white select-none mix-blend-overlay" style="opacity:0"></div>
          </div>

          <div class="min-h-48 sm:min-h-60 w-40 sm:w-52 transform-3d absolute top-[48%] left-[45%] sm:left-[40%] rotate-[-6deg] bg-white rounded-xl shadow-xl p-2 sm:p-3 overflow-visible cursor-grab active:cursor-grabbing touch-none select-none z-10 hover:scale-[1.03]" draggable="false">
            <div class="relative overflow-visible">
              <img src="/ref/girl7.jpg" alt="girl7.jpg" draggable="false" class="h-40 w-40 sm:h-56 sm:w-56 rounded-lg object-cover pointer-events-none select-none" />
              <div class="absolute -top-5 sm:-top-7 -right-5 sm:-right-7 text-3xl sm:text-5xl z-50 pointer-events-none drop-shadow-md">❤️</div>
              <p class="mt-2 sm:mt-3 text-center text-neutral-700 text-2xl sm:text-3xl font-semibold font-caveat pointer-events-none">Sunshine ☀️</p>
            </div>
            <div class="pointer-events-none absolute inset-0 bg-white select-none mix-blend-overlay" style="opacity:0"></div>
          </div>

          <div class="min-h-48 sm:min-h-60 w-40 sm:w-52 transform-3d absolute top-[38%] right-[5%] sm:right-[12%] rotate-[10deg] bg-white rounded-xl shadow-xl p-2 sm:p-3 overflow-visible cursor-grab active:cursor-grabbing touch-none select-none z-10 hover:scale-[1.03]" draggable="false">
            <div class="relative overflow-visible">
              <img src="/ref/girl8.jpg" alt="girl8.jpg" draggable="false" class="h-40 w-40 sm:h-56 sm:w-56 rounded-lg object-cover pointer-events-none select-none" />
              <div class="absolute -top-5 sm:-top-7 -right-5 sm:-right-7 text-3xl sm:text-5xl z-50 pointer-events-none drop-shadow-md">❤️</div>
              <p class="mt-2 sm:mt-3 text-center text-neutral-700 text-2xl sm:text-3xl font-semibold font-caveat pointer-events-none">Angel 🪽</p>
            </div>
            <div class="pointer-events-none absolute inset-0 bg-white select-none mix-blend-overlay" style="opacity:0"></div>
          </div>

          <div class="min-h-48 sm:min-h-60 w-40 sm:w-52 transform-3d absolute bottom-[10%] left-[8%] sm:left-[18%] rotate-[-10deg] bg-white rounded-xl shadow-xl p-2 sm:p-3 overflow-visible cursor-grab active:cursor-grabbing touch-none select-none z-10 hover:scale-[1.03]" draggable="false">
            <div class="relative overflow-visible">
              <img src="/ref/girl9.jpg" alt="girl9.jpg" draggable="false" class="h-40 w-40 sm:h-56 sm:w-56 rounded-lg object-cover pointer-events-none select-none" />
              <div class="absolute -top-5 sm:-top-7 -right-5 sm:-right-7 text-3xl sm:text-5xl z-50 pointer-events-none drop-shadow-md">❤️</div>
              <p class="mt-2 sm:mt-3 text-center text-neutral-700 text-2xl sm:text-3xl font-semibold font-caveat pointer-events-none">Beautiful 🌸</p>
            </div>
            <div class="pointer-events-none absolute inset-0 bg-white select-none mix-blend-overlay" style="opacity:0"></div>
          </div>

          <div class="min-h-48 sm:min-h-60 w-40 sm:w-52 transform-3d absolute bottom-[12%] left-[45%] rotate-[5deg] bg-white rounded-xl shadow-xl p-2 sm:p-3 overflow-visible cursor-grab active:cursor-grabbing touch-none select-none z-10 hover:scale-[1.03]" draggable="false">
            <div class="relative overflow-visible">
              <img src="/ref/girl10.jpg" alt="girl10.jpg" draggable="false" class="h-40 w-40 sm:h-56 sm:w-56 rounded-lg object-cover pointer-events-none select-none" />
              <div class="absolute -top-5 sm:-top-7 -right-5 sm:-right-7 text-3xl sm:text-5xl z-50 pointer-events-none drop-shadow-md">❤️</div>
              <p class="mt-2 sm:mt-3 text-center text-neutral-700 text-2xl sm:text-3xl font-semibold font-caveat pointer-events-none">Dream Girl 💫</p>
            </div>
            <div class="pointer-events-none absolute inset-0 bg-white select-none mix-blend-overlay" style="opacity:0"></div>
          </div>

          <div class="min-h-48 sm:min-h-60 w-40 sm:w-52 transform-3d absolute bottom-[8%] right-[8%] sm:right-[15%] rotate-[-7deg] bg-white rounded-xl shadow-xl p-2 sm:p-3 overflow-visible cursor-grab active:cursor-grabbing touch-none select-none z-10 hover:scale-[1.03]" draggable="false">
            <div class="relative overflow-visible">
              <img src="/ref/girl11.jpg" alt="girl11.jpg" draggable="false" class="h-40 w-40 sm:h-56 sm:w-56 rounded-lg object-cover pointer-events-none select-none" />
              <div class="absolute -top-5 sm:-top-7 -right-5 sm:-right-7 text-3xl sm:text-5xl z-50 pointer-events-none drop-shadow-md">❤️</div>
              <p class="mt-2 sm:mt-3 text-center text-neutral-700 text-2xl sm:text-3xl font-semibold font-caveat pointer-events-none">Queen 👑</p>
            </div>
            <div class="pointer-events-none absolute inset-0 bg-white select-none mix-blend-overlay" style="opacity:0"></div>
          </div>

          <!-- Decorative Symbols -->
          <div class="absolute top-10 sm:top-20 left-6 sm:left-20 text-3xl sm:text-5xl opacity-30 pointer-events-none">✿</div>
          <div class="absolute bottom-10 sm:bottom-20 right-6 sm:right-20 text-3xl sm:text-5xl opacity-30 pointer-events-none">♡</div>
          <div class="absolute top-[45%] right-[5%] text-2xl sm:text-4xl opacity-30 pointer-events-none">✨</div>
        </div>
      </section>`;

// Section 4 HTML: Clean, menu removed, smooth responsive book
const section4CleanHtml = `      <!-- ================= SECTION 4: SCRAPBOOK FLIPBOOK ================= -->
      <section class="min-h-screen h-screen w-full snap-start snap-always shrink-0 overflow-hidden relative z-10 bg-zinc-50 dark:bg-black">
        <div class="flex h-screen w-full overflow-hidden flex-col items-center justify-center select-none px-2 sm:px-4">
          <div id="flipBook" class="shadow-2xl cursor-pointer">
${bookPagesHtml}
          </div>
        </div>
      </section>`;

const fullHtml = `<!DOCTYPE html>
<html lang="en" class="h-screen overflow-hidden antialiased">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
  <title>Create Next App</title>
  <meta name="description" content="Generated by create next app" />

  <!-- Google Fonts matching reference -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300..800&family=Caveat:wght@400..700&family=JetBrains+Mono:wght@400;500&family=Work+Sans:wght@400;500&family=Archivo+Black&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">

  <!-- Reference Tailwind Compiled CSS -->
  <link rel="stylesheet" href="/original_app.css" />

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            display: ['"Bricolage Grotesque"', 'sans-serif'],
            body: ['"Work Sans"', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace'],
            caveat: ['"Caveat"', 'cursive'],
          }
        }
      }
    }
  </script>

  <!-- PageFlip Library -->
  <script src="/page-flip.browser.js"></script>
  <script>
    if (!window.St || !window.St.PageFlip) {
      document.write('<script src="https://cdn.jsdelivr.net/npm/page-flip@2.0.7/dist/js/page-flip.browser.js"><\\/script>');
    }
  </script>

  <style>
    .hero-display {
      font-family: 'Bricolage Grotesque', sans-serif;
    }
    .hero-body {
      font-family: 'Work Sans', sans-serif;
    }
    .hero-mono {
      font-family: 'JetBrains Mono', monospace;
    }
    .font-caveat {
      font-family: 'Caveat', cursive;
    }
    .transform-3d {
      transform-style: preserve-3d;
    }
    ::-webkit-scrollbar {
      width: 0px;
      height: 0px;
      background: transparent;
    }
    .book-page {
      position: relative;
      background-color: #fffbeb;
      box-shadow: 0 0 25px rgba(0, 0, 0, 0.25);
      overflow: hidden;
      width: 400px;
      height: 500px;
      transform-origin: center center;
      will-change: transform;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
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
      will-change: transform;
      backface-visibility: hidden;
    }
    .scrapbook-shadow {
      filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.35));
    }

    /* Mobile responsiveness for book */
    @media (max-width: 640px) {
      .book-page {
        width: 320px !important;
        height: 440px !important;
      }
      .scrapbook-el {
        width: 320px !important;
        height: 440px !important;
      }
    }
  </style>
</head>
<body class="h-screen w-full overflow-hidden m-0 p-0">
  <div class="h-full w-full overflow-x-hidden overflow-y-scroll snap-y snap-mandatory bg-zinc-50 dark:bg-black select-none scroll-smooth">

    <!-- ================= SECTION 1: BIRTHDAY REVEAL ================= -->
    <section class="min-h-screen h-screen w-full snap-start snap-always shrink-0 overflow-hidden relative z-10">
      <iframe src="/birthday.html" title="Birthday Reveal" style="width:100vw;height:100vh;border:none;display:block" allow="autoplay"></iframe>
    </section>

${section2Html}

${section3Html}

${section4CleanHtml}

  </div>

  <!-- SCRIPTS -->
  <script>
    // ==========================================
    // SECTION 2: CURVED MARQUEE ANIMATION & DRAG (PHOTOS ABOVE TEXT)
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
        const delta = dx * 0.08;
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
          node.style.zIndex = Math.floor(30 + (pos / 100) * 15);
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
          const speed = isHovered ? 1.5 : 4.0;
          currentOffset = (currentOffset + speed * dt) % 100;
          if (currentOffset < 0) currentOffset += 100;
          updatePositions();
        }

        requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
    })();

    // ==========================================
    // SECTION 3: MADE FOR YOU POLAROIDS DRAG & TILT
    // ==========================================
    (function initMadeForYou() {
      const cards = document.querySelectorAll('section:nth-of-type(3) .transform-3d');
      if (!cards || cards.length === 0) return;

      cards.forEach(card => {
        let isDragging = false;
        let startX = 0, startY = 0;
        let transX = 0, transY = 0;
        const glare = card.querySelector('.mix-blend-overlay');

        card.addEventListener('pointerdown', (e) => {
          isDragging = true;
          startX = e.clientX - transX;
          startY = e.clientY - transY;
          card.setPointerCapture(e.pointerId);
          card.style.zIndex = '50';
        });

        card.addEventListener('pointermove', (e) => {
          const rect = card.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const normX = (e.clientX - centerX) / (rect.width / 2);
          const normY = (e.clientY - centerY) / (rect.height / 2);
          const rotX = -normY * 18;
          const rotY = normX * 18;

          if (isDragging) {
            transX = e.clientX - startX;
            transY = e.clientY - startY;
          }

          card.style.transform = \`translate3d(\${transX}px, \${transY}px, 0px) perspective(1000px) rotateX(\${rotX}deg) rotateY(\${rotY}deg)\`;
          if (glare) {
            glare.style.opacity = Math.min(0.25, (Math.abs(rotX) + Math.abs(rotY)) / 100);
          }
        });

        const resetTilt = (e) => {
          isDragging = false;
          try { card.releasePointerCapture(e.pointerId); } catch (_) {}
          card.style.transform = \`translate3d(\${transX}px, \${transY}px, 0px) perspective(1000px) rotateX(0deg) rotateY(0deg)\`;
          if (glare) glare.style.opacity = '0';
        };

        card.addEventListener('pointerup', resetTilt);
        card.addEventListener('pointerleave', resetTilt);
      });
    })();

    // ==========================================
    // SECTION 4: EXACT ONE-PAGE-AT-A-TIME SMOOTH FLIP (NO MENU)
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
          const isMobile = window.innerWidth < 640;
          const pageWidth = isMobile ? Math.min(320, window.innerWidth - 30) : 400;
          const pageHeight = isMobile ? Math.min(440, window.innerHeight * 0.65) : 500;

          // Adjust book-page styles for mobile if needed
          if (isMobile) {
            bookEl.querySelectorAll('.book-page').forEach(p => {
              p.style.width = pageWidth + 'px';
              p.style.height = pageHeight + 'px';
            });
            bookEl.querySelectorAll('.scrapbook-el').forEach(el => {
              el.style.width = pageWidth + 'px';
              el.style.height = pageHeight + 'px';
            });
          }

          // Single page flip guarantee:
          // In PageFlip, useMouseEvents: false prevents built-in dual triggering!
          // We manage exactly ONE flip per click with isFlipping debounce guard!
          const pageFlip = new St.PageFlip(bookEl, {
            width: pageWidth,
            height: pageHeight,
            size: "fixed",
            minWidth: 280,
            maxWidth: 450,
            minHeight: 380,
            maxHeight: 560,
            drawShadow: true,
            maxShadowOpacity: 0.35,
            showCover: true,
            usePortrait: isMobile, // Single page portrait view on mobile!
            startPage: 0,
            flippingTime: 550, // snappy, natural, smooth flip
            useMouseEvents: false, // Prevent native duplicate click firing
            swipeDistance: 20,
            showPageCorners: true,
          });

          pageFlip.loadFromHTML(bookEl.querySelectorAll('.book-page'));

          let isFlipping = false;
          pageFlip.on('flip', () => {
            isFlipping = false;
          });
          pageFlip.on('changeState', (state) => {
            if (state.data === 'read') isFlipping = false;
          });

          // Single click listener with strict guard: EXACTLY ONE PAGE FLIP PER CLICK
          bookEl.addEventListener('click', (e) => {
            if (isFlipping) return;
            isFlipping = true;

            const rect = bookEl.getBoundingClientRect();
            const clickX = e.clientX - rect.left;

            if (clickX > rect.width / 2) {
              pageFlip.flipNext('top');
            } else {
              pageFlip.flipPrev('top');
            }

            // Safety timeout in case flip event does not fire
            setTimeout(() => { isFlipping = false; }, 600);
          });

          // Touch gestures for mobile: swipe left to go next, swipe right to go prev
          let touchStartX = 0;
          let touchStartY = 0;
          bookEl.addEventListener('touchstart', (e) => {
            if (e.touches && e.touches[0]) {
              touchStartX = e.touches[0].clientX;
              touchStartY = e.touches[0].clientY;
            }
          }, { passive: true });

          bookEl.addEventListener('touchend', (e) => {
            if (isFlipping || !e.changedTouches || !e.changedTouches[0]) return;
            const diffX = e.changedTouches[0].clientX - touchStartX;
            const diffY = e.changedTouches[0].clientY - touchStartY;
            if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
              isFlipping = true;
              if (diffX < 0) {
                pageFlip.flipNext('top');
              } else {
                pageFlip.flipPrev('top');
              }
              setTimeout(() => { isFlipping = false; }, 600);
            }
          }, { passive: true });

          // Keyboard arrow navigation
          window.addEventListener('keydown', (e) => {
            if (isFlipping) return;
            if (e.key === 'ArrowRight') {
              isFlipping = true;
              pageFlip.flipNext('top');
              setTimeout(() => { isFlipping = false; }, 600);
            }
            if (e.key === 'ArrowLeft') {
              isFlipping = true;
              pageFlip.flipPrev('top');
              setTimeout(() => { isFlipping = false; }, 600);
            }
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
    })();
  </script>
</body>
</html>`;

fs.writeFileSync('index.html', fullHtml);
console.log('Saved index.html, total size:', fullHtml.length);
