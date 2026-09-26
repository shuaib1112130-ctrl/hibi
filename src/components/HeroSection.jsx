import React from "react";
import CurvedMarquee from "./CurvedMarquee";

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

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden flex min-h-screen w-full flex-col overflow-x-hidden bg-[#FAFAF7]">
      {/* Mobile View (< 768px): Photo ribbon above text, completely visible and balanced */}
      <div className="flex md:hidden flex-col justify-between h-full w-full py-6 px-4 overflow-hidden relative z-20 min-h-screen">
        <div className="w-full flex flex-col items-center pt-2">
          <div className="w-full overflow-hidden relative py-2">
            <div className="flex gap-3 animate-pulse select-none overflow-x-auto no-scrollbar py-2">
              {memories.map((item, idx) => (
                <div
                  key={idx}
                  className="h-20 w-20 shrink-0 bg-white p-1 shadow-md border border-neutral-200/90 rounded-sm overflow-hidden"
                >
                  <img
                    src={item.src}
                    alt={`Memory ${idx + 1}`}
                    draggable={false}
                    className="h-full w-full object-cover grayscale active:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center text-center px-4 my-auto">
          <h1 className="hero-display text-[12vw] sm:text-5xl font-light text-[#14140F] leading-[0.9] tracking-tight">
            <span className="block font-light">Happy</span>
            <span className="block font-bold text-black">Birthday</span>
            <span className="block font-bold text-amber-500">Sweety</span>
          </h1>
          <div className="mt-4 h-[2px] w-14 bg-[#9C7A3F]" />
          <p className="hero-body mt-4 max-w-xs text-sm sm:text-base leading-relaxed text-[#4A4A42]">
            May this year bring you closer to everything you're chasing.
          </p>
        </div>

        <div className="w-full flex items-center justify-center pb-2">
          <span className="hero-mono text-[10px] uppercase tracking-[0.25em] text-[#8A8A80]">
            MADE FOR YOU
          </span>
        </div>
      </div>

      {/* Desktop View (>= 768px): Exact Reference Curved Marquee */}
      <div className="hidden md:flex flex-col justify-between h-full w-full relative z-10 min-h-screen">
        <div className="absolute left-0 top-0 bottom-0 z-20 flex flex-col justify-center px-8 sm:px-14 lg:px-20 max-w-xl pointer-events-none">
          <div>
            <h1 className="hero-display text-[15vw] sm:text-7xl lg:text-[5.5rem] leading-[0.88] tracking-tight text-[#14140F]">
              <span className="font-light block">Happy</span>
              <span className="font-bold block text-black">Birthday</span>
              <span className="font-bold block text-amber-500">Sweety</span>
            </h1>
            <div className="mt-6 h-[2px] w-16 bg-[#9C7A3F]" />
            <p className="hero-body mt-6 max-w-sm text-base sm:text-lg leading-relaxed text-[#4A4A42]">
              May this year bring you closer to everything you're chasing.
            </p>
          </div>
        </div>

        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-auto">
          <div className="relative w-full h-[360px] sm:h-[460px] lg:h-[520px] cursor-grab active:cursor-grabbing select-none overflow-visible">
            <CurvedMarquee
              path="M1 209.434C58.5872 255.935 387.926 325.938 482.583 209.434C600.905 63.8051 525.516 -43.2211 427.332 19.9613C329.149 83.1436 352.902 242.723 515.041 267.302C644.752 286.966 943.56 181.94 995 156.5"
              viewBox="0 0 996 330"
              width="100%"
              height="100%"
              baseVelocity={4.5}
              slowdownOnHover={true}
              draggable={true}
              repeat={2}
              dragSensitivity={0.09}
              dragVelocityDecay={0.96}
              slowDownFactor={0.2}
              className="w-full h-full"
              responsive={true}
              grabCursor={true}
            >
              {memories.map((item, idx) => (
                <div
                  key={idx}
                  className="h-20 w-20 sm:h-24 sm:w-24 bg-white p-1 sm:p-1.5 shadow-md border border-neutral-200/80 rounded-sm overflow-hidden transition-transform duration-300 ease-out hover:scale-110 hover:shadow-xl"
                >
                  <img
                    src={item.src}
                    alt={`Memory ${idx + 1}`}
                    draggable={false}
                    className="h-full w-full object-cover grayscale transition-[filter] duration-300 ease-out hover:grayscale-0 pointer-events-none"
                  />
                </div>
              ))}
            </CurvedMarquee>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 z-20 flex items-center justify-end px-8 pb-8 sm:px-14 w-full pointer-events-none">
          <div className="h-px flex-1 max-w-[220px] bg-[#14140F]/15 mr-4" />
          <span className="hero-mono text-[10px] uppercase tracking-[0.25em] text-[#8A8A80]">
            MADE FOR YOU
          </span>
        </div>
      </div>
    </section>
  );
}
