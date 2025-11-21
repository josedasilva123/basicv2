export default class VideoScroll {
  constructor() {
    this.elements = document.querySelectorAll("[data-videoScroll]");
  }

  addVideoScroll(element) {
    document.addEventListener("DOMContentLoaded", () => {
      const video = element.querySelector("video");

      let sectionHeight = 0;
      let start = 0;
      let end = 0;

      video.addEventListener("loadedmetadata", () => {
        setupScrollPoints();
      });

      window.addEventListener("resize", setupScrollPoints);

      function setupScrollPoints() {
        sectionHeight = element.offsetHeight;

        start = element.offsetTop + window.innerHeight * 0.2;
        end = element.offsetTop + sectionHeight - window.innerHeight;
      }

      window.addEventListener("scroll", () => {
        const scrollPos = window.scrollY;

        const range = end - start;
        let progress = (scrollPos - start) / range;

        progress = Math.min(Math.max(progress, 0), 1);

        if (video.duration) {
          video.currentTime = progress * video.duration;
        }
      });
    });
  }

  init() {
    if(this.elements){
        this.elements.forEach(element => this.addVideoScroll(element));
    }
  }
}
