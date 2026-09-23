/* =====================================================================
   ADD-ON CHAPTERS — Memory ATM, Cut the Cake, Accept Gift
   Nothing in script.js / style.css is rewritten by this file. It only
   exposes three extra page builders that the original experience shell
   renders like any other chapter.
   ===================================================================== */
(function () {
  const NAME = "HIBBBBIII";
  const ATM_BG = window.BDY_ATM_BG || "";

  /* small helper: run a binder right after the HTML lands in the stage */
  const afterRender = (fn) => window.setTimeout(fn, 0);

  /* =================================================================
     CHAPTER · MEMORY ATM
     ================================================================= */
  const PIN = "2709";
  const MEMORIES = [
    { img: "/assets/images/atm/photo-1.jpg", caption: "Favorite Photo ❤️" },
    { img: "/assets/images/atm/photo-2.jpg", caption: "Meri Buddie ✨" },
    { img: "/assets/images/atm/photo-3.jpg", caption: "Prettiest Girl 🌙" },
    { img: "/assets/images/atm/photo-4.jpg", caption: "looking Mine" },
    { img: "/assets/images/atm/photo-5.jpg", caption: "That Look ✨" },
    { img: "/assets/images/atm/photo-6.jpg", caption: "Effortless 🖤" },
    { img: "/assets/images/atm/photo-7.jpg", caption: "Pure Magic ✨" },
    { img: "/assets/images/atm/photo-8.jpg", caption: "Cutest Smile 😊" },
    { img: "/assets/images/atm/photo-9.jpg", caption: "Always Glowing 💖" },
    { img: "/assets/images/atm/photo-10.jpg", caption: "Meri Bachiii ☀️" },
    { img: "/assets/images/atm/photo-11.jpg", caption: "Cutiee 🌸" },
    { img: "/assets/images/atm/photo-12.jpg", caption: "Sweetest Memories 💫" },
    { img: "/assets/images/atm/photo-13.jpg", caption: "Simply Beautiful 🌷" },
    { img: "/assets/images/atm/photo-14.jpg", caption: "Endless Smiles 🥰" },
    { img: "/assets/images/atm/photo-15.jpg", caption: "Cherished Times 🎀" },
    { img: "/assets/images/atm/photo-16.jpg", caption: "Forever Special 🤍" },
  ];
  const BALANCE = [
    { label: "Smile", value: "100%", pct: 100 },
    { label: "Funny Moments", value: "97%", pct: 97 },
    { label: "Late Replies", value: "89%", pct: 89 },
    { label: "Kindness", value: "∞", pct: 100 },
  ];

  function AtmPage() {
    afterRender(bindAtm);
    return `
    <div class="chapter-page page-content">
      <div class="section-intro compact">
        <div>
          <p class="eyebrow">A special memory chapter</p>
          <h2>Browse a few favorite photos from the Photo Bank</h2>
        </div>
      </div>
      <div class="atm-stage" id="atm-stage">
        <div class="atm-toast hidden" id="atm-toast"></div>
        <div class="atm-machine">
          <div class="atm-topper">PHOTO BANK</div>
          <div class="atm-body">
            <div class="atm-face">
              <div class="side-rail left" id="rail-left">
                ${[0, 1, 2, 3].map((i) => `<button class="side-btn" data-side="left" data-index="${i}" disabled aria-label="Left option ${i + 1}"></button>`).join("")}
              </div>
              <div class="atm-screen-frame">
                <div class="atm-screen screen-fade" id="atm-screen"></div>
              </div>
              <div class="side-rail right" id="rail-right">
                ${[0, 1, 2, 3].map((i) => `<button class="side-btn" data-side="right" data-index="${i}" disabled aria-label="Right option ${i + 1}"></button>`).join("")}
              </div>
            </div>

            <div class="atm-shelf">
              <div class="slot-group">
                <span class="slot-label">Card</span>
                <div class="card-slot" id="card-slot"><span class="slot-led" id="slot-led"></span></div>
              </div>
              <div class="slot-group">
                <span class="slot-label">Receipt</span>
                <div class="receipt-slot"></div>
              </div>
            </div>

            <div class="atm-keypad" id="atm-keypad">
              ${["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "E"]
        .map(
          (key) =>
            `<button class="key${key === "E" ? " enter" : ""}${key === "C" ? " cancel" : ""}" data-key="${key}">${key === "E" ? "ENTER" : key === "C" ? "CLR" : key}</button>`,
        )
        .join("")}
            </div>

            <div class="cash-slot"></div>
          </div>
          <div class="atm-base"></div>
        </div>

        <div class="atm-card" id="atm-card" role="button" tabindex="0">
          <span class="card-bank">PHOTO BANK</span>
          <span class="chip"></span>
          <span class="card-name">Madam HIBA• ∞ Love</span>
        </div>
        <span class="card-hint" id="card-hint">tap the card to slide it into the slot</span>
        <div class="receipt-paper hidden" id="receipt-paper"></div>
        <div class="atm-door hidden" id="atm-door"></div>
        <div class="atm-photo-modal hidden" id="atm-photo-modal"></div>
      </div>
    </div>`;
  }

  function bindAtm() {
    const stage = document.getElementById("atm-stage");
    if (!stage) return;

    const screen = document.getElementById("atm-screen");
    const toast = document.getElementById("atm-toast");
    const cardEl = document.getElementById("atm-card");
    const cardHint = document.getElementById("card-hint");
    const slot = document.getElementById("card-slot");
    const led = document.getElementById("slot-led");
    const keypad = document.getElementById("atm-keypad");
    const receipt = document.getElementById("receipt-paper");
    const door = document.getElementById("atm-door");
    const photoModal = document.getElementById("atm-photo-modal");

    const timers = [];
    const later = (fn, ms) => {
      timers.push(window.setTimeout(fn, ms));
    };
    const every = (fn, ms) => {
      const id = window.setInterval(fn, ms);
      timers.push(id);
      return id;
    };
    const stopAll = () =>
      timers.forEach((t) => {
        window.clearTimeout(t);
        window.clearInterval(t);
      });

    /* clean up when the user leaves this chapter */
    const watchdog = every(() => {
      if (!document.body.contains(stage)) {
        stopAll();
        window.removeEventListener("keydown", handleKeydown);
      }
    }, 800);

    const state = {
      step: "insert",
      progress: 0,
      pin: "",
      memoryIndex: 0,
      viewed: 1,
      wish: "",
      card: "idle",
      receiptOut: 0,
      receiptTaken: false,
      nagCard: false,
      balanceShown: false,
    };

    const flash = (message) => {
      toast.textContent = message;
      toast.classList.remove("hidden");
      later(() => toast.classList.add("hidden"), 1600);
    };

    /* ---------------- screen markup per step ---------------- */
    function screenHTML() {
      switch (state.step) {
        case "insert":
          return `<h4>WELCOME TO PHOTO BANK</h4><p>Please insert your card</p><small>HIBBBBIII • 17 • 2026</small>`;
        case "reading":
          return `<h4>READING CARD…</h4><div class="atm-progress"><span style="width:${state.progress}%"></span></div><p>Please Wait…</p>`;
        case "pin":
        case "pinWrong":
          return `<h4>ENTER PIN</h4>
            <div class="pin-dots">${[0, 1, 2, 3].map((i) => `<i class="${i < state.pin.length ? "filled" : ""}"></i>`).join("")}</div>
            ${state.step === "pinWrong" ? `<p style="color:#ff9a92">❌ Incorrect PIN</p>` : `<p>Use the keypad, then ENTER</p>`}
            <small>hint: day + month of your birthday</small>`;
        case "pinOk":
          return `<h4>✅ WELCOME BACK</h4><p>Authenticating photos…</p>`;
        case "menu":
          return `<h4>PHOTO BANK</h4>
            <div class="atm-menu">
              ${["View Photos", "Check Love Balance", "Deposit Wishes", "Exit"]
              .map(
                (label, i) =>
                  `<button class="atm-menu-row" data-menu="${i + 1}"><b>${i + 1} ${label}</b><em>◀</em></button>`,
              )
              .join("")}
            </div>
            <small>tap an option or press its number</small>`;
        case "vault":
          return `<h4>ACCESSING PHOTO VAULT…</h4><div class="atm-progress"><span style="width:${state.progress}%"></span></div>`;
        case "memories": {
          const memory = MEMORIES[state.memoryIndex] || MEMORIES[0];
          const last = state.memoryIndex === MEMORIES.length - 1;
          return `<h4>PHOTO VAULT ACTIVE</h4>
            <small>Viewing Photo ${state.memoryIndex + 1}/${MEMORIES.length}</small>
            <div class="memory-frame"><img src="${memory.img}" alt="${memory.caption}" loading="lazy" /></div>
            <div class="atm-nav-row">
              <button class="atm-nav" data-act="prev">◀ Prev</button>
              <button class="atm-nav" data-act="menu">Menu</button>
              <button class="atm-nav" data-act="next">${last ? "Menu ▶" : "Next ▶"}</button>
            </div>`;
        }
        case "checking":
          return `<h4>CHECKING ACCOUNT…</h4><p>▚▚▚▚▚▚▚▚</p>`;
        case "balance":
          return `<h4>LOVE BALANCE</h4>
            <div class="balance-rows">
              ${BALANCE.map(
            (row) => `<div class="balance-row"><span>${row.label}</span><b>${row.value}</b>
                <div class="balance-bar"><span style="width:${state.balanceShown ? row.pct + "%" : "0%"}"></span></div></div>`,
          ).join("")}
            </div>
            <div class="atm-nav-row"><button class="atm-nav" data-act="menu">◀ Back to Menu</button></div>`;
        case "wish":
          return `<h4>INSERT YOUR WISH</h4>
            <input class="atm-input" id="atm-wish" value="${state.wish.replace(/"/g, "&quot;")}" placeholder="___________" />
            <button class="key enter" data-act="confirm-wish" style="width:50%;margin:0 auto">Confirm</button>`;
        case "wishDone":
          return `<h4>WISH DEPOSITED SUCCESSFULLY</h4><p>Thank You ❤️</p>
            <div class="atm-nav-row"><button class="atm-nav" data-act="menu">◀ Back to Menu</button></div>`;
        case "exitAsk":
          return `<h4>END SESSION?</h4>
            <div class="atm-nav-row">
              <button class="atm-nav" data-act="end">◀ YES</button>
              <button class="atm-nav" data-act="menu">NO ▶</button>
            </div>`;
        case "receipt":
          return `<h4>PRINTING RECEIPT</h4><p>Please collect your receipt</p>`;
        case "cardReturn":
          return `<h4>PLEASE TAKE YOUR CARD</h4>${state.nagCard ? `<p style="color:#ffd58a">⚠ Please Remove Your Card</p>` : `<p>Card returned to slot</p>`}`;
        case "thanks":
        case "door":
          return `<h4>THANK YOU FOR VISITING</h4><p>Photo Bank</p><small>See You Again ❤️</small>`;
        default:
          return "";
      }
    }

    function railLabels(side) {
      const empty = [null, null, null, null];
      if (state.step === "menu") {
        return side === "left" ? ["View Photos", "Love Balance", "Deposit Wishes", "Exit"] : empty;
      }
      if (state.step === "memories") {
        return side === "left"
          ? [null, null, null, "Previous"]
          : [null, null, null, state.memoryIndex === MEMORIES.length - 1 ? "Menu" : "Next"];
      }
      if (state.step === "balance" || state.step === "wishDone") {
        return side === "left" ? [null, null, null, "Back to Menu"] : empty;
      }
      if (state.step === "exitAsk") {
        return side === "left" ? [null, null, null, "YES, end"] : [null, null, null, "NO, stay"];
      }
      return empty;
    }

    function receiptHTML() {
      const photosViewedCount = Math.max(state.viewed, state.memoryIndex + 1);
      return `<b>PHOTO BANK</b><hr />
        <div class="receipt-line"><span>DATE</span><span>27 SEPT</span></div>
        <div class="receipt-line"><span>CARD</span><span>**** LOVE</span></div><hr />
        <div class="receipt-line"><span>Photos Viewed</span><span>${photosViewedCount}/${MEMORIES.length}</span></div>
        ${MEMORIES.slice(0, photosViewedCount)
          .map(
            (m, i) =>
              `<div class="receipt-line"><span>${i + 1}.</span><span>${m.caption}</span></div>`,
          )
          .join("")}
        <hr />
        ${BALANCE.map((row) => `<div class="receipt-line"><span>${row.label}</span><span>${row.value}</span></div>`).join("")}
        <hr />
        <div class="receipt-line"><span>Wish Deposited</span><span>${state.wish ? "YES" : "NO"}</span></div>
        ${state.wish ? `<p style="margin:4px 0">"${state.wish}"</p>` : ""}
        <hr />
        <div class="receipt-line"><span>LOVE BALANCE</span><span>∞</span></div>
        <p class="receipt-heart">Happy Birthday ❤️</p>
        <button class="atm-nav receipt-tear-btn" data-act="take-receipt">Tear & Collect Receipt 🧾</button>`;
    }

    /* ---------------- paint ---------------- */
    function paint(animate) {
      screen.innerHTML = screenHTML();
      if (animate !== false) {
        screen.classList.remove("screen-fade");
        void screen.offsetWidth;
        screen.classList.add("screen-fade");
      }

      ["left", "right"].forEach((side) => {
        const labels = railLabels(side);
        document.querySelectorAll(`#rail-${side} .side-btn`).forEach((btn, index) => {
          const label = labels[index];
          btn.disabled = !label;
          btn.classList.toggle("armed", Boolean(label));
          btn.setAttribute("aria-label", label || `${side} option ${index + 1}`);
        });
      });

      keypad.classList.toggle("keypad-lit", state.step === "pin" || state.step === "pinWrong");
      slot.classList.toggle("hot", state.step === "insert" || state.step === "cardReturn");

      led.className = "slot-led";
      if (state.card === "gone" || state.card === "inserting") led.classList.add("green");
      if (state.step === "cardReturn" && state.card !== "taken")
        led.classList.add("green", "blink");

      /* physical card */
      cardEl.className = "atm-card";
      if (state.card === "gone") cardEl.classList.add("hidden");
      if (state.card === "inserting") cardEl.classList.add("inserting");
      if (state.card === "returning") cardEl.classList.add("returning");
      if (state.card === "taken") cardEl.classList.add("taken");
      if (state.step === "cardReturn" || state.card === "returning" || state.card === "taken") {
        const slotRect = slot.getBoundingClientRect();
        const stageRect = stage.getBoundingClientRect();
        if (slotRect.width > 0 && stageRect.width > 0) {
          const leftPct =
            ((slotRect.left + slotRect.width / 2 - stageRect.left) / stageRect.width) * 100;
          const topPct = ((slotRect.top - stageRect.top) / stageRect.height) * 100;
          cardEl.style.left = `${leftPct}%`;
          cardEl.style.top = `${topPct}%`;
          cardEl.style.bottom = "auto";
          cardEl.style.right = "auto";
          cardEl.style.transform = "translate(-50%, -15%) rotate(-4deg)";
        } else {
          cardEl.style.right = "auto";
          cardEl.style.left = "32%";
          cardEl.style.bottom = "28%";
        }
      } else {
        cardEl.style.right = "";
        cardEl.style.left = "";
        cardEl.style.bottom = "";
        cardEl.style.top = "";
        cardEl.style.transform = "";
      }

      if (state.step === "insert" && state.card === "idle") {
        cardHint.textContent = "tap the card to slide it into the slot";
        cardHint.classList.remove("hidden");
      } else if (state.step === "cardReturn" && state.card !== "taken") {
        cardHint.textContent = "tap the card to take it";
        cardHint.classList.remove("hidden");
      } else {
        cardHint.classList.add("hidden");
      }

      /* receipt */
      const showReceipt = state.receiptOut > 0 && !state.receiptTaken;
      receipt.classList.toggle("hidden", !showReceipt);
      if (showReceipt) {
        receipt.innerHTML = receiptHTML();
        receipt.style.left = "50%";
        receipt.style.top = "50%";
        const pct = Math.max(8, state.receiptOut);
        receipt.style.clipPath =
          pct >= 100
            ? ""
            : `inset(0 0 ${100 - pct}% 0)`;
        receipt.style.transform = "translate(-50%, -50%)";
        receipt.style.opacity = "1";
      }

      door.classList.toggle("hidden", state.step !== "door");

      /* large photo modal */
      if (photoModal) {
        if (state.step === "memories") {
          const memory = MEMORIES[state.memoryIndex] || MEMORIES[0];
          const last = state.memoryIndex === MEMORIES.length - 1;
          photoModal.innerHTML = `
            <div class="atm-photo-backdrop" data-act="menu"></div>
            <div class="atm-photo-card" role="dialog" aria-modal="true" aria-label="Large photo view">
              <div class="atm-photo-header">
                <span class="atm-photo-badge"><i class="atm-photo-dot"></i> Photo Vault</span>
                <span class="atm-photo-counter">Photo ${state.memoryIndex + 1} / ${MEMORIES.length}</span>
                <button class="atm-nav atm-photo-close-btn" data-act="menu" aria-label="Close photo view">✕</button>
              </div>
              <div class="atm-photo-display">
                <div class="atm-photo-frame">
                  <img src="${memory.img}" alt="${memory.caption}" class="atm-photo-img" />
                </div>
              </div>
              <div class="atm-photo-footer">
                <p class="atm-photo-caption">"${memory.caption}"</p>
                <div class="atm-nav-row atm-photo-controls">
                  <button class="atm-nav" data-act="prev" ${state.memoryIndex === 0 ? "disabled" : ""}>◀ Previous</button>
                  <button class="atm-nav atm-nav-return" data-act="menu">◀ Back to Menu</button>
                  <button class="atm-nav" data-act="next">${last ? "Menu ▶" : "Next ▶"}</button>
                </div>
              </div>
            </div>`;
          photoModal.classList.remove("hidden");
        } else {
          photoModal.classList.add("hidden");
          photoModal.innerHTML = "";
        }
      }
    }

    const go = (step) => {
      state.step = step;
      paint();
    };

    /* ---------------- card insertion ---------------- */
    function insertCard() {
      if (state.card !== "idle" || state.step !== "insert") return;
      state.card = "inserting";
      paint(false);
      flash("Card accepted • beep");
      later(() => {
        state.card = "gone";
        state.step = "reading";
        state.progress = 0;
        paint();
        const tick = every(() => {
          state.progress = Math.min(100, state.progress + 7);
          paint(false);
          if (state.progress >= 100) {
            window.clearInterval(tick);
            later(() => go("pin"), 500);
          }
        }, 110);
      }, 1500);
    }

    /* ---------------- keypad ---------------- */
    function pressKey(key) {
      if (state.step === "pin" || state.step === "pinWrong") {
        if (key === "C") {
          state.pin = "";
          return paint(false);
        }
        if (key === "E") {
          const entered = state.pin;
          state.pin = "";
          if (entered === PIN) {
            go("pinOk");
            later(() => go("menu"), 1400);
          } else {
            go("pinWrong");
            later(() => go("pin"), 1500);
          }
          return;
        }
        if (state.pin.length < 4) {
          state.pin += key;
          paint(false);
        }
        return;
      }
      if (state.step === "menu" && ["1", "2", "3", "4"].includes(key)) selectMenu(Number(key));
    }

    /* ---------------- menu ---------------- */
    function selectMenu(option) {
      if (option === 1) {
        state.progress = 0;
        go("vault");
        const tick = every(() => {
          state.progress = Math.min(100, state.progress + 10);
          paint(false);
          if (state.progress >= 100) {
            window.clearInterval(tick);
            later(() => {
              state.memoryIndex = 0;
              go("memories");
            }, 400);
          }
        }, 90);
      } else if (option === 2) {
        state.balanceShown = false;
        go("checking");
        later(() => {
          go("balance");
          later(() => {
            state.balanceShown = true;
            paint(false);
          }, 200);
        }, 1600);
      } else if (option === 3) {
        go("wish");
      } else {
        go("exitAsk");
      }
    }

    function nextMemory() {
      const next = Math.min(MEMORIES.length - 1, state.memoryIndex + 1);
      state.memoryIndex = next;
      state.viewed = Math.max(state.viewed, next + 1);
      paint();
    }

    function prevMemory() {
      state.memoryIndex = Math.max(0, state.memoryIndex - 1);
      paint();
    }

    /* ---------------- exit → receipt → card → door ---------------- */
    function endSession() {
      state.receiptOut = 0;
      state.receiptTaken = false;
      go("receipt");
      const tick = every(() => {
        state.receiptOut += 4;
        paint(false);
        if (state.receiptOut >= 100) window.clearInterval(tick);
      }, 90);
    }

    function takeReceipt() {
      if (state.receiptOut < 96) return flash("Still printing…");
      if (state.receiptTaken) return;
      state.receiptTaken = true;
      receipt.classList.add("pulled");
      receipt.style.transform = "translate(-50%, -50%) translateY(70px) rotate(6deg)";
      receipt.style.opacity = "0";
      flash("Receipt collected ❤️");
      later(() => {
        state.card = "returning";
        go("cardReturn");
        later(() => {
          state.nagCard = true;
          paint(false);
        }, 4000);
      }, 500);
    }

    function takeCard() {
      if (state.step !== "cardReturn") return;
      state.card = "taken";
      state.nagCard = false;
      paint(false);
      later(() => {
        go("thanks");
        later(() => {
          go("door");
          later(() => {
            const forward = document.getElementById("nav-forward");
            if (forward) forward.click();
          }, 1800);
        }, 2600);
      }, 600);
    }

    /* ---------------- side buttons ---------------- */
    function sideButton(index, side) {
      if (state.step === "menu") {
        if (side === "left") selectMenu(index + 1);
        return;
      }
      if (state.step === "memories") {
        if (side === "left" && index === 3) prevMemory();
        if (side === "right" && index === 3) {
          if (state.memoryIndex === MEMORIES.length - 1) go("menu");
          else nextMemory();
        }
        return;
      }
      if (state.step === "balance" && index === 3) return go("menu");
      if (state.step === "wishDone" && index === 3) return go("menu");
      if (state.step === "exitAsk") {
        if (side === "left" && index === 3) endSession();
        if (side === "right" && index === 3) go("menu");
      }
    }

    /* ---------------- wiring (delegated) ---------------- */
    keypad.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-key]");
      if (btn) pressKey(btn.dataset.key);
    });

    stage.addEventListener("click", (event) => {
      const side = event.target.closest(".side-btn");
      if (side && !side.disabled) return sideButton(Number(side.dataset.index), side.dataset.side);

      const menuRow = event.target.closest("[data-menu]");
      if (menuRow) return selectMenu(Number(menuRow.dataset.menu));

      const act = event.target.closest("[data-act]");
      if (act) {
        const which = act.dataset.act;
        if (which === "take-receipt") return takeReceipt();
        if (which === "prev") return prevMemory();
        if (which === "next") {
          return state.memoryIndex === MEMORIES.length - 1 ? go("menu") : nextMemory();
        }
        if (which === "menu") return go("menu");
        if (which === "end") return endSession();
        if (which === "confirm-wish") {
          const input = document.getElementById("atm-wish");
          const value = input ? input.value.trim() : "";
          if (!value) return;
          state.wish = value;
          return go("wishDone");
        }
      }
    });

    screen.addEventListener("input", (event) => {
      if (event.target.id === "atm-wish") state.wish = event.target.value;
    });

    slot.addEventListener("click", insertCard);
    cardEl.addEventListener("click", () =>
      state.step === "cardReturn" ? takeCard() : insertCard(),
    );
    cardEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter") state.step === "cardReturn" ? takeCard() : insertCard();
    });
    receipt.addEventListener("click", takeReceipt);
    receipt.addEventListener("pointerup", takeReceipt);

    const handleKeydown = (event) => {
      if (state.step !== "memories") return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        prevMemory();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        if (state.memoryIndex === MEMORIES.length - 1) go("menu");
        else nextMemory();
      } else if (event.key === "Escape") {
        event.preventDefault();
        go("menu");
      }
    };
    window.addEventListener("keydown", handleKeydown);

    void watchdog;
    paint();
  }

  /* =================================================================
     CHAPTER · CUT THE CAKE
     ================================================================= */
  function CutCakePage() {
    afterRender(bindCutCake);
    return `
    <div class="chapter-page page-content">
      <div class="section-intro compact">
        <div>
          <p class="eyebrow">A special birthday ritual</p>
          <h2 id="cake-heading">Blow out the candles first</h2>
        </div>
      </div>

      <button class="unlock-button" id="cake-candles-btn" style="width:auto;padding:13px 26px">Blow out the candles</button>

      <div class="cutcake-stage" id="cutcake-stage">
        <canvas class="cutcake-canvas" id="cutcake-canvas"></canvas>
        <div class="knife hidden" id="cake-knife">
          <svg viewBox="0 0 34 190" width="34" height="190">
            <defs>
              <linearGradient id="blade" x1="0" x2="1">
                <stop offset="0" stop-color="#f3f6f8" />
                <stop offset=".45" stop-color="#c7ced4" />
                <stop offset=".55" stop-color="#eef2f5" />
                <stop offset="1" stop-color="#98a1a8" />
              </linearGradient>
              <linearGradient id="handle" x1="0" x2="1">
                <stop offset="0" stop-color="#4a2b24" />
                <stop offset="1" stop-color="#25150f" />
              </linearGradient>
            </defs>
            <path d="M17 0 L26 34 L26 120 L8 120 L8 34 Z" fill="url(#blade)" />
            <rect x="7" y="120" width="20" height="10" rx="2" fill="#8d959b" />
            <rect x="9" y="130" width="16" height="58" rx="7" fill="url(#handle)" />
          </svg>
        </div>
        <span class="cut-count hidden" id="cut-count">Pieces: 1</span>
        <span class="cut-help" id="cut-help">candles are still burning</span>
      </div>

      <button class="unlock-button hidden" id="cake-done-btn" style="width:auto;padding:13px 26px;margin-top:8px">Cake is served, open your gift 🎁</button>
    </div>`;
  }

  function bindCutCake() {
    const wrap = document.getElementById("cutcake-stage");
    const canvas = document.getElementById("cutcake-canvas");
    if (!wrap || !canvas) return;

    const knife = document.getElementById("cake-knife");
    const heading = document.getElementById("cake-heading");
    const candlesBtn = document.getElementById("cake-candles-btn");
    const doneBtn = document.getElementById("cake-done-btn");
    const countEl = document.getElementById("cut-count");
    const helpEl = document.getElementById("cut-help");

    let candlesOut = false;
    let cuts = [];
    let dragStart = null;
    const cream = [];

    const pieces = () => (cuts.length === 0 ? 1 : cuts.length * 2);

    function draw() {
      const ratio = window.devicePixelRatio || 1;
      const width = wrap.clientWidth;
      const height = wrap.clientHeight;
      if (width < 2 || height < 2) return;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.33;

      /* plate */
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy + 12, radius * 1.42, radius * 1.3, 0, 0, Math.PI * 2);
      const plate = ctx.createRadialGradient(cx, cy, radius * 0.4, cx, cy, radius * 1.45);
      plate.addColorStop(0, "#fffdf8");
      plate.addColorStop(1, "#e8dccd");
      ctx.fillStyle = plate;
      ctx.shadowColor = "rgba(37,25,29,.22)";
      ctx.shadowBlur = 26;
      ctx.shadowOffsetY = 14;
      ctx.fill();
      ctx.restore();

      const angles = cuts.length
        ? cuts
          .reduce((acc, a) => acc.concat([a, a + Math.PI]), [])
          .map((a) => ((a % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2))
          .sort((a, b) => a - b)
        : [];

      const wedges = [];
      if (angles.length === 0) {
        wedges.push([0, Math.PI * 2]);
      } else {
        for (let i = 0; i < angles.length; i += 1) {
          const start = angles[i];
          const end = i === angles.length - 1 ? angles[0] + Math.PI * 2 : angles[i + 1];
          wedges.push([start, end]);
        }
      }

      wedges.forEach(([start, end]) => {
        const mid = (start + end) / 2;
        const spread = cuts.length ? Math.min(10, 3 + cuts.length * 2) : 0;
        const ox = Math.cos(mid) * spread;
        const oy = Math.sin(mid) * spread;

        /* sponge side */
        ctx.save();
        ctx.translate(ox, oy + 16);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, start, end);
        ctx.closePath();
        ctx.fillStyle = "#c98d63";
        ctx.fill();
        ctx.restore();

        /* frosted top */
        ctx.save();
        ctx.translate(ox, oy);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, start, end);
        ctx.closePath();
        const top = ctx.createRadialGradient(
          cx - radius * 0.3,
          cy - radius * 0.4,
          radius * 0.1,
          cx,
          cy,
          radius,
        );
        top.addColorStop(0, "#fbe3e0");
        top.addColorStop(0.55, "#f2c6c4");
        top.addColorStop(1, "#d99a9c");
        ctx.fillStyle = top;
        ctx.fill();

        ctx.lineWidth = 6;
        ctx.strokeStyle = "#fff8ed";
        ctx.beginPath();
        ctx.arc(cx, cy, radius - 4, start, end);
        ctx.stroke();

        if (cuts.length) {
          ctx.strokeStyle = "rgba(123,57,68,.35)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(start) * radius, cy + Math.sin(start) * radius);
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(end) * radius, cy + Math.sin(end) * radius);
          ctx.stroke();
        }
        ctx.restore();
      });

      /* "17" writing while the cake is whole */
      ctx.save();
      ctx.fillStyle = "#7b3944";
      ctx.font = `600 ${Math.round(radius * 0.42)}px Georgia`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      if (cuts.length === 0) ctx.fillText("17", cx, cy);
      ctx.restore();

      /* candles */
      if (!candlesOut) {
        [-0.5, 0.5].forEach((offset) => {
          const x = cx + offset * radius * 0.5;
          const y = cy - radius * 0.55;
          ctx.fillStyle = "#fff8ed";
          ctx.fillRect(x - 4, y - 40, 8, 44);
          ctx.fillStyle = "#b85f68";
          ctx.fillRect(x - 4, y - 30, 8, 5);
          ctx.beginPath();
          ctx.ellipse(x, y - 48, 6, 11, 0, 0, Math.PI * 2);
          const flame = ctx.createRadialGradient(x, y - 46, 1, x, y - 48, 12);
          flame.addColorStop(0, "#fff3c4");
          flame.addColorStop(0.5, "#ffb648");
          flame.addColorStop(1, "rgba(255,120,40,0)");
          ctx.fillStyle = flame;
          ctx.fill();
        });
      }

      /* cream splatter */
      cream.forEach((blob) => {
        ctx.save();
        ctx.globalAlpha = blob.a;
        ctx.fillStyle = "#fff8ed";
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }

    const onResize = () => {
      if (!document.body.contains(canvas)) {
        window.removeEventListener("resize", onResize);
        return;
      }
      draw();
    };
    window.addEventListener("resize", onResize);
    requestAnimationFrame(() => requestAnimationFrame(draw));

    function refreshUI() {
      countEl.textContent = `Pieces: ${pieces()}`;
      countEl.classList.toggle("hidden", !candlesOut);
      helpEl.textContent = candlesOut
        ? "drag the knife right across the cake to slice it"
        : "candles are still burning";
      heading.textContent = candlesOut ? "Now cut the cake 🍰" : "Blow out the candles first";
      doneBtn.classList.toggle("hidden", pieces() < 4);
    }

    candlesBtn.addEventListener("click", () => {
      candlesOut = true;
      candlesBtn.classList.add("hidden");
      knife.classList.remove("hidden");
      refreshUI();
      draw();
    });

    wrap.addEventListener("pointerdown", (event) => {
      if (!candlesOut) return;
      const box = wrap.getBoundingClientRect();
      dragStart = { x: event.clientX - box.left, y: event.clientY - box.top };
      if (event.target.setPointerCapture) event.target.setPointerCapture(event.pointerId);
    });

    wrap.addEventListener("pointermove", (event) => {
      if (!candlesOut) return;
      const box = wrap.getBoundingClientRect();
      const x = event.clientX - box.left;
      const y = event.clientY - box.top;
      let rotation = 0;
      if (dragStart) {
        const dx = x - dragStart.x;
        const dy = y - dragStart.y;
        rotation = (Math.atan2(dy, dx) * 180) / Math.PI - 90;
        cream.push({ x, y, r: 2 + Math.random() * 4, a: 0.5 + Math.random() * 0.4 });
        if (cream.length > 160) cream.shift();
        draw();
      }
      knife.style.left = `${x - 17}px`;
      knife.style.top = `${y - 30}px`;
      knife.style.right = "auto";
      knife.style.transform = `rotate(${rotation}deg)`;
    });

    const endCut = (event) => {
      if (!dragStart) return;
      const box = wrap.getBoundingClientRect();
      const x = event.clientX - box.left;
      const y = event.clientY - box.top;
      const dx = x - dragStart.x;
      const dy = y - dragStart.y;
      dragStart = null;
      if (Math.hypot(dx, dy) < 60) return;
      if (cuts.length < 6) cuts = cuts.concat([Math.atan2(dy, dx)]);
      if (navigator.vibrate) navigator.vibrate(40);
      refreshUI();
      draw();
    };

    wrap.addEventListener("pointerup", endCut);
    wrap.addEventListener("pointercancel", () => {
      dragStart = null;
    });

    doneBtn.addEventListener("click", () => {
      const forward = document.getElementById("nav-forward");
      if (forward) forward.click();
    });

    refreshUI();
  }

  /* =================================================================
     CHAPTER · ACCEPT GIFT
     ================================================================= */
  function AcceptGiftPage() {
    afterRender(bindAcceptGift);
    return `
    <div class="chapter-page page-content">
      <div class="section-intro compact">
        <div>
          <p class="eyebrow">A little surprise for you</p>
          <h2 id="gift-heading">One last thing, accept your gift</h2>
        </div>
      </div>

      <div class="gift-stage" id="gift-stage">
        <button class="gift-box" id="gift-box" aria-label="Open your gift" style="border:0;background:none;padding:0">
          <span class="gift-body"></span>
          <span class="gift-shine"></span>
          <span class="gift-ribbon-v"></span>
          <span class="gift-lid"></span>
          <span class="gift-bow">
            <svg width="70" height="46" viewBox="0 0 70 46" fill="currentColor">
              <path d="M35 30C24 30 18 22 18 14S24 2 30 6s5 16 5 24Zm0 0c11 0 17-8 17-16S46 2 40 6s-5 16-5 24Z" />
              <circle cx="35" cy="31" r="8" />
            </svg>
          </span>
        </button>
        <p class="cut-help" id="gift-hint" style="position:static;transform:none">tap the box to accept your gift</p>

        <div class="gift-reveal hidden" id="gift-reveal">
          <h3>Happy 17th Birthday, ${NAME}</h3>
          <p>
            The real gift is not in this box. It is every chapter you just walked through, the locked door only you
            could open, the scratch card, the love meter that refused to stop at 100, the letter, the photo bank, and
            a cake cut with your own hands.
          </p>
          <p>Consider all of it yours. Forever. No expiry, no conditions.</p>
          <div class="gift-coupons">
            <span class="gift-coupon">Unlimited hugs</span>
            <span class="gift-coupon">Late night calls</span>
            <span class="gift-coupon">One wish, granted</span>
            <span class="gift-coupon">Me, always</span>
          </div>
          <div class="signature">Gift accepted ❤️</div>
        </div>
      </div>
    </div>`;
  }

  function bindAcceptGift() {
    const box = document.getElementById("gift-box");
    if (!box) return;
    box.addEventListener(
      "click",
      () => {
        box.classList.add("hidden");
        const hint = document.getElementById("gift-hint");
        if (hint) hint.classList.add("hidden");
        const heading = document.getElementById("gift-heading");
        if (heading) heading.textContent = "It was always yours";
        const reveal = document.getElementById("gift-reveal");
        if (reveal) reveal.classList.remove("hidden");
        if (navigator.vibrate) navigator.vibrate([40, 60, 40]);
      },
      { once: true },
    );
  }

  window.BdyChapters = { AtmPage, CutCakePage, AcceptGiftPage };
})();
