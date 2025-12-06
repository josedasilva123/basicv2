export default class StickyBackground {
  constructor() {
    this.elements = document.querySelectorAll("[data-stickyBackground]");
  }

  applyStickyBackground(element) {
    document.addEventListener("DOMContentLoaded", () => {
      const section = element;
      const reverse = section.hasAttribute("data-stickyReverse");

      let currentOffset = 0;
      let targetOffset = 0;
      let ticking = false;

      window.addEventListener("scroll", () => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // progress baseado em toda a transição da section pela viewport
        const scrollStart = windowHeight;
        const scrollEnd = -rect.height;

        let progress = (rect.top - scrollStart) / (scrollEnd - scrollStart);

        // reverse → comportamento oposto
        if (reverse) {
          progress = 1 - progress;
        }

        // clamp 0–1
        progress = Math.min(Math.max(progress, 0), 1);

        targetOffset = progress * 30;

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
