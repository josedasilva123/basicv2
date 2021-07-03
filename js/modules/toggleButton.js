import outsideClick from "./functions/outsideClick.js";

export default class ToggleButton {
  constructor() {
    this.buttons = document.querySelectorAll("[data-toggle]");
    this.activeClass = "ativo";
  }

  toggleElement(element, buttons) {
    if (buttons.length > 1) {
      buttons.forEach((button) => button.classList.toggle(this.activeClass));
    }
    element.classList.toggle(this.activeClass);
  }

  toggleClick(event) {
    event.stopPropagation();
    const dataset = event.currentTarget.dataset.toggle;
    const element = document.querySelector(`[data-element="${dataset}"]`);
    const buttons = document.querySelectorAll(`[data-toggle="${dataset}"]`);

    if (element.hasAttribute("data-outclick")) {
      outsideClick(element, this.activeClass, () => {
        this.toggleElement(element, buttons);
        buttons.forEach((button) =>
          button.addEventListener("click", this.toggleClick)
        );
      });
      buttons.forEach((button) =>
        button.removeEventListener("click", this.toggleClick)
      );
    }
    this.toggleElement(element, buttons);
  }

  bindEvents() {
    this.toggleClick = this.toggleClick.bind(this);
  }

  addEvents() {
    this.buttons.forEach((button) =>
      button.addEventListener("click", this.toggleClick)
    );
  }

  init() {
    this.bindEvents();
    this.addEvents();
  }
}
