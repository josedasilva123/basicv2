"use strict";
export default class ScrollAnimation {
  constructor(elements){
    this.elements = document.querySelectorAll('[data-sanimation]');
  }
  
  playAnimation() {
    if(this.elements){
      const scrollHeight = window.pageYOffset;
      this.elements.forEach((element) => {
        const sectionHeight = element.offsetTop;
        const scrollRequired = sectionHeight - window.innerHeight * 0.7;
        if (scrollHeight >= scrollRequired) {
          element.classList.add("ativo");
        }
      });
    }
  }

  bindEvents(){
    this.playAnimation = this.playAnimation.bind(this);
  }

  addEvent(){
    window.addEventListener("scroll", this.playAnimation);
  }

  init(){
    this.addEvent();
    this.playAnimation();
  }   
}
