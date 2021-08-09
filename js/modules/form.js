class ValidateForm {
  constructor(form, submit) {
    this.form = document.querySelector(form);
    this.fields = this.form.querySelectorAll(`[data-form="field"]`);
    this.types = {
      email: {
        regex:
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        error: "Digite um endereço de e-mail válido.",
      },
    };
    this.masks = {
      cpf: {
        expressions: [
          {
            regex: /\D/g,
            replace: "",
          },
          {
            regex: /(\d{3})(\d)/,
            replace: "$1.$2",
          },
          {
            regex: /(\d{3})(\d)/,
            replace: "$1.$2",
          },
          {
            regex: /(\d{3})(\d{1,2})$/,
            replace: "$1-$2",
          },
        ],
        clear: /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g,
      },
      cnpj: {
        expressions: [
          {
            regex: /\D/g,
            replace: "",
          },
          {
            regex: /^(\d{2})(\d)/,
            replace: "$1.$2",
          },
          {
            regex: /^(\d{2})\.(\d{3})(\d)/,
            replace: "$1.$2.$3",
          },
          {
            regex: /\.(\d{3})(\d)/,
            replace: "$1/$2",
          },
          {
            regex: /(\d{4})(\d)/,
            replace: "$1-$2",
          },
        ],
        clear: /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g,
      },
      telefone: {
        expressions: [
          {
            regex: /\D/g,
            replace: "",           
          },
          {
            regex: /^(\d{2})(\d)/g,
            replace: "($1) $2",           
          },
          {
            regex: /(\d)(\d{4})$/,
            replace: "$1-$2",     
          }
        ], 
        clear: /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g,       
      },
      inteiros: {
        expressions: [
          {
            regex: /\D/g,
            replace: "",           
          },
          {
            regex: /(\d)$/,
            replace: "$1",           
          },          
        ], 
        clear: /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g,       
      }
    };
    this.submit = submit;
    this.activeClass = "ativo";
    this.loadingClass = "load";
  }

  validate(field) {
    const value = field.value;
    const expression = field.getAttribute("data-regex");

    if (this.types[expression].regex.test(value)) {
      return {
        error: "",
        errorStatus: false,
      };
    } else {
      return {
        error: this.types[expression].error,
        errorStatus: true,
      };
    }
  }

  toggleError(check, field) {
    const identifier = field.getAttribute("id");
    const error = document.querySelector(`#${identifier} + .error`);

    if (check.status === true) {
      if (!error.classList.contains(this.activeClass)) {
        error.classList.add(this.activeClass);
      }
    } else {
      if (error.classList.contains(this.activeClass)) {
        error.classList.remove(this.activeClass);
      }
    }
    error.innerText = check.text;
  }

  checkField(field) {
    let check = {};
    if (field.value === "" && field.hasAttribute("required")) {
      check.status = true;
      check.text = "Preencha um valor no campo.";      
    } else if (field.hasAttribute("data-regex")) {
      const validation = this.validate(field);
      check.status = validation.errorStatus;
      check.text = validation.error;
    } else {
      check.status = false;
      check.text = "";
    }
    this.toggleError(check, field);
    return check.status;
  }

  fieldChange({currentTarget}) {
    this.checkField(currentTarget);  
  }

  async fetchSubmit(event) {    
    const errors = Array.from(this.fields).map((field) => {
      const check = this.checkField(field);
      return check;
    }); 
    
    if (errors.every((element) => element == false)) {
      if (this.submit) {
        event.preventDefault();
        const { url, options } = this.submit;
        const submit = event.currentTarget.querySelector(`[type="submit"]`);
        const html = submit.innerHTML;
        try {
          submit.innerHTML = "Enviando...";
          if (!submit.classList.contains(this.loadingClass)) {
            submit.classList.add(this.loadingClass);
          }
          const response = await fetch(url, options);
          const json = await response.json();
        } catch (e) {
          throw new Error(`Não foi possível realizara a requisição. Erro: ${e.name}: ${e.message}`);
        } finally {
          submit.innerHTML = html;
        }
      }
    } else {
      event.preventDefault();
      console.log("Existem erros");
    }
  }

  maskField({currentTarget}){
    const mask = this.masks[currentTarget.dataset.mask];
    const noMaskValue = currentTarget.value.replace(mask.clear, "");
    mask.expressions.forEach(expression => { 
      currentTarget.value  = currentTarget.value.replace(expression.regex, expression.replace);
    })  
  }

  bindEvents() {
    this.fieldChange = this.fieldChange.bind(this);
    this.fetchSubmit = this.fetchSubmit.bind(this);
    this.maskField = this.maskField.bind(this);
  }

  addEvents() {
    this.fields.forEach((field) => {
      field.addEventListener("change", this.fieldChange);
      field.addEventListener("blur", this.fieldChange);
      if(field.hasAttribute('data-mask')){        
          field.addEventListener('keyup', this.maskField);        
      }
    });

    this.form.addEventListener("submit", this.fetchSubmit);
  }

  init() {
    this.bindEvents();
    this.addEvents();
  }
}
function basicForm(selector, submit){
  const form = new ValidateForm(selector, submit);
  form.init();
}