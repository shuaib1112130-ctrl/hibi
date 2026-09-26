const fs = require('fs');

const pages = JSON.parse(fs.readFileSync('parsed_scrapbook.json', 'utf8'));

let jsxPages = '';

for (const p of pages) {
  if (p.pageIndex === 1) continue; // empty split

  if (p.pageIndex === 2) {
    // Front cover
    jsxPages += `
        {/* Front Cover */}
        <div className="book-page bg-blue-700 text-white" data-density="hard" style={{ width: 400, height: 500 }}>
          <img
            src="/pages/front.png"
            alt="Front Cover"
            draggable={false}
            className="w-full h-full object-contain scale-130 translate-x-3 pointer-events-none select-none"
          />
          <div className="flex h-full items-center justify-center text-5xl font-bold"></div>
        </div>`;
  } else if (p.pageIndex === 9) {
    // Back cover
    jsxPages += `
        {/* Back Cover */}
        <div className="book-page bg-blue-700 text-white" data-density="hard" style={{ width: 400, height: 500 }}>
          <img
            src="/pages/back.png"
            alt="Back Cover"
            draggable={false}
            className="w-full h-full object-contain scale-130 translate-x-3 pointer-events-none select-none"
          />
        </div>`;
  } else {
    // Inner pages
    const isLeft = (p.pageIndex % 2 === 1);
    jsxPages += `
        {/* Page ${p.pageIndex} */}
        <div className="book-page relative overflow-hidden bg-amber-50 text-black" style={{ width: 400, height: 500 }}>`;

    for (const img of p.images) {
      jsxPages += `
          <img
            src="${img.src}"
            alt="Scrapbook element"
            draggable={false}
            className="absolute inset-0 w-full h-full ${img.className}"
          />`;
    }

    jsxPages += `
        </div>`;
  }
}

const componentCode = `import React, { useRef, useEffect } from "react";
import { PageFlip } from "page-flip";

export default function Scrapbook() {
  const bookRef = useRef(null);
  const flipInstance = useRef(null);

  useEffect(() => {
    if (!bookRef.current) return;

    try {
      const pageFlip = new PageFlip(bookRef.current, {
        width: 400,
        height: 500,
        autoSize: false,
        showCover: true,
        drawShadow: true,
        maxShadowOpacity: 0.5,
        usePortrait: false,
        startPage: 0,
      });

      pageFlip.loadFromHTML(bookRef.current.querySelectorAll(".book-page"));
      flipInstance.current = pageFlip;

      return () => {
        try {
          pageFlip.destroy();
        } catch (_) {}
      };
    } catch (e) {
      console.warn("PageFlip init failed:", e);
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div ref={bookRef}>
${jsxPages}
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/components/Scrapbook.jsx', componentCode);
console.log('Generated src/components/Scrapbook.jsx successfully.');
