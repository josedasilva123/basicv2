# basicv2 - 0.3.0
Basic é um framework muito simples em Javascript e SCSS criado para facilitar a criação de front-end para websites. O objetivo é entregar funcionalidades que são recorrentes na criação de sites com mínimo de CSS possível, para que a customização possa ser fácil e livre.

O Basic é divido em módulos, e abaixo consta a documentação de como utilizar cada um deles...

##### Lista de Módulos

**Módulos JS**
- [fixedOnScroll](#fixedonscroll)
- [scrollAnimation](#scrollanimation)
- [modal](#modal)
- [tabs](#tabs)
- [toggleButton](#togglebutton)
- [menu](#menu)

**Módulos CSS**
- [colapse](#colapse)

Você pode ativar o Basic em seu projeto via CDN (com todos os módulos ativos)

**Head**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/josedasilva123/basicv2@main/public/basic.css" />
```
**Body (Final)**
```html
<script type="module" src="https://cdn.jsdelivr.net/gh/josedasilva123/basicv2@main/public/basic.js"></script>
```
## fixedOnScroll

Este módulo fixa o elementos quando a rolagem atinge um deterninado valor.

Iniciando (em index.js):
```js
import FixedOnScroll from './modules/fixedOnScroll.js';

const fixedScroll = new FixedOnScroll();
fixedScroll.init();
```

Opções:

| Opção | Valor Padrão | Como usar |
| ------ | ------ | ------ |
| height | 400 | Uso  const scrollAnimation = new FixedOnScroll(550) |

Aplicação em HTML:
```html
<div data-fixed>
  Element
</div>
```
Attributos CSS Padrão:

| Atributo | Descrição |
| ------ | ------ |
| [data-fixed="top"] | Fixa o elemento em top: 0 |
| [data-fixed="bottom"] | Fixa o elemento em margin: 0 |


## scrollAnimation

Este módulo faz com que animações aconteçam ao atingir um valor relativo de rolagem.

Iniciando (em index.js):
```js
import ScrollAnimation from './modules/scrollAnimation.js';

const scrollAnimation = new ScrollAnimation();
scrollAnimation.init();
```

Aplicação em HTML:
```html
<div data-sanimation="fadeIn">
  Element
</div>
<div data-sanimation="fadeInLeft">
  Element
</div>
<div data-sanimation="fadeInRight">
  Element
</div>
```
Animações Disponíveis:

| Animação | Variações |
| ------ | ------ |
| fadeIn | fadeInLeft, fadeInRight, fadeInUp e fadeInDown |
| zoomIn | zoomInLeft, zoomInRight, zoomInUp e zoomInDown |

## modal

Este modulo auxilia a criação de modais chamados por padrão por evento de click via botão.

Iniciando (em index.js):
```js
import Modal from './modules/modal.js';

const modal = new Modal();
modal.init();
```
Aplicação em HTML:

### **Modal básico**

```html
<button data-modal="exemplo" data-openModal>Abre Modal</button>
<div data-element="exemplo" class="b-modal">
    <div class="b-modal-content">
      <button data-modal="exemplo" data-closeModal>Fechar</button>
      Modal 
    </div>
</div>
```

### **Modal com botão alternando**

```html
<button class="ativo" data-modal="exemplo" data-openModal>Abre Modal</button>
<button data-modal="exemplo" data-openModal>Fecha Modal</button>
<div data-element="exemplo" class="b-modal">
    <div class="b-modal-content">
      <button data-modal="exemplo" data-closeModal>Fechar</button>
      Modal 
    </div>
</div>
```

### **Modal com overlay**

```html
<button class="ativo" data-modal="exemplo" data-openModal>Abre Modal</button>
<button data-modal="exemplo" data-openModal>Fecha Modal</button>
<div data-element="exemplo" class="b-modal">
  <div class="b-modal-overlay"></div> 
  <div class="b-modal-content">
    <button data-modal="exemplo" data-closeModal>Fechar</button>
    Modal 
  </div>       
</div>
```
Classes CSS Padrão:

| Classes | Descrição |
| ------ | ------ |
| b-modal | Fixa o modal na tela, é grade invisível em que o modal fica. Usa por padrão `position: fixed, width: 100%, height: 100% e z-index: 1001`, com `display: flex` para posicionar o conteúdo interno |
| b-modal-overlay | É o overlay do modal, por padrão não tem cor, mas existe para, em caso de clique, o modal fechar |
| b-modal-content | É a caixa do modal propriamente dita

## tabs

Este módulo auxilia a criação de abas.

Iniciando (em index.js):
```js
import Tabs from './modules/tabs.js';

const tabs = new Tabs();
tabs.init();
```

Aplicação em HTML:

```html
<div>
  <div data-tab-content="exemplo" class="ativo">Aba 1</div>
  <div data-tab-content="exemplo">Aba 2</div>
</div>
<ul data-tab-menu="exemplo">
  <li class="ativo">Aba 1</li>
  <li>Aba 2</li>
</ul>
```
**Obs:** Vale dizer que a posição do menu não importa (Em cima, embaixo ou intercalado por outro elemento)

**Next and Prev**

É possível utilizar navegação de próximo e anterior.

```html
<div>
  <div data-tab-content="exemplo" class="ativo">Aba 1</div>
  <div data-tab-content="exemplo">Aba 2</div>
</div>
<ul data-tab-menu="exemplo">
  <li class="ativo">Aba 1</li>
  <li>Aba 2</li>
</ul>
<button data-tab-prev="exemplo">Anterior</button>
<button data-tab-next="exemplo">Próximo</button>
```

**Obs:** Os botões podem estar em qualquer lugar do documento (assim como o menu), além disso é possível haver mais de um botão.

**Autoplay**

É possível aplicar autoplay nas abas, para fazer isso, basta aplicar `data-autoplay` no **data-tab-menu**
```html
<ul data-tab-menu="exemplo" data-autoplay>
  <li class="ativo">Aba 1</li>
  <li>Aba 2</li>
</ul>
```

## toggleButton

Este módulo auxiliar a criação de botões para exibirem ou fecharem outros elementos. Ideal para menus mobiles, carrinhos, dropdowns ativos via click, entre outros...

Iniciando (em index.js):
```js
import ToggleButton from './modules/toggleButton.js';

const toggle = new ToggleButton();
toggle.init();
```
Aplicação em HTML:

### **Menu Mobile Básico**

```html
<nav>
  <div class="b-menu-toggle-box">
    <div class="b-mobile" data-toggle="exemplo"> 
      Botão Menu
    </div> 
  </div>   
  <ul class="b-menu" data-element="exemplo" data-animation="fadeIn">
    <li>
      <a href="">Item 1</a>             
    </li>
    <li>
      <a href="">Item 2</a>             
    </li>
    <li>
      <a href="">Item 3</a>             
    </li>
  </ul> 
</nav> 
```

### **Menu Mobile com botão alternando**

```html
<nav>
  <div class="b-menu-toggle-box">
    <div class="b-mobile ativo" data-toggle="exemplo"> 
      Abre Menu
    </div> 
    <div class="b-mobile" data-toggle="exemplo"> 
      Fecha Menu
    </div> 
  </div>   
  <ul class="b-menu" data-element="exemplo" data-animation="fadeIn">
    <li>
      <a href="">Item 1</a>             
    </li>
    <li>
      <a href="">Item 2</a>             
    </li>
    <li>
      <a href="">Item 3</a>             
    </li>
  </ul>    
</nav> 
```

### **Uso simplificado**

```html
<div>
  <div class="b-menu-toggle b-mobile ativo" data-toggle="exemplo"> 
    Abre Elemento
  </div>      
</div>
<div data-element="exemplo"> 
  Elemento
</div>
```

Atributos Especiais:
| Atributo | Descrição |
| ------ | ------ |
| data-outclick | Deve ser colocado no elemento **data-element**. Faz com que o menu seja fechado caso o aconteça um click fora do elemento |

### **Exemplo:**

```html
<div>
  <div class="b-menu-toggle b-mobile ativo" data-toggle="exemplo"> 
    Abre Elemento
  </div>      
</div>
<div data-element="exemplo" data-outclick> 
  Elemento
</div>
```
Classes CSS Padrão:

| Classes | Descrição |
| ------ | ------ |
| b-menu | Uma classe exclusiva para a criação de menus, aplicando `display: none` no formato mobile, caso o menu esteja inativo |
| b-mobile | Classe exclusiva dos botões, limitando a exibição somente ao mobile|

## menu

Este módulo adiciona comportamentos especiais ao menu, como identificar página ativa com base em `pathname` e outras especificidades para menu mobile.

Iniciando (em index.js):
```js
import Menu from './modules/menu.js';

const menu = new Menu();
menu.init();
```
### **Comportamento básico: identificar página ativa**

```html
<nav>
  <ul class="b-menu" data-menu>
    <li>
      <a href="/" data-menu-link>Item 1</a>             
    </li>
    <li>
      <a href="/exemplo1" data-menu-link>Item 2</a>             
    </li>
    <li>
      <a href="/exemplo2" data-menu-link>Item 3</a>             
    </li>
  </ul>    
</nav> 
```

### **Comportamento básico em menu mobile: identificar página ativa**

```html
<nav>
  <div class="b-menu-toggle-box">
    <div class="b-mobile ativo" data-toggle="exemplo"> 
      Abre Menu
    </div> 
    <div class="b-mobile" data-toggle="exemplo"> 
      Fecha Menu
    </div> 
  </div>   
  <ul class="b-menu" data-element="exemplo" data-animation="fadeIn" data-menu>
    <li>
      <a href="/" data-menu-link>Item 1</a>             
    </li>
    <li>
      <a href="/exemplo1" data-menu-link>Item 2</a>             
    </li>
    <li>
      <a href="/exemplo2" data-menu-link>Item 3</a>             
    </li>
  </ul>    
</nav> 
```

Atributos Especiais:
| Atributo | Descrição |
| ------ | ------ |
| data-menu="landing"| Com esta opção de atributo, o menu mobile é fechado ao se clicarem nos links (excelente opção para landing page) |
> O atributo "landing" precisa no módulo `toggleButton` para funcionar, tendo em vista que é através dele que são criados os menus mobile.

### **Exemplo: identificar página ativa + landing**

```html
<nav>
  <div class="b-menu-toggle-box">
    <div class="b-mobile ativo" data-toggle="exemplo"> 
      Abre Menu
    </div> 
    <div class="b-mobile" data-toggle="exemplo"> 
      Fecha Menu
    </div> 
  </div>   
  <ul class="b-menu" data-element="exemplo" data-animation="fadeIn" data-menu="exemplo">
    <li>
      <a href="/" data-menu-link>Item 1</a>             
    </li>
    <li>
      <a href="/exemplo1" data-menu-link>Item 2</a>             
    </li>
    <li>
      <a href="/exemplo2" data-menu-link>Item 3</a>             
    </li>
  </ul>    
</nav> 
```


***Além dos módulos em JS, o Basic tem disponível um conjunto de modulos CSS para funcionalidades mais simples, segue a lista e instruções de uso abaixo:***

## colapse

CSS simples para criação de acordeons e sanfonas.

**Exemplos**

```html
<label for="exemplo1" class="colapse-label">Item 1</label>
<input type="checkbox" name="exemplo" id="exemplo1" data-colapse>
<div class="colapse-content">
  Conteúdo 1
</div>
<label for="exemplo2" class="colapse-label">Item 2</label>
<input type="checkbox" name="exemplo" id="exemplo2" data-colapse>
<div class="colapse-content">
  Conteúdo 2
</div>
```
```html
<label for="exemplo1" class="colapse-label">Item 1</label>
<input type="radio" name="exemplo" id="exemplo1" data-colapse>
<div class="colapse-content">
  Conteúdo 1
</div>
<label for="exemplo2" class="colapse-label">Item 2</label>
<input type="radio" name="exemplo" id="exemplo2" data-colapse>
<div class="colapse-content">
  Conteúdo 2
</div>
```
------------

## Formulário

O módulo de formulário, adiciona diversas funcionalidades formulários: como validação de campos por regular expression, mascaras, a possibilidade da criação de formulários com etapas, entre outras.

Para inicializar o módulo, é necessário importa-lo separamente: 

```html
<script type="module" src="https://cdn.jsdelivr.net/gh/josedasilva123/basicv2@main/public/form.js"></script>
```

Iniciando um formulário.


**Formulário Simples**
```html
<form id="formExemplo">
    <input type="text" name="nome" id="nome" data-form="field" required/>
    <p class="error"></p>
    <input type="text" name="email" id="email" data-form"field" required/>
    <p class="error"></p>
    <button type="submit">Enviar</button>
</form>  
```

Iniciando o formulário: é necessário iniciar os formulários um via javascript.
```html
<script>
(function() {
  basicForm('#formExemplo');
})();
</script>  
```

**Formulário com Label**
```html
<form id="formExemplo">
    <label>
      NOME:
      <input type="text" name="nome" id="nome" data-form="field" required />
      <p class="error"></p>
    </label>  
    <label>
      <input type="text" name="email" id="email" data-form"field" required />
      <p class="error"></p>
    </label>  
    <button type="submit">Enviar</button>
</form>  
```

Aplicando máscara em um campo com o atributo `data-mask`:
```html
<label>
      <input type="text" name="telefone" id="telefone" data-form"field" data-mask="telefone" required />
      <p class="error"></p>
</label>  
```

Mascaras disponíveis:
| Mascará | Atributo |
| ------ | ------ |
| Telefone | data-mask="telefone" |
| Cep | data-mask="cep" |
| CPF | data-mask="cpf" |
| CNPJ | data-mask="cnpj" |
| Inteiros | data-mask="inteiros" |

Adicionando novas mascaras ao formulário:
```html
<script>
(function() {
  basicForm('#formExemplo', {
    validations: [
      mascaraExemplo: {
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
    ]
  });
})();
</script>  
```


Aplicando validação de regex com o atributo `data-regex`:
```html
<label>
      <input type="text" name="telefone" id="telefone" data-form"field" data-regex="telefone" required />
      <p class="error"></p>
</label>  

Validações disponíveis:
| Mascará | Atributo |
| ------ | ------ |
| Telefone | data-regex="telefone" |
| Email | data-regex="email" |
| Cep | data-regex="cep" |

```html

***Além dos módulos em JS, o Basic tem disponível um conjunto de modulos CSS para funcionalidades mais simples, segue a lista e instruções de uso abaixo:***

**This is basic!**
