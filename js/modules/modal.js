export default class Modal{
    constructor(){ 
        this.buttons = document.querySelectorAll('[data-openModal]');   
        this.close = document.querySelectorAll('[data-closeModal]');     
        this.activeClass = 'ativo';
    }
    
    toggleElement(element, buttons){ 
        if (buttons.length > 1){
            buttons.forEach(button => button.classList.toggle(this.activeClass));  
        } 
        element.classList.toggle(this.activeClass); 
    }

    toggleClick(event){
        event.stopPropagation();  
        const dataset = event.currentTarget.dataset.modal;
        const element = document.querySelector(`[data-element="${dataset}"]`);
        const buttons = document.querySelectorAll(`[data-openModal][data-modal="${dataset}"]`); 
        this.toggleElement(element, buttons);
    }

    bindEvents(){
        this.toggleClick = this.toggleClick.bind(this);
    }

    addEvents(){
        this.buttons.forEach(button => button.addEventListener('click', this.toggleClick));
        this.close.forEach(button => button.addEventListener('click', this.toggleClick));
    }  

    init(){
        this.bindEvents();
        this.addEvents();        
    }
}
