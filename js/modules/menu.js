export default class Menu{
    constructor(){
        this.menus = document.querySelectorAll('[data-menu]');
        this.activeClass = 'ativo';
    }

    activeCurrentItem(){
        this.menus.forEach(menu => {
            const items = menu.querySelectorAll('[data-menu-link]');
            items.forEach(item => {
                const href = item.getAttribute('href');
                if(item.classList.contains(this.activeClass)){
                    item.classList.remove(this.activeClass);
                } else if (href == window.location.pathname){
                    item.classList.add(this.activeClass);
                }
            })
        }) 
    }

    init(){
        this.activeCurrentItem();
    }
}