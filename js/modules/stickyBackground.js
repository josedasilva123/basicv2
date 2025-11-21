export default class StickyBackground {
  constructor() {
    this.elements = document.querySelectorAll("[data-stickyBackground]");
  }

  applyStickyBackground(element) {
    document.addEventListener("DOMContentLoaded", () => {
      const section = element;
      let currentOffset = 0;
      let targetOffset = 0;
      let ticking = false;

      window.addEventListener("scroll", () => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const progress = 1 - rect.top / windowHeight;

        targetOffset = Math.min(Math.max(progress * 60, 0), 30);

        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      });

      function updateParallax() {
        currentOffset += (targetOffset - currentOffset) * 0.04;

        section.style.backgroundPosition = `center ${50 - currentOffset}%`;

        if (Math.abs(targetOffset - currentOffset) > 0.1) {
          requestAnimationFrame(updateParallax);
        } else {
          ticking = false;
        }
      }
    });
  }

  init() {
    if (this.elements) {
      this.elements.forEach((element) => this.applyStickyBackground(element));
    }
  }
}
