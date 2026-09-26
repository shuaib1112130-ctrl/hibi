import React, { useRef, useEffect, useState } from "react";

export default function Scrapbook() {
  const bookRef = useRef(null);
  const flipInstance = useRef(null);
  const isFlippingRef = useRef(false);
  const [pageLabel, setPageLabel] = useState("Front Cover");

  useEffect(() => {
    let pageFlipInstance = null;

    const updateLabel = (index) => {
      if (index === 0) {
        setPageLabel("Front Cover");
      } else if (index >= 11) {
        setPageLabel("Back Cover");
      } else {
        setPageLabel(`Page ${index} of 12`);
      }
    };

    const initPageFlip = async () => {
      try {
        const module = await import("page-flip").catch(() => null);
        const PageFlipClass = module?.PageFlip || window.St?.PageFlip;
        if (PageFlipClass && bookRef.current) {
          const isMobile = window.innerWidth < 640;
          pageFlipInstance = new PageFlipClass(bookRef.current, {
            width: isMobile ? 320 : 400,
            height: isMobile ? 420 : 500,
            size: "fixed",
            autoSize: false,
            showCover: true,
            drawShadow: true,
            maxShadowOpacity: 0.5,
            usePortrait: isMobile,
            startPage: 0,
            useMouseEvents: false, // Prevent native PageFlip double-flip
            swipeDistance: 25,
          });
          pageFlipInstance.loadFromHTML(bookRef.current.querySelectorAll(".book-page"));
          flipInstance.current = pageFlipInstance;

          pageFlipInstance.on("flip", (e) => {
            updateLabel(e.data);
            setTimeout(() => {
              isFlippingRef.current = false;
            }, 250);
          });

          pageFlipInstance.on("changeState", (e) => {
            try {
              updateLabel(pageFlipInstance.getCurrentPageIndex());
              if (e.data === "read") {
                isFlippingRef.current = false;
              }
            } catch (_) {}
          });
        }
      } catch (err) {
        console.warn("PageFlip dynamic load failed:", err);
      }
    };

    initPageFlip();

    const handleKeyDown = (e) => {
      if (isFlippingRef.current) return;
      if (e.key === "ArrowRight") {
        isFlippingRef.current = true;
        flipInstance.current?.flipNext();
        setTimeout(() => { isFlippingRef.current = false; }, 600);
      } else if (e.key === "ArrowLeft") {
        isFlippingRef.current = true;
        flipInstance.current?.flipPrev();
        setTimeout(() => { isFlippingRef.current = false; }, 600);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (flipInstance.current) {
        try {
          flipInstance.current.destroy();
        } catch (_) {}
      }
    };
  }, []);

  const handleBookClick = (e) => {
    if (!bookRef.current || !flipInstance.current || isFlippingRef.current) return;

    const totalPages = flipInstance.current.getPageCount();
    const currentPage = flipInstance.current.getCurrentPageIndex();

    // When closed on front cover
    if (currentPage === 0) {
      isFlippingRef.current = true;
      flipInstance.current.flipNext('top');
      setTimeout(() => { isFlippingRef.current = false; }, 600);
      return;
    }

    // When closed on back cover: flip back to open
    if (currentPage >= totalPages - 1) {
      isFlippingRef.current = true;
      flipInstance.current.flipPrev('top');
      setTimeout(() => { isFlippingRef.current = false; }, 600);
      return;
    }

    const rect = bookRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    isFlippingRef.current = true;
    if (clickX > rect.width / 2) {
      flipInstance.current.flipNext('top');
    } else {
      flipInstance.current.flipPrev('top');
    }

    setTimeout(() => {
      isFlippingRef.current = false;
    }, 600);
  };

  return (
    <div className="flex h-screen overflow-hidden flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black select-none px-4">
      <div className="mb-4 text-xs tracking-widest uppercase text-stone-500 font-mono">
        {pageLabel}
      </div>
      <div ref={bookRef} onClick={handleBookClick} className="relative shadow-2xl cursor-pointer max-w-full">
        {/* Page 1: Hard Front Cover */}
        <div
          className="book-page bg-blue-700 text-white relative overflow-hidden cursor-pointer"
          data-density="hard"
          style={{ width: 400, height: 500 }}
        >
          <img
            src="/pages/front.png"
            alt="Front Cover"
            draggable={false}
            className="scrapbook-el"
            style={{ transform: "translate(12px, 0px) scale(1.3)" }}
          />
        </div>

        {/* Page 2: Left Page */}
        <div
          className="book-page relative overflow-hidden bg-amber-50 text-black cursor-pointer"
          style={{ width: 400, height: 500 }}
        >
          <img src="/pages/left.jpg" alt="Paper" draggable={false} className="scrapbook-el" style={{ transform: "none" }} />
          <img src="/elements/fwine.png" alt="Wine" draggable={false} className="scrapbook-el" style={{ transform: "translate(-136px, -132px) rotate(-12deg) scale(0.35)" }} />
          <img src="/elements/side3.png" alt="Tape" draggable={false} className="scrapbook-el" style={{ transform: "translate(-92px, -56px) scale(0.78)" }} />
          <img src="/elements/mouse.png" alt="Mouse" draggable={false} className="scrapbook-el" style={{ transform: "translate(80px, 184px) scale(0.55)", zIndex: 50 }} />
          <img src="/elements/butter.png" alt="Butterfly" draggable={false} className="scrapbook-el" style={{ transform: "translate(-112px, 128px) rotate(30deg) scale(0.45)" }} />
          <img src="/ref/girl.jpg" alt="Memory" draggable={false} className="scrapbook-el" style={{ transform: "translate(56px, -92px) rotate(10deg) scale(0.33)" }} />
          <img src="/elements/frame10.png" alt="Frame" draggable={false} className="scrapbook-el" style={{ transform: "translate(56px, -80px) rotate(10deg) scale(0.65)" }} />
          <img src="/elements/text1.png" alt="Text" draggable={false} className="scrapbook-el" style={{ transform: "translate(40px, 60px) scale(0.45)" }} />
        </div>

        {/* Page 3: Right Page */}
        <div
          className="book-page relative overflow-hidden bg-amber-50 text-black cursor-pointer"
          style={{ width: 400, height: 500 }}
        >
          <img src="/pages/right.jpg" alt="Paper" draggable={false} className="scrapbook-el" style={{ transform: "none" }} />
          <img src="/elements/paper.png" alt="Paper note" draggable={false} className="scrapbook-el scrapbook-shadow" style={{ transform: "translate(72px, 152px) rotate(90deg) scale(0.5)" }} />
          <img src="/elements/starB.png" alt="Star" draggable={false} className="scrapbook-el scrapbook-shadow" style={{ transform: "translate(-68px, 120px) rotate(-50deg) scale(0.5)" }} />
          <img src="/ref/girl6.jpg" alt="Photo 1" draggable={false} className="scrapbook-el scrapbook-shadow" style={{ transform: "translate(76px, -88px) rotate(20deg) scale(0.22)" }} />
          <img src="/ref/girl2.jpg" alt="Photo 2" draggable={false} className="scrapbook-el scrapbook-shadow" style={{ transform: "translate(104px, -172px) rotate(20deg) scale(0.22)" }} />
          <img src="/ref/girl3.jpg" alt="Photo 3" draggable={false} className="scrapbook-el scrapbook-shadow" style={{ transform: "translate(44px, 4px) rotate(20deg) scale(0.22)" }} />
          <img src="/elements/frame9.png" alt="Frame" draggable={false} className="scrapbook-el scrapbook-shadow" style={{ transform: "translate(72px, -80px) rotate(12deg) scale(0.8)" }} />
          <img src="/elements/text2.png" alt="Text" draggable={false} className="scrapbook-el scrapbook-shadow" style={{ transform: "translate(-52px, -160px) scale(0.6)" }} />
          <img src="/elements/kit.png" alt="Kit" draggable={false} className="scrapbook-el scrapbook-shadow" style={{ transform: "translate(-52px, -64px) scale(0.6)" }} />
        </div>

        {/* Page 4: Left Page */}
        <div
          className="book-page relative overflow-hidden bg-amber-50 text-black cursor-pointer"
          style={{ width: 400, height: 500 }}
        >
          <img src="/pages/left.jpg" alt="Paper" draggable={false} className="scrapbook-el" style={{ transform: "none" }} />
          <img src="/elements/billa6.png" alt="Cat" draggable={false} className="scrapbook-el" style={{ transform: "translate(-120px, -40px) rotate(1deg) scale(0.55)" }} />
          <img src="/elements/side1.png" alt="Side deco" draggable={false} className="scrapbook-el" style={{ transform: "translate(-104px, 124px) rotate(180deg) scale(0.5)" }} />
          <img src="/elements/starem.png" alt="Star" draggable={false} className="scrapbook-el" style={{ transform: "translate(72px, -224px) rotate(-18deg) scale(0.16)", zIndex: 20 }} />
          <img src="/ref/girl4.jpg" alt="Memory" draggable={false} className="scrapbook-el" style={{ transform: "translate(52px, -84px) rotate(17deg) scale(0.33)", zIndex: 30 }} />
          <img src="/elements/frame11.png" alt="Frame" draggable={false} className="scrapbook-el" style={{ transform: "translate(40px, -44px) rotate(18deg) scale(0.75)", zIndex: 30 }} />
          <img src="/elements/moon.png" alt="Moon" draggable="false" className="scrapbook-el" style={{ transform: "translate(-80px, 120px) rotate(-14deg) scale(0.34)", zIndex: 40 }} />
          <img src="/elements/fits.png" alt="Fits" draggable={false} className="scrapbook-el" style={{ transform: "translate(-120px, -200px) rotate(-14deg) scale(0.44)", zIndex: 40 }} />
          <img src="/elements/note1.png" alt="Note" draggable={false} className="scrapbook-el" style={{ transform: "translate(56px, 152px) rotate(-7deg) scale(0.68)", zIndex: 50 }} />
          <img src="/elements/lovetape.png" alt="Love tape" draggable={false} className="scrapbook-el" style={{ transform: "translate(40px, 96px) scale(0.19)", zIndex: 50 }} />
        </div>

        {/* Page 5: Right Page (Adjusted girl1.jpg inside frame5.png) */}
        <div
          className="book-page relative overflow-hidden bg-amber-50 text-black cursor-pointer"
          style={{ width: 400, height: 500 }}
        >
          <img src="/pages/right.jpg" alt="Paper" draggable={false} className="scrapbook-el" style={{ transform: "none" }} />
          <img src="/elements/side2.png" alt="Tape" draggable={false} className="scrapbook-el" style={{ transform: "translate(64px, 92px) scale(0.68)", zIndex: 40 }} />
          <img src="/elements/billa.png" alt="Cat" draggable={false} className="scrapbook-el" style={{ transform: "translate(-56px, -112px) scale(0.38)", zIndex: 40 }} />
          <img src="/elements/boqey.png" alt="Bouquet" draggable={false} className="scrapbook-el" style={{ transform: "translate(-56px, 112px) scale(0.48)", zIndex: 40 }} />
          
          <div className="scrapbook-el" style={{ transform: "translate(72px, -112px) scale(0.68)", zIndex: 50, pointerEvents: "none" }}>
            <div style={{ position: "absolute", left: "34%", top: "25.5%", width: "38%", height: "43.5%", overflow: "hidden", borderRadius: "3px", background: "#e8e4dc" }}>
              <img src="/ref/girl1.jpg" alt="Girl 1" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%" }} />
            </div>
            <img src="/frames/frame5.png" alt="Frame" draggable={false} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none" }} />
          </div>

          <img src="/elements/miss.png" alt="Miss" draggable={false} className="scrapbook-el" style={{ transform: "translate(112px, 16px) rotate(18deg) scale(0.48)", zIndex: 55 }} />
        </div>

        {/* Page 6: Left Page */}
        <div
          className="book-page relative overflow-hidden bg-amber-50 text-black cursor-pointer"
          style={{ width: 400, height: 500 }}
        >
          <img src="/pages/left.jpg" alt="Paper" draggable={false} className="scrapbook-el" style={{ transform: "none" }} />
          <img src="/elements/side4.png" alt="Side deco" draggable={false} className="scrapbook-el" style={{ transform: "translate(-88px, 92px) scale(0.68)", zIndex: 50 }} />
          <img src="/elements/disk.png" alt="Disk" draggable={false} className="scrapbook-el" style={{ transform: "translate(-200px, -60px) scale(0.68)", zIndex: 50 }} />
          <img src="/elements/billa5.png" alt="Cat" draggable={false} className="scrapbook-el" style={{ transform: "translate(76px, 132px) scale(0.68)", zIndex: 50 }} />
          <img src="/ref/girl11.jpg" alt="Girl 11" draggable={false} className="scrapbook-el" style={{ transform: "translate(16px, -48px) rotate(-11deg) scale(0.26)", zIndex: 50 }} />
          <img src="/ref/girl10.jpg" alt="Girl 10" draggable={false} className="scrapbook-el" style={{ transform: "translate(64px, -160px) rotate(11deg) scale(0.26)", zIndex: 50 }} />
          <img src="/elements/frame8.png" alt="Frame" draggable={false} className="scrapbook-el" style={{ transform: "translate(40px, -100px) scale(0.68)", zIndex: 50 }} />
          <img src="/elements/twoStar.png" alt="Stars" draggable={false} className="scrapbook-el" style={{ transform: "translate(-56px, 80px) scale(0.38)", zIndex: 50 }} />
          <img src="/elements/text3.png" alt="Text" draggable={false} className="scrapbook-el" style={{ transform: "translate(-88px, -192px) scale(0.48)", zIndex: 50 }} />
        </div>

        {/* Page 7: Right Page */}
        <div
          className="book-page relative overflow-hidden bg-amber-50 text-black cursor-pointer"
          style={{ width: 400, height: 500 }}
        >
          <img src="/pages/right.jpg" alt="Paper" draggable={false} className="scrapbook-el" style={{ transform: "none" }} />
          <img src="/elements/side5.png" alt="Side deco" draggable={false} className="scrapbook-el" style={{ transform: "translate(88px, 56px) scale(0.78)", zIndex: 50 }} />
          <img src="/elements/text4.png" alt="Text" draggable={false} className="scrapbook-el" style={{ transform: "translate(-24px, -160px) scale(0.58)", zIndex: 50 }} />
          <img src="/ref/girl9.jpg" alt="Girl 9" draggable="false" className="scrapbook-el" style={{ transform: "translate(-72px, -64px) rotate(-4deg) scale(0.28)", zIndex: 50 }} />
          <img src="/ref/girl8.jpg" alt="Girl 8" draggable="false" className="scrapbook-el" style={{ transform: "translate(-44px, 52px) rotate(10deg) scale(0.27)", zIndex: 50 }} />
          <img src="/elements/frame7.png" alt="Frame" draggable="false" className="scrapbook-el" style={{ transform: "translate(-56px, 4px) scale(0.68)", zIndex: 50 }} />
          <img src="/elements/billa4.png" alt="Cat" draggable="false" className="scrapbook-el" style={{ transform: "translate(-68px, 160px) scale(0.58)", zIndex: 50 }} />
        </div>

        {/* Page 8: NEW Page (girl12.jpg & girl13.jpg) */}
        <div
          className="book-page relative overflow-hidden bg-amber-50 text-black cursor-pointer"
          style={{ width: 400, height: 500 }}
        >
          <img src="/pages/left.jpg" alt="Paper" draggable={false} className="scrapbook-el" style={{ transform: "none" }} />
          <img src="/elements/side1.png" alt="Side deco" draggable={false} className="scrapbook-el" style={{ transform: "translate(-110px, -100px) scale(0.65)" }} />
          <img src="/ref/girl12.jpg" alt="Girl 12" draggable={false} className="scrapbook-el" style={{ transform: "translate(-48px, -60px) rotate(-6deg) scale(0.27)", zIndex: 30 }} />
          <img src="/elements/frame10.png" alt="Frame" draggable={false} className="scrapbook-el" style={{ transform: "translate(-48px, -50px) rotate(-6deg) scale(0.58)", zIndex: 35 }} />
          <img src="/ref/girl13.jpg" alt="Girl 13" draggable={false} className="scrapbook-el" style={{ transform: "translate(60px, 80px) rotate(8deg) scale(0.27)", zIndex: 30 }} />
          <img src="/frames/frame5.png" alt="Frame" draggable={false} className="scrapbook-el" style={{ transform: "translate(58px, 88px) rotate(8deg) scale(0.60)", zIndex: 35 }} />
          <img src="/elements/starB.png" alt="Star" draggable={false} className="scrapbook-el" style={{ transform: "translate(90px, -140px) scale(0.38)", zIndex: 40 }} />
          <img src="/elements/mouse.png" alt="Mouse" draggable={false} className="scrapbook-el" style={{ transform: "translate(-80px, 150px) scale(0.48)", zIndex: 40 }} />
        </div>

        {/* Page 9: NEW Page (girl14.jpg & girl15.jpg) */}
        <div
          className="book-page relative overflow-hidden bg-amber-50 text-black cursor-pointer"
          style={{ width: 400, height: 500 }}
        >
          <img src="/pages/right.jpg" alt="Paper" draggable={false} className="scrapbook-el" style={{ transform: "none" }} />
          <img src="/elements/side2.png" alt="Tape" draggable={false} className="scrapbook-el" style={{ transform: "translate(90px, -120px) scale(0.65)", zIndex: 20 }} />
          <img src="/ref/girl14.jpg" alt="Girl 14" draggable={false} className="scrapbook-el" style={{ transform: "translate(-50px, -50px) rotate(5deg) scale(0.27)", zIndex: 30 }} />
          <img src="/elements/frame9.png" alt="Frame" draggable={false} className="scrapbook-el" style={{ transform: "translate(-50px, -45px) rotate(5deg) scale(0.70)", zIndex: 35 }} />
          <img src="/ref/girl15.jpg" alt="Girl 15" draggable={false} className="scrapbook-el" style={{ transform: "translate(55px, 85px) rotate(-7deg) scale(0.26)", zIndex: 30 }} />
          <img src="/elements/frame11.png" alt="Frame" draggable={false} className="scrapbook-el" style={{ transform: "translate(50px, 95px) rotate(-7deg) scale(0.65)", zIndex: 35 }} />
          <img src="/elements/butter.png" alt="Butterfly" draggable={false} className="scrapbook-el" style={{ transform: "translate(-100px, 120px) rotate(20deg) scale(0.42)", zIndex: 40 }} />
          <img src="/elements/starem.png" alt="Star" draggable={false} className="scrapbook-el" style={{ transform: "translate(70px, -50px) scale(0.18)", zIndex: 40 }} />
        </div>

        {/* Page 10: NEW Page (girl17.jpg & girl18.jpg) */}
        <div
          className="book-page relative overflow-hidden bg-amber-50 text-black cursor-pointer"
          style={{ width: 400, height: 500 }}
        >
          <img src="/pages/left.jpg" alt="Paper" draggable={false} className="scrapbook-el" style={{ transform: "none" }} />
          <img src="/elements/side3.png" alt="Tape" draggable={false} className="scrapbook-el" style={{ transform: "translate(-80px, 140px) scale(0.70)", zIndex: 20 }} />
          <img src="/ref/girl17.jpg" alt="Girl 17" draggable={false} className="scrapbook-el" style={{ transform: "translate(-45px, 60px) rotate(6deg) scale(0.27)", zIndex: 30 }} />
          <img src="/elements/frame8.png" alt="Frame" draggable={false} className="scrapbook-el" style={{ transform: "translate(-45px, 65px) rotate(6deg) scale(0.60)", zIndex: 35 }} />
          <img src="/ref/girl18.jpg" alt="Girl 18" draggable={false} className="scrapbook-el" style={{ transform: "translate(50px, -65px) rotate(-8deg) scale(0.27)", zIndex: 30 }} />
          <img src="/elements/frame7.png" alt="Frame" draggable={false} className="scrapbook-el" style={{ transform: "translate(45px, -65px) rotate(-8deg) scale(0.60)", zIndex: 35 }} />
          <img src="/elements/billa6.png" alt="Cat" draggable={false} className="scrapbook-el" style={{ transform: "translate(-85px, -110px) scale(0.48)", zIndex: 40 }} />
          <img src="/elements/lovetape.png" alt="Love tape" draggable={false} className="scrapbook-el" style={{ transform: "translate(60px, 130px) scale(0.20)", zIndex: 40 }} />
        </div>

        {/* Page 11: Right Page (girl5.jpg, frame7, side1, twoStar, billa) */}
        <div
          className="book-page relative overflow-hidden bg-amber-50 text-black cursor-pointer"
          style={{ width: 400, height: 500 }}
        >
          <img src="/pages/right.jpg" alt="Paper" draggable={false} className="scrapbook-el" style={{ transform: "none" }} />
          <img src="/elements/side1.png" alt="Tape" draggable={false} className="scrapbook-el" style={{ transform: "translate(85px, -150px) scale(0.60)" }} />
          <img src="/ref/girl5.jpg" alt="Girl 5" draggable={false} className="scrapbook-el scrapbook-shadow" style={{ transform: "translate(-40px, -50px) rotate(-4deg) scale(0.30)", zIndex: 20 }} />
          <img src="/elements/frame7.png" alt="Frame" draggable={false} className="scrapbook-el" style={{ transform: "translate(-40px, -45px) rotate(-4deg) scale(0.68)", zIndex: 21 }} />
          <img src="/elements/billa.png" alt="Cat" draggable={false} className="scrapbook-el" style={{ transform: "translate(65px, 110px) scale(0.42)", zIndex: 25 }} />
          <img src="/elements/twoStar.png" alt="Star" draggable={false} className="scrapbook-el" style={{ transform: "translate(-80px, 130px) scale(0.35)", zIndex: 25 }} />
          <img src="/elements/lovetape.png" alt="Tape" draggable={false} className="scrapbook-el" style={{ transform: "translate(60px, -70px) scale(0.20)", zIndex: 25 }} />
          <img src="/elements/text3.png" alt="Text" draggable={false} className="scrapbook-el" style={{ transform: "translate(-20px, 140px) scale(0.45)", zIndex: 25 }} />
        </div>

        {/* Page 12: Hard Back Cover */}
        <div
          className="book-page bg-blue-700 text-white relative overflow-hidden cursor-pointer"
          data-density="hard"
          style={{ width: 400, height: 500 }}
        >
          <img
            src="/pages/back.png"
            alt="Back Cover"
            draggable={false}
            className="scrapbook-el"
            style={{ transform: "translate(12px, 0px) scale(1.3)" }}
          />
        </div>
      </div>
    </div>
  );
}
