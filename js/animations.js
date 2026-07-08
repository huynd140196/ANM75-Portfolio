document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const securitySequence = document.querySelector(".security-sequence");

  if (securitySequence) {
    const charDelay = 40;
    const threatDelay = 2500;
    const pauseAfterTyping = 1000;

    const runSecuritySequence = () => {
      const stages = {
        threat: securitySequence.querySelector('[data-stage="threat"]'),
        terminal: securitySequence.querySelector('[data-stage="terminal"]'),
        secure: securitySequence.querySelector('[data-stage="secure"]'),
      };
      const terminalTextEl = securitySequence.querySelector(".terminal-text");
      const lang = document.documentElement.lang === "en" ? "en" : "vi";
      const terminalLine = translations[lang].securityTerminalLine;

      const showStage = (name) => {
        Object.values(stages).forEach(
          (stage) => stage && stage.classList.remove("is-active"),
        );
        if (stages[name]) stages[name].classList.add("is-active");
      };

      if (prefersReducedMotion) {
        if (terminalTextEl) terminalTextEl.textContent = terminalLine;
        showStage("secure");
        return;
      }

      showStage("threat");

      setTimeout(() => {
        showStage("terminal");

        let charIndex = 0;
        const typeNextChar = () => {
          if (!terminalTextEl) return;
          terminalTextEl.textContent = terminalLine.slice(0, charIndex);
          charIndex++;
          if (charIndex <= terminalLine.length) {
            setTimeout(typeNextChar, charDelay);
          }
        };
        typeNextChar();

        const typingDuration = terminalLine.length * charDelay;
        setTimeout(() => {
          showStage("secure");
        }, typingDuration + pauseAfterTyping);
      }, threatDelay);
    };

    const runRadarThreats = () => {
      const radarDots = document.querySelectorAll(".radar-dot");
      if (!radarDots.length || prefersReducedMotion) return;

      const lang = document.documentElement.lang === "en" ? "en" : "vi";
      const terminalLine = translations[lang].securityTerminalLine;
      const typingDuration = terminalLine.length * charDelay;
      const removalInterval = typingDuration / radarDots.length;

      radarDots.forEach((dot) => dot.classList.add("is-active"));

      radarDots.forEach((dot, i) => {
        setTimeout(
          () => dot.classList.remove("is-active"),
          threatDelay + removalInterval * (i + 1),
        );
      });
    };

    if ("IntersectionObserver" in window) {
      const securityObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runSecuritySequence();
              runRadarThreats();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 },
      );

      securityObserver.observe(securitySequence);
    } else {
      runSecuritySequence();
      runRadarThreats();
    }
  }

  const timelineEvents = document.querySelectorAll(".timeline-event");

  if ("IntersectionObserver" in window && timelineEvents.length) {
    timelineEvents.forEach((event) => event.classList.add("timeline-reveal"));

    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.2 },
    );

    timelineEvents.forEach((event) => timelineObserver.observe(event));
  }
});
