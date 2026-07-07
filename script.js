document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const counters = document.querySelectorAll('.stat-number');
  const duration = 1200;

  counters.forEach((counter) => {
    const target = Number(counter.dataset.target);
    const suffix = counter.dataset.suffix || '';

    if (prefersReducedMotion) {
      counter.textContent = target + suffix;
      return;
    }

    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(progress * target);
      counter.textContent = value + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        counter.textContent = target + suffix;
      }
    }

    requestAnimationFrame(tick);
  });
});
