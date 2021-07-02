export default class ValidateForm{
    constructor(form, submit){
        this.form = document.querySelector(form);
        this.fields = this.form.querySelectorAll(`[data-form="field"]`);
        this.types = {
            email: {
                regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                error: 'Digite um endereço de e-mail válido.' 
            },          
        }
        this.masks = {
            
        }
        this.submit = submit;
        this.activeClass = 'ativo';
        this.loadingClass = 'load';
    }
       
    validate(field){
        const value = field.value;        
        const expression = field.getAttribute('data-regex');
  
        if(this.types[expression].regex.test(value)){       
            return {
                error: '', 
                errorStatus: false,               
            }
        } else {
            return {
                error: this.types[expression].error,
                errorStatus: true,
            }
        }
    }

    toggleError(check, field){
        const identifier = field.getAttribute('id');
        const error = document.querySelector(`#${identifier} + .error`);

        if (check.status === true){
            if(!error.classList.contains(this.activeClass)){
                error.classList.add(this.activeClass);
            }            
        } else {
            if(error.classList.contains(this.activeClass)){
                error.classList.remove(this.activeClass);
            }      
        }
        error.innerText = check.text;
    }  

    checkField(field){
        let check = {};
        if(field.value === '' && field.hasAttribute('required')){
            check.status = true;
            check.text = 'Preencha um valor no campo.';
        } else if (field.hasAttribute('data-regex')){
            const validation = this.validate(field); 
            check.status = validation.errorStatus;
            check.text = validation.error;  
        } else {
            check.status = false;
            check.text = '';
        }
        this.toggleError(check, field);

        return check.status;
    }  

    fieldChange({currentTarget}){  
      this.checkField(currentTarget);        
    }  
    
    async fetchSubmit(event){
        event.preventDefault();
        const errors = Array.from(this.fields).map((field) => {
            const check = this.checkField(field);
            return check;
        });

        if(errors.every(element => element == false)){
            if(this.submit){
                const {url, options} = this.submit;
                const submit = event.currentTarget.querySelector(`[type="submit"]`);
                const html = submit.innerHTML;   
                try{
                    submit.innerHTML = 'Enviando...'
                    if(!submit.classList.contains(this.loadingClass)){
                        submit.classList.add(this.loadingClass);
                    }
                    const response = await fetch(url, options); 
                    const json = await response.json();                    
                } catch {
        
                } finally {
                    submit.innerHTML = html;
                }    
            }
        } else {
            console.log('Existem erros');     
        }
    }

    bindEvents(){
        this.fieldChange = this.fieldChange.bind(this);
        this.fetchSubmit = this.fetchSubmit.bind(this);
    }

    addEvents(){
        this.fields.forEach(field => {
            field.addEventListener('change', this.fieldChange);
            field.addEventListener('blur', this.fieldChange);
        })   
        
        this.form.addEventListener('submit', this.fetchSubmit);
    }

    init(){
        this.bindEvents();
        this.addEvents();
    }

}