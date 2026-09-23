/* =====================================================================
   ENHANCEMENT LAYER — stickers, motion, typewriter, real song
   Additive only: supports all screen sizes, smooth transparency, and fast typing.
   ===================================================================== */
(function () {
  const A = window.BDY_ASSETS || {};

  /* ---------------- helpers ---------------- */
  function imgSticker(cls, src, alt, floaty) {
    const wrap = document.createElement("div");
    wrap.className = "bdy-sticker " + (floaty === false ? "" : "bdy-floaty ") + cls;
    wrap.dataset["bdy"] = cls;
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.loading = "lazy";
    wrap.appendChild(img);
    return wrap;
  }

  function vidSticker(cls, src, label) {
    const wrap = document.createElement("div");
    wrap.className = "bdy-vsticker " + cls;
    wrap.dataset["bdy"] = cls;
    wrap.setAttribute("role", "img");
    wrap.setAttribute("aria-label", label);

    const v = document.createElement("video");
    v.src = src;
    v.crossOrigin = "anonymous";
    v.autoplay = true;
    v.loop = true;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
    v.setAttribute("autoplay", "");
    v.setAttribute("loop", "");
    v.preload = "auto";
    v.className = "bdy-vsticker-source";

    const canvas = document.createElement("canvas");
    canvas.className = "bdy-vsticker-canvas";

    wrap.appendChild(v);
    wrap.appendChild(canvas);

    /* Real-time high-quality chroma-key:
       These sticker animations have a solid black background.
       To eliminate dark borders, black boxes, and video compression artifacts:
       1) Calculate maximum RGB intensity.
       2) Below LOWER_THRESHOLD (28), pixel is 100% transparent.
       3) Between LOWER_THRESHOLD (28) and UPPER_THRESHOLD (72), apply smooth cubic feathering.
       4) Remove dark fringe by restoring un-premultiplied color values.
       5) Render at 60fps via requestAnimationFrame. */
    const LOWER = 28;
    const UPPER = 74;
    const RANGE = UPPER - LOWER;
    let ctx = null;
    let animId = null;
    let lastTime = 0;

    function renderLoop(time) {
      if (!document.body.contains(wrap)) {
        if (animId) cancelAnimationFrame(animId);
        return;
      }

      // Throttle to ~30-45fps to ensure optimal performance and battery efficiency across all mobile devices
      if (time - lastTime >= 24) {
        lastTime = time;
        if (v.videoWidth && v.videoHeight && !v.paused && !v.ended) {
          if (canvas.width !== v.videoWidth || canvas.height !== v.videoHeight) {
            canvas.width = v.videoWidth;
            canvas.height = v.videoHeight;
          }
          if (!ctx) ctx = canvas.getContext("2d", { willReadFrequently: true });
          if (ctx) {
            ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
            const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const d = frame.data;
            const len = d.length;

            for (let i = 0; i < len; i += 4) {
              const r = d[i];
              const g = d[i + 1];
              const b = d[i + 2];
              const maxC = r > g ? (r > b ? r : b) : g > b ? g : b;

              if (maxC <= LOWER) {
                d[i + 3] = 0;
              } else if (maxC < UPPER) {
                const norm = (maxC - LOWER) / RANGE;
                // smoothstep curve
                const smoothAlpha = norm * norm * (3 - 2 * norm);
                d[i + 3] = Math.round(smoothAlpha * 255);
                // de-fringe dark edges
                const boost = Math.max(0.3, smoothAlpha);
                d[i] = Math.min(255, Math.round(r / boost));
                d[i + 1] = Math.min(255, Math.round(g / boost));
                d[i + 2] = Math.min(255, Math.round(b / boost));
              }
            }
            ctx.putImageData(frame, 0, 0);
          }
        }
      }

      animId = requestAnimationFrame(renderLoop);
    }

    const startPlayback = () => {
      const p = v.play();
      if (p && p.catch) {
        p.catch(() => {
          // Retry on interaction
          const resume = () => {
            v.play().catch(() => {});
            document.removeEventListener("click", resume);
            document.removeEventListener("touchstart", resume);
          };
          document.addEventListener("click", resume, { once: true });
          document.addEventListener("touchstart", resume, { once: true });
        });
      }
      if (!animId) animId = requestAnimationFrame(renderLoop);
    };

    v.addEventListener("loadeddata", startPlayback);
    v.addEventListener("canplay", startPlayback);

    // Initial attempt
    startPlayback();

    return wrap;
  }

  const has = (cls) => !!document.querySelector('[data-bdy="' + cls + '"]');

  /* ---------------- typewriter (fast, smooth & readable) ---------------- */
  function typewrite(el, speed) {
    if (!el || el.dataset["typed"]) return;
    const text = el.dataset["fullText"] || el.textContent || "";
    el.dataset["typed"] = "1";
    el.textContent = "";
    el.classList.add("bdy-type", "bdy-typing");
    let i = 0;
    const effectiveSpeed = speed || 9; // ~9ms per char for smooth rapid delivery

    const step = () => {
      if (!document.body.contains(el)) return;
      // Increment 1-2 characters per tick for natural fluid typing
      i = Math.min(text.length, i + 1);
      el.textContent = text.slice(0, i);

      if (i < text.length) {
        const char = text[i - 1];
        // Slight natural pause on punctuation
        let delay = effectiveSpeed;
        if (char === "." || char === "!" || char === "?") delay = effectiveSpeed + 40;
        else if (char === ",") delay = effectiveSpeed + 20;

        window.setTimeout(step, delay);
      } else {
        el.classList.remove("bdy-typing");
        el.dispatchEvent(new CustomEvent("bdy:typed", { bubbles: true }));
      }
    };
    window.setTimeout(step, 60);
  }

  function typeSequence(nodes, speed) {
    let index = 0;
    const next = () => {
      const el = nodes[index];
      if (!el) return;
      index += 1;
      el.addEventListener("bdy:typed", next, { once: true });
      typewrite(el, speed);
    };
    next();
  }

  /* ---------------- hearts on click ---------------- */
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (!target.closest("button, .atm-card, .scratch-area, .game-card")) return;
    for (let i = 0; i < 4; i += 1) {
      const heart = document.createElement("span");
      heart.className = "bdy-heart-pop";
      heart.textContent = i % 2 ? "💗" : "❤️";
      heart.style.left = event.clientX - 10 + (Math.random() * 46 - 23) + "px";
      heart.style.top = event.clientY - 12 + "px";
      heart.style.animationDelay = i * 80 + "ms";
      document.body.appendChild(heart);
      window.setTimeout(() => heart.remove(), 1600);
    }
  });

  /* ---------------- per-screen decoration ---------------- */
  function decorate() {
    /* 1 · Welcome hero — Happy Birthday sticker */
    const heroCopy = document.querySelector(".welcome-page .hero-copy");
    if (heroCopy && A.happyBirthday && !has("bdy-hb")) {
      heroCopy.insertBefore(
        imgSticker("bdy-hb", A.happyBirthday, "Happy Birthday"),
        heroCopy.firstChild,
      );
    }

    /* 2 · Envelope page — cheek-kiss bears */
    const envelopeWrap = document.querySelector(".envelope-wrapper");
    if (envelopeWrap && A.cheekLove && !has("bdy-letter-vid")) {
      envelopeWrap.insertBefore(
        vidSticker("bdy-letter-vid", A.cheekLove, "Bear kissing cheeks"),
        envelopeWrap.firstChild,
      );
    }

    /* 2.5 · Dedicated Letter page — typewriter letter & retype support */
    const letterBody = document.getElementById("letter-body");
    if (letterBody && !letterBody.dataset["prepped"]) {
      letterBody.dataset["prepped"] = "1";
      const items = Array.prototype.slice.call(letterBody.querySelectorAll("p, strong"));
      items.forEach((el) => {
        el.dataset["fullText"] = el.textContent || "";
        el.textContent = "";
        el.classList.add("bdy-type");
      });
      typeSequence(items, 9);
    }

    /* 3 · Scratch card (Part 1) — hugging bears */
    const scratchCard = document.querySelector(".scratch-game");
    if (scratchCard && A.hugBears && !has("bdy-scratch-vid")) {
      scratchCard.appendChild(vidSticker("bdy-scratch-vid", A.hugBears, "Bears hugging"));
    }

    /* 3.5 · Love meter (Part 2) — I love you bear */
    const meterCard = document.querySelector(".meter-game");
    if (meterCard && A.iLoveYou && !has("bdy-meter-vid")) {
      meterCard.appendChild(
        vidSticker("bdy-meter-vid", A.iLoveYou, "Bear holding an I love you heart"),
      );
    }

    /* 4 · Cut the cake — birthday bear with cake */
    const cakeStage = document.getElementById("cutcake-stage");
    if (cakeStage && A.bearCake && !has("bdy-cake-img")) {
      cakeStage.parentElement.insertBefore(
        imgSticker("bdy-cake-img", A.bearCake, "Bear blowing out birthday candles"),
        cakeStage,
      );
    }

    /* 5 · Accept gift — bear popping out of a gift box */
    const giftStage = document.getElementById("gift-stage");
    if (giftStage && A.giftBox && !has("bdy-gift-vid")) {
      giftStage.insertBefore(
        vidSticker("bdy-gift-vid", A.giftBox, "Gift box opening"),
        giftStage.firstChild,
      );
    }

    /* 6 · Ending — Thank you sticker once the gift is revealed */
    const reveal = document.getElementById("gift-reveal");
    if (reveal && !reveal.classList.contains("hidden") && A.thankYou && !has("bdy-thanks")) {
      reveal.appendChild(imgSticker("bdy-thanks", A.thankYou, "Thank you"));
      const heading = reveal.querySelector("h3");
      if (heading) typewrite(heading, 25);
    }
  }

  // Support replaying typewriter on demand
  document.addEventListener("bdy:retype", () => {
    decorate();
  });

  /* ---------------- boot ---------------- */
  let frame = 0;
  const schedule = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      decorate();
    });
  };

  const boot = () => {
    const app = document.getElementById("app");
    if (!app) return window.setTimeout(boot, 60);
    new MutationObserver(schedule).observe(app, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
    });
    schedule();
  };

  boot();
})();
