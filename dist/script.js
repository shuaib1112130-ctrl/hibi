/* ---------------- Configuration ---------------- */
const PASSKEY = "27092009";
const NAME = "HIBBBBIII";
const pages = ["Welcome", "Letter", "Play", "Memory ATM", "Cut the Cake", "Accept Gift"];

/* ---------------- State ---------------- */
const state = {
  unlocked: false,
  loading: false,
  page: 0,
  letterView: "envelope", // 'envelope' | 'letter'
  playPart: 1, // 1 | 2
  musicOn: false,
};

let songAudio = null;
let songFade = 0;

/* ---------------- Music (our Hindi love song) ---------------- */
function getSongAudio() {
  if (songAudio) return songAudio;
  const assets = window.BDY_ASSETS || {};
  if (!assets.song) return null;
  songAudio = new Audio(assets.song);
  songAudio.loop = true;
  songAudio.preload = "auto";
  songAudio.volume = 0;
  return songAudio;
}

function fadeSongTo(target, duration) {
  const audio = getSongAudio();
  if (!audio) return;
  const from = audio.volume;
  const startedAt = performance.now();
  const id = (songFade += 1);
  const tick = (now) => {
    if (id !== songFade) return;
    const k = Math.min(1, (now - startedAt) / (duration || 900));
    audio.volume = Math.max(0, Math.min(1, from + (target - from) * k));
    if (k < 1) requestAnimationFrame(tick);
    else if (target === 0) audio.pause();
  };
  requestAnimationFrame(tick);
}

function startMusic() {
  const audio = getSongAudio();
  if (!audio) return;
  const played = audio.play();
  if (played && played.catch) played.catch(() => { });
  fadeSongTo(0.62, 1600);
  state.musicOn = true;
  updateMusicButton();
}

function stopMusic() {
  fadeSongTo(0, 650);
  state.musicOn = false;
  updateMusicButton();
}

function updateMusicButton() {
  const btn = document.getElementById("music-button");
  if (!btn) return;
  const title = (window.BDY_ASSETS && window.BDY_ASSETS.songTitle) || "our song";
  btn.innerHTML = state.musicOn
    ? '<i data-lucide="volume-2" size="18"></i><span>Now playing ' + title + "</span>"
    : '<i data-lucide="volume-x" size="18"></i><span>Play ' + title + "</span>";
  btn.setAttribute("aria-label", state.musicOn ? "Pause music" : "Play music");
  renderIcons();
}

/* ---------------- Render root ---------------- */
const app = document.getElementById("app");

function render() {
  if (!state.unlocked) {
    app.innerHTML = state.loading ? loadingScreenHTML() : lockScreenHTML();
    renderIcons();
    if (!state.loading) bindLockScreen();
    return;
  }
  app.innerHTML = experienceShellHTML();
  renderIcons();
  bindExperienceShell();
  renderPage();
}

function renderIcons() {
  if (window.lucide) window.lucide.createIcons();
}

/* ---------------- Lock screen ---------------- */
function lockScreenHTML() {
  return `
  <main class="lock-screen">
    ${floatingDecorHTML()}
    <div class="lock-card" id="lock-card">
      <div class="lock-seal"><i data-lucide="lock-keyhole" size="30"></i></div>
      <p class="eyebrow">A little secret for</p>
      <h1>${NAME}</h1>
      <p class="lock-copy">Something beautiful is waiting behind this tiny lock.</p>
      <form id="lock-form">
        <label for="passkey">Enter the passkey</label>
        <div class="input-wrap">
          <i data-lucide="key-round" size="18"></i>
          <input id="passkey" placeholder="DDMMYYYY" inputmode="numeric" autocomplete="off" maxlength="8" pattern="[0-9]*" />
        </div>
        <p class="hint"><i data-lucide="sparkles" size="14"></i> Hint: Your birthday date, month and year (numbers only)</p>
        <p class="error-message hidden" id="lock-error">Nope, my love. That key does not fit. Try once more.</p>
        <button class="unlock-button" type="submit">Open my surprise <i data-lucide="heart" size="18" fill="currentColor"></i></button>
      </form>
      <span class="tiny-note">Made with a ridiculous amount of love</span>
    </div>
  </main>`;
}

function bindLockScreen() {
  const form = document.getElementById("lock-form");
  const input = document.getElementById("passkey");
  if (!form || !input) return;
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "").slice(0, 8);
  });
  const card = document.getElementById("lock-card");
  const errorMsg = document.getElementById("lock-error");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value.trim() === PASSKEY) {
      if (errorMsg) errorMsg.classList.add("hidden");
      handleUnlock();
      return;
    }
    if (errorMsg) errorMsg.classList.remove("hidden");
    input.value = "";
    if (card) {
      card.classList.add("shake");
      if (navigator.vibrate) navigator.vibrate([100, 55, 100]);
      window.setTimeout(() => card.classList.remove("shake"), 700);
    }
  });
}

function handleUnlock() {
  state.loading = true;
  render();
  window.setTimeout(() => {
    state.unlocked = true;
    state.loading = false;
    render();
    startMusic();
  }, 2600);
}

/* ---------------- Loading screen ---------------- */
function loadingScreenHTML() {
  return `
  <main class="loading-screen">
    <div class="loading-sticker">
      <i data-lucide="heart" size="44" fill="currentColor"></i>
      <span class="orbit orbit-one"><i data-lucide="stars" size="18"></i></span>
      <span class="orbit orbit-two"><i data-lucide="sparkles" size="15"></i></span>
    </div>
    <h2>Unlocking your little universe</h2>
    <p>Gathering hugs, wishes and twenty tiny stars</p>
    <div class="loading-track"><span></span></div>
  </main>`;
}

/* ---------------- Floating decor ---------------- */
function floatingDecorHTML() {
  return `
  <div class="floating-decor" aria-hidden="true">
    <i data-lucide="heart" class="float-heart heart-a" fill="currentColor"></i>
    <i data-lucide="sparkles" class="float-spark spark-a"></i>
    <i data-lucide="stars" class="float-spark spark-b"></i>
    <i data-lucide="heart" class="float-heart heart-b" fill="currentColor"></i>
    <span class="grain"></span>
  </div>`;
}

/* ---------------- Experience shell ---------------- */
function experienceShellHTML() {
  return `
  <main class="experience-shell">
    ${floatingDecorHTML()}
    <header class="journey-header">
      <button class="music-button" id="music-button" aria-label="Pause music"></button>
    </header>
    <section class="page-stage" id="page-stage"></section>
    <nav class="page-nav">
      <button class="nav-button secondary" id="nav-back">Back</button>
      <div class="page-label">
        <strong id="page-title">Welcome</strong>
      </div>
      <button class="nav-button primary" id="nav-forward"></button>
    </nav>
  </main>`;
}

function bindExperienceShell() {
  updateMusicButton();
  const musicBtn = document.getElementById("music-button");
  if (musicBtn) {
    musicBtn.addEventListener("click", () => {
      if (state.musicOn) stopMusic();
      else startMusic();
    });
  }

  const backBtn = document.getElementById("nav-back");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      handleNavBack();
    });
  }
}

function handleNavBack() {
  if (state.page === 1 && state.letterView === "letter") {
    state.letterView = "envelope";
    renderPage();
    return;
  }
  if (state.page === 2 && state.playPart === 2) {
    state.playPart = 1;
    renderPage();
    return;
  }
  if (state.page === 2 && state.playPart === 1) {
    state.page = 1;
    state.letterView = "letter";
    renderPage();
    return;
  }
  state.page = Math.max(0, state.page - 1);
  state.letterView = "envelope";
  state.playPart = 1;
  renderPage();
}

function handleNavForward() {
  if (state.page === 1 && state.letterView === "envelope") {
    state.letterView = "letter";
    renderPage();
    return;
  }
  if (state.page === 1 && state.letterView === "letter") {
    state.page = 2;
    state.playPart = 1;
    renderPage();
    return;
  }
  if (state.page === 2 && state.playPart === 1) {
    state.playPart = 2;
    renderPage();
    return;
  }
  if (state.page === 2 && state.playPart === 2) {
    state.page = 3;
    renderPage();
    return;
  }
  if (state.page < pages.length - 1) {
    state.page = state.page + 1;
    state.letterView = "envelope";
    state.playPart = 1;
    renderPage();
  } else {
    state.page = 0;
    state.letterView = "envelope";
    state.playPart = 1;
    renderPage();
  }
}

function renderPage() {
  const stage = document.getElementById("page-stage");
  if (!stage) return;

  // Decide HTML for current step
  let contentHTML = "";
  if (state.page === 0) {
    contentHTML = WelcomePage();
  } else if (state.page === 1) {
    contentHTML = state.letterView === "letter" ? LetterPage() : EnvelopePage();
  } else if (state.page === 2) {
    contentHTML = state.playPart === 2 ? MeterPage() : ScratchPage();
  } else if (state.page === 3) {
    contentHTML = window.BdyChapters.AtmPage();
  } else if (state.page === 4) {
    contentHTML = window.BdyChapters.CutCakePage();
  } else if (state.page === 5) {
    contentHTML = window.BdyChapters.AcceptGiftPage();
  }

  stage.innerHTML = contentHTML;
  stage.style.animation = "none";
  void stage.offsetWidth;
  stage.style.animation = "";

  // Update Page Title
  const titleEl = document.getElementById("page-title");
  if (titleEl) {
    if (state.page === 1) {
      titleEl.textContent = state.letterView === "letter" ? "A Love Letter" : "Envelope";
    } else if (state.page === 2) {
      titleEl.textContent = state.playPart === 2 ? "Love Meter" : "Secret Prize";
    } else {
      titleEl.textContent = pages[state.page];
    }
  }

  // Back button state
  const backBtn = document.getElementById("nav-back");
  if (backBtn) {
    backBtn.disabled = state.page === 0;
  }

  // Forward button label and action
  const forwardBtn = document.getElementById("nav-forward");
  if (forwardBtn) {
    if (state.page === 1 && state.letterView === "envelope") {
      forwardBtn.innerHTML = 'Open Letter <i data-lucide="mail-open" size="16"></i>';
    } else if (state.page === 2 && state.playPart === 1) {
      forwardBtn.innerHTML =
        'Next: Love Meter <i data-lucide="heart" size="16" fill="currentColor"></i>';
    } else if (state.page < pages.length - 1) {
      forwardBtn.innerHTML = 'Continue <i data-lucide="heart" size="16" fill="currentColor"></i>';
    } else {
      forwardBtn.innerHTML = 'Again <i data-lucide="rotate-ccw" size="16"></i>';
    }
    forwardBtn.onclick = handleNavForward;
  }

  renderIcons();
  bindPageInteractions();
}

/* ---------------- Pages ---------------- */
function WelcomePage() {
  return `
  <div class="welcome-page page-content">
    <div class="date-stamp">27 SEPTEMBER 2026</div>
    <div class="hero-copy">
      <p class="eyebrow">The world got brighter twenty years ago</p>
      <h1>Happiest<br/><em>17th</em> Birthday</h1>
      <div class="name-ribbon">${NAME}</div>
      <p class="hero-note">To someone special. My love, my favorite person, and the reason ordinary days feel magical.</p>
    </div>
    <div class="hero-art" aria-hidden="true">
      <div class="big-heart"><i data-lucide="heart" fill="currentColor"></i></div>
      <span class="tape tape-one"></span>
      <span class="scribble">Seventy looks perfect on you</span>
      <div class="mini-card mini-card-one"><i data-lucide="cake-slice"></i></div>
      <div class="mini-card mini-card-two"><i data-lucide="gift"></i></div>
    </div>
    <p class="scroll-note">A birthday surprise made only for you</p>
  </div>`;
}

function EnvelopePage() {
  return `
  <div class="envelope-page page-content">
    <div class="section-intro">
      <div>
        <p class="eyebrow">A note from my heart</p>
        <h2>There are things I need you to know</h2>
      </div>
    </div>
    <div class="envelope-wrapper">
      <button class="envelope" id="envelope" aria-label="Open birthday letter">
        <div class="envelope-back"></div>
        <div class="envelope-front"><i data-lucide="heart" fill="currentColor"></i></div>
        <span class="open-prompt" id="open-prompt">Tap to open <i data-lucide="sparkles" size="14"></i></span>
      </button>
    </div>
  </div>`;
}

function LetterPage() {
  return `
  <div class="letter-page page-content">
    <div class="section-intro compact">
      <div>
        <p class="eyebrow">A note from my heart</p>
        <h2>A letter written for you</h2>
      </div>
    </div>
    <div class="letter-card-wrapper">
      <article class="letter-card" id="letter-card">
        <div class="letter-card-header">
          <div class="letter-stamp"><i data-lucide="mail-heart" size="22"></i><span>27.09</span></div>
          <div class="letter-tag"><i data-lucide="heart" size="14" fill="currentColor"></i> Sealed with Love</div>
        </div>
        <div class="letter-body" id="letter-body">
          <p class="letter-salutation">My dearest ${NAME},</p>
          <p>Happy 17th birthday to the person who makes my heart feel safe and my life feel full. Your smile can rescue my hardest day, and your presence turns simple moments into memories I never want to lose.</p>
          <p>I hope this new chapter brings you gentle mornings, loud laughter, brave dreams, and every kind of happiness you deserve. I am so proud of the person you are and so excited for everything you are becoming.</p>
          <p>Thank you for being my favorite hello, my calm, my chaos, and my most beautiful surprise.</p>
          <strong class="letter-sign">Always yours, with all my love.</strong>
        </div>
        <div class="letter-card-actions">
          <button class="letter-action-btn" id="letter-replay-btn"><i data-lucide="rotate-ccw" size="14"></i> Replay Note</button>
          <button class="letter-action-btn primary" id="letter-continue-btn">Next Chapter <i data-lucide="arrow-right" size="14"></i></button>
        </div>
      </article>
    </div>
  </div>`;
}

function ScratchPage() {
  return `
  <div class="play-page page-content">
    <div class="section-intro compact">
      <div>
        <p class="eyebrow">A little birthday play • Part 1</p>
        <h2>Find the secret hiding under the sparkles</h2>
      </div>
    </div>
    <div class="game-solo-layout">
      <article class="game-card scratch-game">
        <span class="game-tag"><i data-lucide="gift" size="15"></i> Secret prize</span>
        <h3>Your birthday coupon</h3>
        <div class="scratch-area" id="scratch-area">
          <div class="scratch-prize">
            <i data-lucide="heart" fill="currentColor"></i>
            <strong>UNLIMITED HUGS</strong>
            <span>Valid forever, especially on difficult days</span>
          </div>
          <canvas id="scratch-canvas"></canvas>
        </div>
        <p id="scratch-copy">Use your finger or cursor to scratch.</p>
        <button class="game-proceed-btn" id="scratch-proceed-btn">Proceed to Love Meter <i data-lucide="heart" size="15" fill="currentColor"></i></button>
      </article>
    </div>
  </div>`;
}

function MeterPage() {
  return `
  <div class="play-page page-content">
    <div class="section-intro compact">
      <div>
        <p class="eyebrow">A little birthday play • Part 2</p>
        <h2>How much love is in the air?</h2>
      </div>
    </div>
    <div class="game-solo-layout">
      <article class="game-card meter-game">
        <span class="game-tag"><i data-lucide="sparkles" size="15"></i> Tiny experiment</span>
        <h3>How loved is ${NAME}?</h3>
        <div class="meter-visual">
          <div class="meter-fill" id="meter-fill" style="transform: scaleY(0.2)"></div>
          <i data-lucide="heart" fill="currentColor"></i>
        </div>
        <strong class="meter-number" id="meter-number">20%</strong>
        <p id="meter-copy">Press the button for a very scientific answer.</p>
        <button id="meter-button"><i data-lucide="play" size="15" fill="currentColor"></i> Measure the love</button>
      </article>
    </div>
  </div>`;
}

/* ---------------- Per-page interactivity ---------------- */
function bindPageInteractions() {
  if (state.page === 1) {
    if (state.letterView === "letter") bindLetterPage();
    else bindEnvelopePage();
  }
  if (state.page === 2) {
    if (state.playPart === 2) bindMeterPage();
    else bindScratchPage();
  }
}

function bindEnvelopePage() {
  const envelope = document.getElementById("envelope");
  if (!envelope) return;
  envelope.addEventListener("click", () => {
    envelope.classList.add("open");
    const prompt = document.getElementById("open-prompt");
    if (prompt)
      prompt.innerHTML = 'Opening letter… <i data-lucide="heart" size="14" fill="currentColor"></i>';
    renderIcons();
    if (navigator.vibrate) navigator.vibrate([40, 50, 40]);
    window.setTimeout(() => {
      state.letterView = "letter";
      renderPage();
    }, 700);
  });
}

function bindLetterPage() {
  const replayBtn = document.getElementById("letter-replay-btn");
  if (replayBtn) {
    replayBtn.addEventListener("click", () => {
      const letterBody = document.getElementById("letter-body");
      if (letterBody) {
        delete letterBody.dataset["prepped"];
        delete letterBody.dataset["typedAll"];
        letterBody.querySelectorAll("p, strong").forEach((el) => {
          delete el.dataset["typed"];
          if (el.dataset["fullText"]) el.textContent = el.dataset["fullText"];
        });
      }
      const ev = new CustomEvent("bdy:retype");
      document.dispatchEvent(ev);
    });
  }

  const continueBtn = document.getElementById("letter-continue-btn");
  if (continueBtn) {
    continueBtn.addEventListener("click", () => {
      state.page = 2;
      state.playPart = 1;
      renderPage();
    });
  }
}

function bindScratchPage() {
  const area = document.getElementById("scratch-area");
  const canvas = document.getElementById("scratch-canvas");
  const copy = document.getElementById("scratch-copy");
  const proceedBtn = document.getElementById("scratch-proceed-btn");

  if (proceedBtn) {
    proceedBtn.addEventListener("click", () => {
      state.playPart = 2;
      renderPage();
    });
  }

  if (canvas && area) {
    const ctx = canvas.getContext("2d");
    let revealed = false;
    let scratching = false;
    let ro = null;

    const drawOverlay = () => {
      const ratio = window.devicePixelRatio || 1;
      const width = area.clientWidth;
      const height = area.clientHeight;
      if (width < 2 || height < 2) return;

      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = Math.round(width) + "px";
      canvas.style.height = Math.round(height) + "px";
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.globalCompositeOperation = "source-over";

      ctx.fillStyle = "#d6b48c";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#fff8ed";
      ctx.font = "600 15px Georgia";
      ctx.textAlign = "center";
      ctx.fillText("SCRATCH ME", width / 2, height / 2);
      for (let index = 0; index < 34; index += 1) {
        ctx.fillStyle = index % 2 ? "#f7d1cf" : "#b85f68";
        ctx.beginPath();
        ctx.arc(Math.random() * width, Math.random() * height, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    requestAnimationFrame(() => requestAnimationFrame(drawOverlay));

    if (window.ResizeObserver) {
      ro = new ResizeObserver(() => {
        if (!revealed) drawOverlay();
      });
      ro.observe(area);
    } else {
      window.addEventListener("resize", () => {
        if (!revealed) drawOverlay();
      });
    }

    const scratch = (event) => {
      if (!scratching) return;
      const b = canvas.getBoundingClientRect();
      const x = event.clientX - b.left;
      const y = event.clientY - b.top;
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 26, 0, Math.PI * 2);
      ctx.fill();
      if (!revealed) {
        revealed = true;
        if (ro) ro.disconnect();
        if (copy) copy.textContent = "Keep going, your prize is appearing! ❤️";
        if (proceedBtn) proceedBtn.classList.add("visible");
      }
    };

    canvas.addEventListener("pointerdown", (event) => {
      scratching = true;
      if (canvas.setPointerCapture) canvas.setPointerCapture(event.pointerId);
    });
    canvas.addEventListener("pointermove", scratch);
    canvas.addEventListener("pointerup", () => {
      scratching = false;
    });
    canvas.addEventListener("pointercancel", () => {
      scratching = false;
    });
  }
}

function bindMeterPage() {
  const meterButton = document.getElementById("meter-button");
  const meterFill = document.getElementById("meter-fill");
  const meterNumber = document.getElementById("meter-number");
  const meterCopy = document.getElementById("meter-copy");
  if (meterButton) {
    meterButton.addEventListener("click", () => {
      let value = 20;
      meterButton.disabled = true;
      const interval = window.setInterval(() => {
        value += 4;
        if (meterFill) meterFill.style.transform = `scaleY(${value / 100})`;
        if (meterNumber) meterNumber.textContent = `${value}%`;
        if (value >= 100) {
          window.clearInterval(interval);
          if (meterCopy)
            meterCopy.textContent =
              "Result confirmed. Completely, endlessly, ridiculously loved. ❤️";
          if (navigator.vibrate) navigator.vibrate([60, 40, 60]);
          const forwardBtn = document.getElementById("nav-forward");
          if (forwardBtn) {
            forwardBtn.classList.add("bdy-pulse");
          }
        }
      }, 30);
    });
  }
}

/* ---------------- Init ---------------- */
render();
