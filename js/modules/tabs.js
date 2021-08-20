export default class Tabs {
  constructor() {
    this.elements = document.querySelectorAll("[data-tab-menu]");
    this.activeClass = "ativo";
  }

  selectItem(menu, items, content, i) {    
    [...content, ...items].forEach((item) => {
      item.classList.remove(this.activeClass);
    });

    items[i].classList.add(this.activeClass);
    content[i].classList.add(this.activeClass);
    menu.setAttribute('data-index', i);
  }

  previousItem(menu, items, content){
    const currentIndex = +menu.getAttribute('data-index');
    let index;
    if (currentIndex == 0){
      index = items.length - 1;
    } else {
      index = currentIndex - 1;
    }
    console.log(index);  
    console.log(currentIndex);

    this.selectItem(menu, items, content, index);
  }

  nextItem(menu, items, content){
    const currentIndex = +menu.getAttribute('data-index');
    let index;
    if (currentIndex == (items.length - 1)){
      index = 0;
    } else {
      index = currentIndex + 1;
    }  
    this.selectItem(menu, items, content, index);
  }

  tabScript(menu) { 
    const items = menu.querySelectorAll("li");
    const content = document.querySelectorAll(
      `[data-tab-content="${menu.dataset.tabMenu}"`
    );
    
    const previous = document.querySelectorAll(`[data-tab-prev="${menu.dataset.tabMenu}"`);
    const next = document.querySelectorAll(`[data-tab-next="${menu.dataset.tabMenu}"`);

    if(previous){
      previous.forEach(element => {
        element.addEventListener("click", () => {
          this.previousItem(menu, items, content);
        })
      })      
    }

    if(next){
      next.forEach(element => {
        element.addEventListener("click", () => {
          this.nextItem(menu, items, content);
        })
      })
    }

    items.forEach((item, index) => {
      item.addEventListener("click", () => {
        this.selectItem(menu, items, content, index);
      });
    });
    menu.setAttribute('data-index', 0);
  }

  autoPlay(menu) {
    const items = menu.querySelectorAll("li");
    const content = document.querySelectorAll(
      `[data-tab-content="${menu.dataset.tabMenu}"`
    );

    let autoplay;

    if (menu.hasAttribute("data-autoplay")) {
      let counter = 0;
      autoplay = setInterval(() => {
        if (counter < items.length - 1) {
          counter++;
        } else {
          counter = 0;
        }
        this.selectItem(content, items, counter);
      }, 6000);
    }

    function clearAutoplay() {
      if (autoplay) {
        clearInterval(autoplay);
      }
    }

    items.forEach((item) => {
      item.addEventListener("click", clearAutoplay);
    });
  }

  init() {
    this.elements.forEach((menu) => {
      this.tabScript(menu);
      this.autoPlay(menu);
    });
  }
}
