(() => {
  try {
    const current = document.currentScript;
    if (!current) return;
    const audioUrl = current.dataset.audioUrl;
    if (!audioUrl) return;

    const audio = new Audio(audioUrl);
    audio.preload = "auto";
    audio.play().catch(err => {
      console.warn("page-audio play blocked:", err && err.message ? err.message : err);
    });

    setTimeout(() => {
      try { current.remove(); } catch(e) {}
    }, 1000);
  } catch (e) {
    console.error("injector error:", e);
  }
})();
