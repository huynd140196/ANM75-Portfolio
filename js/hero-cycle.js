document.addEventListener("DOMContentLoaded", () => {
  const lockup = document.querySelector(".hero-name-lockup");
  if (!lockup) return;

  const centerItems = {
    logo: lockup.querySelector(".hero-center-item--logo"),
    days: lockup.querySelector(".hero-center-item--days"),
    duration: lockup.querySelector(".hero-center-item--duration"),
  };
  const stateOrder = ["logo", "days", "duration"];
  const labelItems = lockup.querySelectorAll(".hero-cycle-label");
  const daysNumberEl = lockup.querySelector("[data-hero-days-number]");
  const durationNumberEl = lockup.querySelector("[data-hero-duration-number]");

  const FOUNDING_DATE = new Date(2020, 9, 7);
  const MS_PER_DAY = 86400000;
  const STATE_HOLD_MS = 3500;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  function daysSinceFounding(now) {
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    return Math.round((startOfToday - FOUNDING_DATE) / MS_PER_DAY);
  }

  function elapsedSinceFounding(now) {
    let years = now.getFullYear() - FOUNDING_DATE.getFullYear();
    let months = now.getMonth() - FOUNDING_DATE.getMonth();
    let days = now.getDate() - FOUNDING_DATE.getDate();

    if (days < 0) {
      months -= 1;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    return { years, months, days };
  }

  function appendDigits(parent, numberStr) {
    for (const ch of numberStr) {
      if (ch === "0") {
        const img = document.createElement("img");
        img.className = "hero-stat-zero-img";
        img.src = "assets/images/logo.png";
        img.alt = "";
        img.setAttribute("aria-hidden", "true");
        parent.appendChild(img);
      } else {
        parent.appendChild(document.createTextNode(ch));
      }
    }
  }

  function renderDays() {
    if (!daysNumberEl) return;
    daysNumberEl.innerHTML = "";
    appendDigits(daysNumberEl, String(daysSinceFounding(new Date())));
  }

  function renderDuration() {
    if (!durationNumberEl) return;
    durationNumberEl.innerHTML = "";

    const lang = document.documentElement.lang === "en" ? "en" : "vi";
    const dict = translations[lang];
    const elapsed = elapsedSinceFounding(new Date());

    appendDigits(durationNumberEl, String(elapsed.years));
    durationNumberEl.appendChild(
      document.createTextNode(` ${dict.heroYearsUnit}, `),
    );
    appendDigits(durationNumberEl, String(elapsed.months));
    durationNumberEl.appendChild(
      document.createTextNode(` ${dict.heroMonthsUnit}, `),
    );
    appendDigits(durationNumberEl, String(elapsed.days));
    durationNumberEl.appendChild(
      document.createTextNode(` ${dict.heroDaysUnit}`),
    );
  }

  renderDays();
  renderDuration();

  const langObserver = new MutationObserver(renderDuration);
  langObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });

  function showState(index) {
    const activeKey = stateOrder[index];

    stateOrder.forEach((key) => {
      const el = centerItems[key];
      if (!el) return;
      const isActive = key === activeKey;
      el.classList.toggle("is-active", isActive);
      el.setAttribute("aria-hidden", String(!isActive));
    });

    labelItems.forEach((el, i) => {
      const isActive = i === index;
      el.classList.toggle("is-active", isActive);
      el.setAttribute("aria-hidden", String(!isActive));
    });

    if (activeKey === "days") renderDays();
    if (activeKey === "duration") renderDuration();
  }

  showState(0);

  if (prefersReducedMotion) return;

  let stateIndex = 0;
  window.setInterval(() => {
    stateIndex = (stateIndex + 1) % stateOrder.length;
    showState(stateIndex);
  }, STATE_HOLD_MS);
});
