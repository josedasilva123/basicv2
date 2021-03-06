class ValidateForm {
  constructor(form, submit, callback, validations, masks) {
    this.form = document.querySelector(form);
    this.fields = this.form.querySelectorAll(`[data-form="field"]`);
    this.groups = this.form.querySelectorAll(`[data-form="group"]`);
    this.checkboxes = this.form.querySelectorAll(`[data-form="checkbox"]`);
    this.navigation = this.form.querySelector(`[data-form="navigation"]`);
    this.steps = this.form.querySelectorAll(`[data-step]`);
    this.types = {
      email: {
        regex:
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        error: "Digite um endereço de e-mail válido.",
      },
      cep: {
        regex: 
        /^\d{5}-\d{3}$/,
        error: "Digite um CEP válido.",
      },
      telefone: {
        regex: 
        /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/,
        error: "Digite um telefone ou celular válido",
      },
      ...validations,
    };
    this.masks = {
      cep: {
        expressions: [
          {
            regex: /\D/g,
            replace: "",
          },
          {
            regex: /^(\d{5})(\d)/,
            replace: "$1-$2",
          },          
        ],
        clear: /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g,
      },
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
          },
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
      },
      ...masks,
    };
    this.submit = submit;
    this.callback = callback;
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
    const error = this.form.querySelector(`#${identifier} ~ .error`);

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

  checkField(field, errorUpdate) {
    let check = {};
    if (field.value === "" && field.hasAttribute("required")) {
      check.status = true;
      if (field.tagName == "SELECT") {
        check.text = "Selecione uma opção no campo.";
      } else {
        check.text = "Preencha um valor no campo.";
      }
    } else if (field.hasAttribute("data-regex")) {
      const validation = this.validate(field);
      check.status = validation.errorStatus;
      check.text = validation.error;
    } else {
      check.status = false;
      check.text = "";
    }
    if(errorUpdate){
      this.toggleError(check, field);
    }
    return check.status;
  }

  checkGroup(group, errorUpdate) {
    let check = {};
    const inputs = group.querySelectorAll("input");
    const validation = Array.from(inputs).map((input) => {
      if (input.checked) {
        return 1;
      } else {
        return 0;
      }
    });
    const number = validation.reduce((soma, i) => {
      return soma + i;
    });
    let min;
    if (group.dataset.min) {
      min = +group.dataset.min;
    } else {
      min = 1;
    }
    const max = +group.dataset.max;
    if (number < min) {
      check.status = true;
      check.text = `Você precisa marcar pelo menos ${min} opções(ão)`;
    } else if (max && number > max) {
      check.status = true;
      check.text = `Você precisa marcar no máximo ${max} opções(ão)`;
    } else {
      check.status = false;
      check.text = "";
    }
    if(errorUpdate){
      this.toggleError(check, group);
    }  
    return check.status;
  }

  checkCheckbox(checkbox, errorUpdate) {
    let check = {};
    if (!checkbox.checked && checkbox.hasAttribute("required")) {
      check.status = true;
      check.text = "Marcar esta caixa é obrigatório.";
    } else {
      check.status = false;
      check.text = "";
    }
    if(errorUpdate){
      this.toggleError(check, checkbox);
    }  
    return check.status;
  }

  groupChange(target){
    this.checkGroup(target , true);
  }

  checkboxChange({ currentTarget }) {
    this.checkCheckbox(currentTarget, true);
  }

  fieldChange({ currentTarget }) {
    this.checkField(currentTarget, true);
  }

  errorCheck(selector, errorUpdate) {
    const fields = selector.querySelectorAll(`[data-form="field"]`);
    const checkboxes = selector.querySelectorAll(`[data-form="checkbox"]`);
    const groups = selector.querySelectorAll(`[data-form="group"]`);
    const fieldErrors = Array.from(fields).map((field) => {
      const validation = this.checkField(field, errorUpdate);
      return validation;
    });
    const checkboxErrors = Array.from(checkboxes).map((checkbox) => {
      const validation = this.checkCheckbox(checkbox, errorUpdate);
      return validation;
    });
    const groupErrors = Array.from(groups).map((group) => {
      const validation = this.checkGroup(group, errorUpdate);
      return validation;
    });
    if (
      fieldErrors.every((element) => element == false) &&
      checkboxErrors.every((element) => element == false) &&
      groupErrors.every((element) => element == false)
    ) {
      return true;
    } else {
      return false;
    }
  }

  stepAdvancingCheck(step){
    const button = step.querySelector('[data-stepNext]');
    if(this.errorCheck(step, false)){
      button.disabled = false;
    } else {
      button.disabled = true;
    }   
  }

  previousStep(event) {
    event.preventDefault();
    const currentStep = +this.form.dataset.index;
    const previousStep = currentStep - 1;

    if (currentStep > 0) {
      this.steps.forEach((step) => {
        if (step.classList.contains(this.activeClass)) {
          step.classList.remove(this.activeClass);
        }
        this.steps[previousStep].classList.add(this.activeClass);
        this.form.setAttribute("data-index", previousStep);
        if (this.navigation) {
          this.updateNavigation(previousStep);
        }
      });
    }
  }

  nextStep(event) {
    event.preventDefault();
    const currentStep = +this.form.dataset.index;
    if (this.errorCheck(this.steps[currentStep], true)) {
      const nextStep = currentStep + 1;

      if (currentStep < this.steps.length) {
        this.steps.forEach((step) => {
          if (step.classList.contains(this.activeClass)) {
            step.classList.remove(this.activeClass);
          }
          this.steps[nextStep].classList.add(this.activeClass);
          this.form.setAttribute("data-index", nextStep);
          if (this.navigation) {
            this.updateNavigation(nextStep);
          }
        });
      }
    }
  }

  updateNavigation(index){
    const navigationSteps = this.navigation.querySelectorAll('li');
    navigationSteps.forEach(step => {
      step.classList.remove(this.activeClass);
    })
    navigationSteps[index].classList.add(this.activeClass);
  }

  async fetchSubmit(event) {
    if (this.errorCheck(this.form, true)) {
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
          throw new Error(
            `Não foi possível realizara a requisição. Erro: ${e.name}: ${e.message}`
          );
        } finally {
          submit.innerHTML = html;
        }
      } else if (this.callback){
        event.preventDefault();
        this.callback();
      }
    } else {
      event.preventDefault();
    }
  }

  maskField({ currentTarget }) {
    const mask = this.masks[currentTarget.dataset.mask];
    const noMaskValue = currentTarget.value.replace(mask.clear, "");
    mask.expressions.forEach((expression) => {
      currentTarget.value = currentTarget.value.replace(
        expression.regex,
        expression.replace
      );
    });
  }

  bindEvents() {
    this.previousStep = this.previousStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.checkboxChange = this.checkboxChange.bind(this);
    this.fieldChange = this.fieldChange.bind(this);
    this.fetchSubmit = this.fetchSubmit.bind(this);
    this.maskField = this.maskField.bind(this);
  }

  addEvents() {
    this.fields.forEach((field) => {
      field.addEventListener("change", this.fieldChange);
      field.addEventListener("blur", this.fieldChange);
      if (field.hasAttribute("data-mask")) {
        field.addEventListener("keyup", this.maskField);
      }
    });

    if (this.checkboxes.length > 0) {
      this.checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", this.checkboxChange);
      });
    }

    if (this.groups.length > 0) {
      this.groups.forEach((group) => {
        const inputs = group.querySelectorAll('input');
        inputs.forEach((input) => {
          input.addEventListener("change", () => {
            this.groupChange(group);
          });
        })  
      })
    }

    if (this.steps.length > 0) {
      this.steps.forEach((step) => {
        const previous = step.querySelector(`[data-stepPrevious]`);
        const next = step.querySelector(`[data-stepNext]`);
        const fields = step.querySelectorAll(`[data-form="field"]`);
        const checkboxes = step.querySelectorAll(`[data-form="checkbox"]`);
        const groups = step.querySelectorAll(`[data-form="group"]`);

        [...fields, ...checkboxes, ...groups].forEach(formField => {
          formField.addEventListener('change', () => {
            this.stepAdvancingCheck(step, false);  
          })
        })
        if (previous) {
          previous.addEventListener("click", this.previousStep);
        }
        if (next) {
          next.addEventListener("click", this.nextStep);
          next.disabled = true;
        }
      });
      this.steps[0].classList.add(this.activeClass);
      this.form.setAttribute("data-index", 0);
    }

    if (this.navigation) {
      this.updateNavigation(0);
    }    

    this.form.addEventListener("submit", this.fetchSubmit);
  }

  init() {
    this.bindEvents();
    this.addEvents();
  }
}

window.basicForm = (selector, callback, options) => {
  let submit;
  let validations;
  let masks;
  let callbackFunction;

  if(options){
    if(options.submit){
      submit = options.submit; 
    } else {
      submit = false;
    }
  
    if(options.validations){
      validations = options.validations; 
    } else {
      validations = false;
    }
  
    if(options.masks){
      masks = options.masks; 
    } else {
      masks = false;
    }
  } else {
    submit = false;
    validations = false;
    masks = false;  
  }

  if (callback){
    callbackFunction = callback;
  } else {
    callbackFunction = false;
  }

  const form = new ValidateForm(selector, submit, callbackFunction, validations, masks);
  form.init();
};