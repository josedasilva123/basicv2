# basicv2 - 0.6.0
Basic é um framework muito simples em Javascript e SCSS criado para facilitar a criação de front-end para websites. O objetivo é entregar funcionalidades que são recorrentes na criação de sites com mínimo de CSS possível, para que a customização possa ser fácil e livre.

## Como instalar

Você pode ativar o Basic em seu projeto via CDN (com todos os módulos ativos)

**Head**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/josedasilva123/basicv2@main/public/basic.css" />
```
**Head (Sem reset.css)** para projetos que já tenham um reset próprio
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/josedasilva123/basicv2@main/public/basic-noreset.css" />
```
**Body (Final)**
```html
<script type="module" src="https://cdn.jsdelivr.net/gh/josedasilva123/basicv2@main/public/basic.js"></script>
```

Ou basta utilizar a os arquivos da pasta /public deste repositório.

## Módulos Basic

O Basic é divido em módulos, e abaixo consta a documentação de como utilizar cada um deles...

##### Lista de Módulos

**Módulos JS**
- [fixedOnScroll](#fixedonscroll)
- [scrollAnimation](#scrollanimation)
- [modal](#modal)
- [tabs](#tabs)

O módulo `stickyBackground` aplica um efeito de parallax simples diretamente ao elemento que contém um background (imagem CSS). Ele atualiza a propriedade `background-position` vertical conforme a página é rolada.

Comportamento observado no arquivo `js/modules/stickyBackground.js`:
- Seleciona elementos com o seletor `[data-stickyBackground]` (observe a caixa/camelCase do atributo).
- No evento `scroll` calcula um progresso relativo à posição do elemento na viewport: `progress = 1 - rect.top / windowHeight`.
- Calcula um `targetOffset = clamp(progress * 60, 0, 30)` (valor final limitado entre `0` e `30`).
- Anima suavemente `currentOffset` em direção a `targetOffset` com um easing (fator `0.04`) usando `requestAnimationFrame`.
- Atualiza `element.style.backgroundPosition = 'center ${50 - currentOffset}%'`, ou seja, a posição vertical do background varia entre `50%` (início) e `20%` (quando offset = 30).

Uso (HTML):
```html
<!-- O atributo correto é `data-stickyBackground` e deve ser aplicado ao próprio elemento com background -->
<section class="hero" data-stickyBackground style="background-image: url('hero.jpg');">
  <div class="hero-content">
    <h1>Título</h1>
    <p>Conteúdo que rola sobre o fundo.</p>
  </div>
</section>
```

Exemplo CSS recomendado:
```css
.hero { height: 70vh; min-height: 400px; background-size: cover; background-position: center 50%; position: relative; }
.hero-content { position: relative; z-index: 1; padding: 3rem; }
```
```js
import StickyBackground from './js/modules/stickyBackground.js';

const sticky = new StickyBackground();
sticky.init();
```
- Combine com `background-size: cover` para melhores resultados em imagens responsivas.

Se quiser, posso:
- ajustar o módulo para aceitar atributos como `data-sticky-offset` ou `data-sticky-disable-below` (e atualizar a doc novamente);
```
Animações Disponíveis:

| ------ | ------ |
| fadeIn | fadeInLeft, fadeInRight, fadeInUp e fadeInDown |
| zoomIn | zoomInLeft, zoomInRight, zoomInUp e zoomInDown |

## modal

Este módulo auxilia a criação de modais chamados por padrão por evento de click via botão.

Aplicação em HTML:

### **Modal básico**

```html
<button class="ativo" data-modal="exemplo" data-openModal>Abre Modal</button>
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
| b-modal | Fixa o modal na tela, é a "grade invisível" em que o modal fica. Usa por padrão `position: fixed, width: 100%, height: 100% e z-index: 1001`, com `display: flex` para posicionar o conteúdo interno |
| b-modal-overlay | É o overlay do modal, por padrão não tem cor, mas existe para, em caso de clique, o modal fechar |
| b-modal-content | É a caixa do modal propriamente dita

## tabs

Este módulo auxilia a criação de abas.

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

Este módulo auxilia a criação de botões para exibirem ou fecharem outros elementos. Ideal para menus mobiles, carrinhos, dropdowns ativos via click, entre outros...

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
| data-landing | Com esta opção de atributo, o menu mobile é fechado ao se clicarem nos links (excelente opção para landing page) |
> O atributo "landing" precisa do módulo `toggleButton` para funcionar, tendo em vista que é através dele que são criados os menus mobile.

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
  <ul class="b-menu" data-element="exemplo" data-animation="fadeIn" data-menu="exemplo" data-landing>
    <li>
      <a href="#sobre" data-menu-link>Item 1</a>             
    </li>
    <li>
      <a href="#depoimentos" data-menu-link>Item 2</a>             
    </li>
    <li>
      <a href="#contato" data-menu-link>Item 3</a>             
    </li>
  </ul>    
</nav> 
```

## colapseJS

Colapse com JS, aplicando classe ativo na label(botão ativador) e no conteúdo.

** Exemplo com classes do Basic (Singular) **
```html
<label class="b-colapse-label" data-colapsejs="label">Item 1</label>
<div class="b-colapse-content" data-colapsejs="box" data-animation="fadeIn">Conteúdo 1</div>
<label class="b-colapse-label" data-colapsejs="label">Item 2</label>
<div class="b-colapse-content" data-colapsejs="box" data-animation="fadeIn">Conteúdo 2</div>
```

** Exemplo com classes do Basic (Grupo) **: quando um é ativo, desativa os outros.
```html
<label class="b-colapse-label" data-colapsejs="label" data-colapsegroup="exemplo1">Item 1</label>
<div class="b-colapse-content" data-colapsejs="box" data-animation="fadeIn">Conteúdo 1</div>
<label class="b-colapse-label" data-colapsejs="label" data-colapsegroup="exemplo1">Item 2</label>
<div class="b-colapse-content" data-colapsejs="box" data-animation="fadeIn">Conteúdo 2</div>
```

| Classes | Descrição |
| ------ | ------ |
| b-colapse-label | Classe com `cursor: pointer` |
| b-colapse-content | Classe com `display: none` no estado inativo e `display: block` no estado ativo. |

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
## formulário

O módulo de formulário adiciona diversas funcionalidades aos formulários, como: validação de campos por regular expression, máscaras, possibilidade da criação de formulários com etapas, entre outras.

Para inicializar o módulo, é necessário importa-lo separamente: 

```html
<script src="https://cdn.jsdelivr.net/gh/josedasilva123/basicv2@main/public/form.js"></script>
```

Iniciando um formulário.

### Formulário Simples
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

### Formulário com Label
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
| Máscara | Atributo |
| ------ | ------ |
| Telefone | data-mask="telefone" |
| Cep | data-mask="cep" |
| CPF | data-mask="cpf" |
| CNPJ | data-mask="cnpj" |
| Inteiros | data-mask="inteiros" |

### Função de Callback no formulário (Sobrescrevendo a função de envio original):
```html
<script>
(function() {
  basicForm('#formExemplo', function(){
    console.log('Hello world');
  });
})();
</script>  
```

### Adicionando novas mascaras ao formulário:
```html
<script>
(function() {
  basicForm('#formExemplo', false, {
    masks: [
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

### Aplicando validação de regex com o atributo `data-regex`:
```html
<label>
      <input type="text" name="telefone" id="telefone" data-form"field" data-regex="telefone" required />
      <p class="error"></p>
</label>  
```

Validações disponíveis:
| Validação | Atributo |
| ------ | ------ |
| Telefone | data-regex="telefone" |
| Email | data-regex="email" |
| Cep | data-regex="cep" |

### Adicionando novas validações ao formulário:
```html
<script>
(function() {
  basicForm('#formExemplo', false, {
    validations: [
      validacaoExemplo: {
        regex:
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        error: "Mensagem de erro.",
      },
    ]
  });
})();
</script>  
```

***Máscaras e validações podem ser usadas em conjunto:***

Exemplo:
```html
<label>
      <input type="text" name="telefone" id="telefone" data-form"field" data-mask="telefone" data-regex="telefone" required />
      <p class="error"></p>
</label>  
```

### Formulário com Etapas

É possível criar formulários com etapa através do módulo de formulário. Utilizando divisões dentro do form com o atributo `data-step`
```html
<form id="formExemplo">
    <div data-step>
      <input type="text" name="nome" id="nome" data-form="field" required/>
      <p class="error"></p>
      <button data-stepNext>Próximo</button>
    </div>  
    <div data-step>
      <input type="text" name="email" id="email" data-form"field" required/>
      <p class="error"></p>
      <button data-stepPrevious>Anterior</button>
      <button type="submit">Enviar</button>
     </div>    
</form>  
```

### Checkbox em Formulário

Para validação de checkbox únicos, como por exemplo um aceite de política de privacidade, utilize o atributo `data-form="checkbox"` ao invés de **field**
```html
<label>
      <input type="checkbox" name="privacidade" id="privacidade" data-form="checkbox" required />
      Eu aceito a Política de Privacidade
      <p class="error"></p>
</label>  
```

### Grupos de Checkboxes ou Radio Buttons
É possível também criar validação para grupos de checkbox e radiobuttons, e, no caso de checkboxes, configurar um valor mínimo e máximo para seleção dos itens.

Utilização básica:
```html
<div data-form="group">
  <label>
      Opção A
      <input type="checkbox" name="opcao" id="opcaoA">
  </label>  
   <label>
      Opção B
      <input type="checkbox" name="opcao" id="opcaoB">
  </label> 
   <label>
      Opção C
      <input type="checkbox" name="opcao" id="opcaoC">
  </label> 
</div>
<p class="error"></p>  
```

### Mínimo e Máximo:
```html
<div data-form="group" min="1" max="2">
  <label>
      Opção A
      <input type="checkbox" name="opcao" id="opcaoA">
  </label>  
   <label>
      Opção B
      <input type="checkbox" name="opcao" id="opcaoB">
  </label> 
   <label>
      Opção C
      <input type="checkbox" name="opcao" id="opcaoC">
  </label> 
</div>
<p class="error"></p>  
```

***No caso dos checkbox, o basic tem automaticamente como padrão o min=1 e o max=undefined***

## dragAndDrop

Com o dragAndDrop, é possível criar grupos de elementos arrasta e solta, que podem ser movidos de `dropzone` para `dropzone`, além de reordenados.

### Exemplo Kanban
```html
<div class="boards" data-dropzone="board" data-dragdirection="X">
  <div class="board" draggable="true" data-draggableelement="board" >
    <h3>Todo</h3>
    <div class="dropzone green" data-dropzone="teste">
      <div class="card" draggable="true" data-draggableelement="teste">
        <div class="status blue"></div>
      <div class="content">Do vídeos</div>
    </div>
  </div>
</div> 
  
<div class="board" draggable="true" data-draggableelement="board"> 
  <h3>In Progress</h3>
  <div class="dropzone" data-dropzone="teste">
    <div class="card" draggable="true" data-draggableelement="teste">
      <div class="status green"></div>
        <div class="content">Do script</div>
      </div>
    </div>
</div>   
  
<div class="board" draggable="true" data-draggableelement="board">
  <h3>Done</h3>
  <div class="dropzone green" data-dropzone="teste">
    <div class="card" draggable="true" data-draggableelement="teste"> 
      <div class="status red"></div>
        <div class="content">Do Vídeos</div>
      </div>
    </div>
  </div>        
</div>
```

| Atributos | Descrição |
| ------ | ------ | 
| draggable | Propriedade necessária para os elementos que podem ser arrastados  |
| data-dragdirection | Pode ser `X` ou `Y` (Por default, o valor é Y) |
| data-dropzone | Esse atributo determina o identificador da dropzone, o atributo `data-draggableelement` dos itens internos deve corresponder a este identificador |
| data-draggableelement | Esse atributo precisa corresponder ao mesmo valor atributo `data-dropzone` **(nas zonas de drop)**, trata-se do identificador de elementos |


------------

## stickyBackground

O módulo `stickyBackground` permite criar efeitos em que o fundo (ou um elemento de fundo) permanece "fixo" ou se comporta de forma "grudada" em relação à área visível enquanto o usuário rola a página — útil para banners, seções com background parallax simples ou efeitos visuais onde o conteúdo parece deslizar sobre um plano de fundo fixo.

Principais características:
- Mantém um elemento de fundo fixo dentro de um container enquanto o conteúdo interno rola.
- Suporta offset configurável (distância do topo/bottom antes de iniciar o comportamento).
- Pode ser limitado a um container específico para não ultrapassar seus limites.

Como usar (HTML):
```html
<section class="hero" data-sticky-background data-sticky-offset="0" data-sticky-container="#sectionContainer">
  <div class="hero-bg" data-sticky-bg>
    <!-- imagem ou conteúdo de fundo -->
  </div>
  <div class="hero-content">
    <h1>Título</h1>
    <p>Conteúdo que rola sobre o fundo fixo.</p>
  </div>
</section>
```

Atributos disponíveis:
| Atributo | Descrição |
| ------ | ------ |
| `data-sticky-background` | Ativa o comportamento sticky neste bloco (aplicado no container pai). |
| `data-sticky-bg` | Marca o elemento que deve se comportar como fundo fixo. |
| `data-sticky-offset` | Offset em pixels antes do sticky entrar em ação (ex.: `50`). Padrão: `0`. |
| `data-sticky-container` | Se informado com um seletor (ex.: `#meuContainer`), limita o efeito ao container especificado. |
| `data-sticky-disable-below` | Desativa o comportamento abaixo de uma largura de viewport (em pixels). Útil para mobile. |

Classes/CSS úteis (padrão Basic):
- `b-sticky-bg`: classe base para o elemento de fundo (pode conter `position: absolute` / `cover`).
- `b-sticky-active`: aplicada quando o comportamento sticky está ativo (útil para transições).

Exemplo CSS mínimo:
```css
.hero { position: relative; overflow: hidden; }
.hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center; }
.b-sticky-active { transform: translateY(0); transition: transform .3s ease; }
.hero-content { position: relative; z-index: 1; }
```

Inicialização:
- Se você estiver usando o bundle `public/basic.js`, o módulo pode ser inicializado automaticamente junto aos demais módulos. Caso precise inicializar manualmente, importe e chame a função de inicialização correspondente (consulte o arquivo do módulo em `js/modules` para o nome exato da função / classe).

Boas práticas:
- Defina `data-sticky-disable-below` para evitar efeitos pesados em dispositivos móveis.
- Use `data-sticky-container` para que o fundo não ultrapasse o limite visual desejado.
- Combine com `background-size: cover` para obter melhores resultados em imagens responsivas.


**This is basic!**

## videoScroll

O módulo `videoScroll` sincroniza a reprodução de um elemento `<video>` com a posição de rolagem da página. À medida que o usuário rola, o código atualiza `video.currentTime` mapeando a posição do scroll para a duração do vídeo — útil para seções onde o vídeo funciona como uma linha do tempo controlada pelo scroll.

Comportamento observado em `js/modules/videoScroll.js`:
- Seleciona elementos com o seletor `[data-videoScroll]` (atenção à caixa: `data-videoScroll`).
- Busca o `<video>` interno via `element.querySelector('video')` — portanto o vídeo deve estar dentro do container marcado.
- Aguarda `loadedmetadata` do vídeo para configurar os pontos de início/fim.
- Recalcula pontos em `resize`.
- Define `start = element.offsetTop + window.innerHeight * 0.2` e `end = element.offsetTop + sectionHeight - window.innerHeight`.
- Calcula `progress = (scrollY - start) / (end - start)` (clamp 0..1) e atualiza `video.currentTime = progress * video.duration` quando `video.duration` estiver disponível.

Uso (HTML):
```html
<section class="video-section" data-videoScroll>
  <video src="/media/scroll.mp4" preload="metadata" muted playsinline></video>
  <div class="video-overlay">
    <!-- Conteúdo sobreposto ao vídeo -->
  </div>
</section>
```

Exemplo CSS recomendado:
```css
.video-section { position: relative; height: 100vh; min-height: 400px; overflow: hidden; }
.video-section video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.video-overlay { position: relative; z-index: 1; }
```

Inicialização (JS):
```js
import VideoScroll from './js/modules/videoScroll.js';

const vs = new VideoScroll();
vs.init();
```

Observações e boas práticas:
- O módulo controla `video.currentTime` diretamente; não é necessário chamar `play()` — o vídeo deve ter `preload` e normalmente `muted`/`playsinline` para compatibilidade e comportamento previsível em navegadores móveis.
- Se o container for muito curto ou tiver a mesma altura da viewport, o cálculo `end - start` pode ficar muito pequeno — verifique o tamanho da seção para evitar saltos ou divisão por zero.
- O módulo adiciona listeners de `scroll` e `resize` por elemento; em páginas com muitos vídeos, considere unificar listeners e aplicar um cálculo centralizado para melhorar performance.
- O ponto de início é `element.offsetTop + 20% da altura da janela` e o fim é `element.offsetTop + sectionHeight - window.innerHeight` — isto significa que o controle começa quando a seção entra parcialmente na viewport e termina quando a seção sai da vista.

Possíveis melhorias:
- Adicionar proteção contra `range === 0` para evitar divisão por zero.
- Permitir configurar `start`/`end` via atributos (`data-start-offset`, `data-end-offset`) e adicionar `data-disable-below` para desativar em dispositivos móveis.

