document.addEventListener("DOMContentLoaded", () => {
  const screen = document.querySelector(".hero-monitor-screen");
  if (!screen) return;

  const barFill = screen.querySelector(".hero-boot-bar-fill");
  const percentLabel = screen.querySelector(".hero-boot-percent");
  const hammerSickleSymbol = screen.querySelector(
    ".hero-boot-symbol--hammer-sickle",
  );
  const flagSymbol = screen.querySelector(".hero-boot-symbol--flag");
  const citadelSymbol = screen.querySelector(".hero-boot-symbol--citadel");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const BOOT_SEEN_KEY = "pa05-hero-boot-seen";
  const BAR_DURATION_MS = 2600;
  const PHASE_GAP_MS = 300;
  const PHASE2_HOLD_MS = 2000;

  const goToFinal = () => {
    screen.dataset.phase = "final";
  };

  const hasSeenBoot = window.localStorage.getItem(BOOT_SEEN_KEY) === "true";

  if (hasSeenBoot || prefersReducedMotion) {
    window.localStorage.setItem(BOOT_SEEN_KEY, "true");
    goToFinal();
    return;
  }

  window.localStorage.setItem(BOOT_SEEN_KEY, "true");

  const show = (el) => {
    if (el) el.classList.add("is-active");
  };
  const hide = (el) => {
    if (el) el.classList.remove("is-active");
  };

  const runLogoPhase = () => {
    screen.dataset.phase = "logo";
    window.setTimeout(goToFinal, PHASE2_HOLD_MS);
  };

  const runLoadingPhase = () => {
    screen.dataset.phase = "loading";

    window.requestAnimationFrame(() => {
      if (barFill) barFill.style.width = "100%";
    });

    const start = performance.now();
    let hammerShown = false;
    let flagShown = false;
    let citadelShown = false;

    const tick = (now) => {
      const percent = Math.min(100, ((now - start) / BAR_DURATION_MS) * 100);
      if (percentLabel) percentLabel.textContent = `${Math.round(percent)}%`;

      if (!hammerShown && percent >= 15) {
        show(hammerSickleSymbol);
        hammerShown = true;
      }
      if (!flagShown && percent >= 45) {
        show(flagSymbol);
        flagShown = true;
      }
      if (!citadelShown && percent >= 75) {
        show(citadelSymbol);
        citadelShown = true;
      }

      if (percent < 100) {
        window.requestAnimationFrame(tick);
      } else {
        hide(citadelSymbol);
        window.setTimeout(runLogoPhase, PHASE_GAP_MS);
      }
    };

    window.requestAnimationFrame(tick);
  };

  runLoadingPhase();
});
