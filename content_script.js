// content_script.js
(() => {
  const api = typeof browser !== 'undefined' ? browser : chrome;

  const TRIGGER_KEYWORDS = [
    "wrong answer",
    "runtime error",
    "time limit exceeded",
    "memory limit exceeded",
    "compile error",
    "output limit exceeded",
    "runtime error (exited)",
    "error"
  ];
  const ACCEPTED_KEYWORDS = ["accepted", "accepted ✅"];

  // Do not retrigger for the same result quickly
  let lastSeen = { text: null, time: 0 };
  const REPEAT_COOLDOWN_MS = 3000;

  let overlayShown = false;
  let audioPlayed = false;

  function textContainsAny(str, keywords) {
    if (!str) return false;
    const lower = str.toLowerCase();
    return keywords.some(k => lower.includes(k));
  }

  function createOverlay() {
    const overlay = document.createElement("div");
    overlay.id = "gta-wasted-overlay";

    const imgUrl = api.runtime.getURL("assets/wasted.png");
    overlay.innerHTML = `
      <div id="gta-wasted-center">
        <img id="gta-wasted-img" src="${imgUrl}" alt="WASTED" onerror="this.style.display='none'">
      </div>
    `;
    document.documentElement.appendChild(overlay);
    return overlay;
  }

  function showOverlay() {
    if (overlayShown) return;
    
    let overlay = document.getElementById("gta-wasted-overlay");
    if (!overlay) overlay = createOverlay();

    overlay.classList.add("gta-wasted-show");
    overlayShown = true;

    // Try playing jingle only once
    if (!audioPlayed) {
      try {
        const audio = new Audio(api.runtime.getURL("assets/wasted.mp3"));
        audio.play().then(() => {
          audioPlayed = true;
        }).catch(() => {
          // autoplay may be blocked; that's ok
          console.debug("GTA Wasted audio blocked by autoplay policy.");
          audioPlayed = true;
        });
      } catch (e) {
        console.error("Audio play failed:", e);
        audioPlayed = true;
      }
    }

    // Don't auto-remove the overlay - it stays until page refresh
  }

  // Try to find submission status text anywhere in the page
  function findSubmissionText() {
    const selectors = [
      ".result__3Qe",
      ".status-content", 
      ".submission-result", 
      ".submission-status",
      ".ant-message"
    ];

    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el && el.innerText) {
        const t = el.innerText.trim();
        if (t.length) return t;
      }
    }

    const nodes = Array.from(document.querySelectorAll("div, span, p"))
      .filter(n => n.innerText && n.innerText.length < 200 && n.innerText.length > 3);

    for (const n of nodes) {
      const txt = n.innerText.trim();
      if (textContainsAny(txt, TRIGGER_KEYWORDS) || textContainsAny(txt, ACCEPTED_KEYWORDS)) {
        return txt;
      }
    }

    return null;
  }

  function handleDomChange() {
    const txt = findSubmissionText();
    if (!txt) return;

    const now = Date.now();
    if (txt === lastSeen.text && (now - lastSeen.time) < REPEAT_COOLDOWN_MS) return;

    lastSeen = { text: txt, time: now };

    if (textContainsAny(txt, ACCEPTED_KEYWORDS)) {
      return;
    }

    if (textContainsAny(txt, TRIGGER_KEYWORDS)) {
      showOverlay();
    }
  }

  const observer = new MutationObserver(() => {
    try {
      handleDomChange();
    } catch (e) {
      console.error("gta-wasted observer error", e);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true, characterData: true });

  setInterval(() => {
    try {
      handleDomChange();
    } catch (e) {
      console.error("gta-wasted periodic check error", e);
    }
  }, 1500);

  setTimeout(handleDomChange, 1500);
})();