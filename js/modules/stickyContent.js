export default class StickyContent {
  constructor() {
    this.elements = document.querySelectorAll("[data-stickySection]");
  }

  addStickyContentAnimation(element) {
    document.addEventListener("DOMContentLoaded", () => {
      const targetSection = element;
      const id = element.getAttribute("data-stickySection");

      const nextSection = document.querySelector(
        `[data-stickyNextSection="${id}"]`
      );

      const start = element.getAttribute("data-stickySectionStart");

      const end = element.getAttribute("data-stickySectionEnd");

      const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const ratio = entry.intersectionRatio;

            const min = start ? Number(start) : 0.21;
            const max = end ? Number(end) : 0.5;
            
            let progress = (ratio - min) / (max - min);
            progress = Math.min(Math.max(progress, 0), 1);

            const translate = 2 * (progress * 100);

            const scale = 1 + 0.03 * progress;

            targetSection.style.transform = `translateY(${translate}px) scale(${scale})`;
          });
        },
        { threshold: thresholds }
      );

      observer.observe(nextSection);
    });
  }

  init() {
    if (this.elements) {
      this.elements.forEach((element) =>
        this.addStickyContentAnimation(element)
      );
    }
  }
}
