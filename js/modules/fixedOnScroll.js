export default class FixedOnScroll{  
    constructor(height){
        if (height){
            this.defaultHeight = height;
        } else {
            this.defaultHeight = 400;
        }
        this.elements = document.querySelectorAll('[data-fixed]');
        this.activeClass = 'ativo';
    } 

    fixedElement(){
        this.elements.forEach(element => {   
            if(window.pageYOffset > this.defaultHeight){
                if(!element.classList.contains(this.activeClass)){
                    element.classList.add(this.activeClass);
                }
            } else {
                element.classList.remove(this.activeClass);
            }
        })
    }
    
    bindEvents(){
        this.fixedElement = this.fixedElement.bind(this);    
    }

    addEvent(){
        if(this.elements){
            window.addEventListener('scroll', this.fixedElement);  
        }   
    } 

    init(){
        this.bindEvents();
        this.addEvent();
    } 
}