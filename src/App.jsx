import React from "react";
import HeroSection from "./components/HeroSection";
import MadeForYou from "./components/MadeForYou";
import Scrapbook from "./components/Scrapbook";

export default function App() {
  return (
    <div className="h-full w-full overflow-x-hidden overflow-y-scroll snap-y snap-mandatory bg-zinc-50 dark:bg-black select-none scroll-smooth">
      {/* Section 1: Birthday Reveal (Countdown, burn effect, balloons) */}
      <section className="h-screen w-full snap-start snap-always shrink-0 overflow-visible relative z-10">
        <iframe
          src="/birthday.html"
          title="Birthday Reveal"
          style={{ width: "100vw", height: "100vh", border: "none", display: "block" }}
          allow="autoplay"
        />
      </section>

      {/* Section 2: Hero Section (Aug 02, Happy Birthday Sweety, Curved Marquee) */}
      <section className="h-screen w-full snap-start snap-always shrink-0 overflow-visible relative z-10">
        <HeroSection />
      </section>

      {/* Section 3: Made For You (Polaroid cards with 3D spring tilt) */}
      <section className="h-screen w-full snap-start snap-always shrink-0 overflow-visible relative z-10">
        <MadeForYou />
      </section>

      {/* Section 4: Scrapbook Flipbook (Hard covers, vintage stickers, photos) */}
      <section className="h-screen w-full snap-start snap-always shrink-0 overflow-visible relative z-10">
        <Scrapbook />
      </section>
    </div>
  );
}
