export default class Colapse{
    constructor(){
        this.labels = document.querySelectorAll('[data-colapsejs="label"]');
        this.activeClass = 'ativo';
    }

    handleClick({currentTarget}){
        console.log(currentTarget);
        const box = currentTarget.nextElementSibling;
        const group = currentTarget.getAttribute('data-colapsegroup');
        if(group){
            const labels = document.querySelectorAll(`[data-colapsegroup="${group}"]`);
            labels.forEach(label => {
                const currentBox = label.nextElementSibling;
                if(currentBox.getAttribute('data-colapsejs') == "box"){
                    currentBox.classList.remove(this.activeClass);
                    label.classList.remove(this.activeClass);                    
                } 
            })
        }
        if(box.getAttribute('data-colapsejs') == "box"){
            if(!currentTarget.classList.contains(this.activeClass)){
                currentTarget.classList.add(this.activeClass);
                box.classList.add(this.activeClass);
            } else {
                currentTarget.classList.remove(this.activeClass);
                box.classList.remove(this.activeClass);
            }
        }
    }

    bindEvents(){
        this.handleClick = this.handleClick.bind(this);
    }

    addEvents(){
        if(this.labels){
            this.labels.forEach(label => {
                label.addEventListener('click', this.handleClick);
            })
        }
    }

    init(){
        this.bindEvents();
        this.addEvents();
    }
}