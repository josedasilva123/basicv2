export default class ScrollAnimation {
  constructor() {
    this.elements = document.querySelectorAll("[data-sanimation]");
    this.activeClass = "ativo";
  }

  playAnimation() {
    const scrollHeight = window.pageYOffset;
    this.elements.forEach((element) => {
      const sectionHeight = element.offsetTop;
      const scrollRequired = sectionHeight - window.innerHeight * 0.7;
      if (scrollHeight >= scrollRequired) {
        element.classList.add(this.activeClass);
      }
    });
  }

  bindEvents() {
    this.playAnimation = this.playAnimation.bind(this);
  }

  addEvent() {
    if (this.elements) {
      window.addEventListener("scroll", this.playAnimation);
    }
  }

  init() {
    this.bindEvents();
    this.addEvent();
    this.playAnimation();
  }
}
