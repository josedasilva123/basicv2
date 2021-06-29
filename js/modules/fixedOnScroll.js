export default class FixedOnScroll{  
    constructor(){
        this.elements = document.querySelectorAll('[data-fixed]');
    } 

    fixedElement(){
        this.elements.forEach(element => {   
            if(window.pageYOffset > 400){
                if(!element.classList.contains('ativo')){
                    element.classList.add('ativo');
                }
            } else {
                element.classList.remove('ativo');
            }
        })
    }
    bindEvents(){
        this.fixedElement = this.fixedElement.bind(this);    
    }

    addEvent(){
        window.addEventListener('scroll', this.fixedElement);      
    } 

    init(){
        this.bindEvents();
        this.addEvent();
    } 
}