export default class Menu {
  constructor() {
    this.menus = document.querySelectorAll("[data-menu]");
    this.sections = document.querySelectorAll("[data-section]");
    this.activeClass = "atual";
  }

  activeItem(currentUrl, item) {
    const href = item.getAttribute("href");
    if (item.classList.contains(this.activeClass) && href != currentUrl) {
      item.classList.remove(this.activeClass);
    } else if (
      !item.classList.contains(this.activeClass) &&
      href == currentUrl
    ) {
      item.classList.add(this.activeClass);
    }
  }

  activeCurrentSection() {
    const scrollHeight = window.pageYOffset;
    this.sections.forEach((section) => {
      const sectionBegin = section.offsetTop;
      const sectionEnds = (sectionBegin + section.offsetHeight);
      if ((scrollHeight >= sectionBegin || section.getAttribute('data-section') == "first") && scrollHeight < sectionEnds) {
        this.menus.forEach((menu) => {
          const items = menu.querySelectorAll("[data-menu-link]");
          items.forEach((item) => {
            const currentSection = `#${section.getAttribute("id")}`;
            this.activeItem(currentSection, item);
          });
        });
      }
    });
  }

  activeCurrentItem() {
    this.menus.forEach((menu) => {
      const items = menu.querySelectorAll("[data-menu-link]");
      items.forEach((item) => {
        const currentUrl = window.location.pathname;
        this.activeItem(currentUrl, item);
      });
    });
  }

  bindEvents() {
    this.activeCurrentSection = this.activeCurrentSection.bind(this);
  }

  addEvents() {
    if (this.sections) {
      window.addEventListener("scroll", this.activeCurrentSection);
    }
  }

  init() {    
    this.activeCurrentItem();
    this.activeCurrentSection();
    this.bindEvents();
    this.addEvents();
  }
}
