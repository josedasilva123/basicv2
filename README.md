# basicv2
Basic é um framework muito simples em Javascript e SCSS criado para facilitar a criação de front-end para websites. Composto por diversos módulos, tem como objetivo faciltiar o processo de criação oferecendo funcionalidades para as rotinas recorrentes na criação de sites, tais como: menu responsivo, abas, sanfonas, modal e mais...

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

**Modal básico**

```html
<button data-modal="exemplo" data-openModal>Abre Modal</button>
<div data-element="exemplo" class="b-modal">
    <div class="b-modal-content">
      <button data-modal="exemplo" data-closeModal>Fechar</button>
      Modal 
    </div>
</div>
```

**Modal com botão alternando**

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

**Modal com overlay**

```html
<button class="ativo" data-modal="exemplo" data-openModal>Abre Modal</button>
<button data-modal="exemplo" data-openModal>Fecha Modal</button>
<div data-element="exemplo" class="b-modal">
  <div class="b-modal-overlay">
    <div class="b-modal-content">
      <button data-modal="exemplo" data-closeModal>Fechar</button>
      Modal 
    </div>
  </div>      
</div>
```
Classes CSS Padrão:

| Classes | Descrição |
| ------ | ------ |
| b-modal | Fixa o modal na tela, é grade invisível em que o modal fica. Usa por padrão position: fixed, width: 100%, height: 100% e z-index: 1001, com display: flex para posicionar o conteúdo interno |
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

## toggleButton

Este modulo auxiliar a criação de botões para exibirem ou fecharem outros elementos, neste modulo, diferente do Modal, qualquer clique fora do elemento vai fecha-lo. É útil para criação de menus mobile, dropdowns onClick, entre outros.


Iniciando (em index.js):
```js
import ToggleButton from './modules/toggleButton.js';

const toggle = new ToggleButton();
toggle.init();
```
Aplicação em HTML:

**Menu Mobile Básico**

```html
<nav>
  <div class="b-menu-toggle-box">
    <div class="b-menu-toggle b-mobile" data-toggle="exemplo"> 
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
</nav> 
```

**Menu Mobile com botão alternando**

```html
<nav>
  <div class="b-menu-toggle-box">
    <div class="b-menu-toggle b-mobile ativo" data-toggle="exemplo"> 
      Abre Menu
    </div> 
    <div class="b-menu-toggle b-mobile" data-toggle="exemplo"> 
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
</nav> 
```
