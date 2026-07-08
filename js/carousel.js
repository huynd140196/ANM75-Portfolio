document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".hero-carousel");
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const dotItems = Array.from(carousel.querySelectorAll(".carousel-dot-item"));
  const dots = Array.from(carousel.querySelectorAll(".carousel-dot"));
  const prevButton = carousel.querySelector(".carousel-arrow--prev");
  const nextButton = carousel.querySelector(".carousel-arrow--next");
  const camText = carousel.querySelector(".carousel-cam-text");

  if (!slides.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  let activeIndex = slides.findIndex((slide) =>
    slide.classList.contains("is-active"),
  );
  if (activeIndex === -1) activeIndex = 0;

  const intervalMs = 4000;
  let timerId = null;

  dotItems.forEach((item) => {
    item.style.setProperty("--ring-duration", `${intervalMs}ms`);
  });

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      const isActive = i === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    dots.forEach((dot, i) => {
      const isActive = i === activeIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-selected", String(isActive));
    });

    dotItems.forEach((item, i) => {
      item.classList.toggle("is-active", i === activeIndex);
    });

    if (camText) {
      camText.textContent = `CAM ${String(activeIndex + 1).padStart(2, "0")} // LIVE`;
    }
  };

  const stopAutoplay = () => {
    if (timerId !== null) {
      window.clearInterval(timerId);
      timerId = null;
    }
  };

  const startAutoplay = () => {
    stopAutoplay();
    timerId = window.setInterval(() => {
      showSlide(activeIndex + 1);
    }, intervalMs);
  };

  const goToSlide = (index) => {
    showSlide(index);
    if (!prefersReducedMotion) startAutoplay();
  };

  if (prevButton) {
    prevButton.addEventListener("click", () => goToSlide(activeIndex - 1));
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => goToSlide(activeIndex + 1));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => goToSlide(i));
  });

  if (!prefersReducedMotion) startAutoplay();
});
