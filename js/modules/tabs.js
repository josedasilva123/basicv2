"use strict";
export default class Tabs{
    constructor(){        
        this.elements = document.querySelectorAll('[data-tab-menu]');           
    }

    selectItem(items, content, i){ 
        [...content, ...items].forEach((item) => {
            item.classList.remove('ativo');
        })

        items[i].classList.add('ativo');
        content[i].classList.add('ativo'); 
    }

    tabScript(menu){
        const items = menu.querySelectorAll('li'); 
        const content = document.querySelectorAll(`[data-tab-content="${menu.dataset.tabMenu}"`);               

        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.selectItem(content, items, index);
            })
        }) 
    }

    autoPlay(menu){
        const items = menu.querySelectorAll('li');
        const content = document.querySelectorAll(`[data-tab-content="${menu.dataset.tabMenu}"`); 

        let autoplay;

        if(menu.hasAttribute('data-autoplay')){
            let counter = 0;
            autoplay = setInterval(() => {
                if(counter < (items.length -1)){
                    counter++;                    
                } else {
                    counter = 0;
                }
                this.selectItem(content, items, counter);
            }, 6000)
        }

        function clearAutoplay(){
            if(autoplay){
                clearInterval(autoplay);
            }
        }

        items.forEach(item => {
            item.addEventListener('click', clearAutoplay);
        })
    }
    
    init(){
        this.elements.forEach((menu) => {
            this.tabScript(menu);
            this.autoPlay(menu);
        })
    }
}