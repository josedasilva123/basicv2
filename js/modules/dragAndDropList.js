export default class DragAndDropList {
  constructor() {
    this.draggableElements = document.querySelectorAll(
      "[data-draggableelement]"
    );
    this.dropzones = document.querySelectorAll("[data-dropzone]");
    this.highlightClass = "highlight";
    this.draggingClass = "dragging";
    this.overClass = "over";
  }

  dragStart(e) {
    const element = e.target;
    const slug = element.getAttribute("data-draggableElement");
    const dropzones = document.querySelectorAll(`[data-dropzone="${slug}"]`);
    dropzones.forEach((dropzone) =>
      dropzone.classList.add(this.highlightClass)
    );
    element.classList.add(this.draggingClass);
  }

  dragEnd(e) {
    const element = e.target;
    const slug = element.getAttribute("data-draggableelement");
    const dropzones = document.querySelectorAll(`[data-dropzone="${slug}"]`);
    dropzones.forEach((dropzone) =>
      dropzone.classList.remove(this.highlightClass)
    );
    element.classList.remove(this.draggingClass);
  }

  dragOver(e) {
    const dropzone = e.currentTarget;
    const draggingElement = document.querySelector(`.${this.draggingClass}`);
    
    
    if (
      dropzone.getAttribute("data-dropzone") ==
      draggingElement.getAttribute("data-draggableelement")
    ) {
      e.preventDefault();
      dropzone.classList.add(this.overClass);

      let afterElement;
      if(dropzone.getAttribute('data-dragdirection') === "X"){
        afterElement = this.getDragAfterElementX(dropzone, e.clientX);
      } else {
        afterElement = this.getDragAfterElementY(dropzone, e.clientY);
      }      
          
      if (afterElement == null) {
        dropzone.appendChild(draggingElement);
      } else {
        dropzone.insertBefore(draggingElement, afterElement);
      } 
    }  
  }

  dragLeave(e) {
    const dropzone = e.currentTarget;
    dropzone.classList.remove(this.overClass);
  }

  getDragAfterElementX(dropzone, x) {
    const slug = dropzone.getAttribute('data-dropzone');  
    const cards = [
      ...dropzone.querySelectorAll(`[data-draggableElement="${slug}"]:not(.dragging)`),
    ];
    if (cards.length > 0) {
      return cards.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = x - box.left - box.width / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        },
        { offset: Number.NEGATIVE_INFINITY }
      ).element;
    }
  }

  getDragAfterElementY(dropzone, y) {
    const slug = dropzone.getAttribute('data-dropzone'); 
    const cards = [
      ...dropzone.querySelectorAll(`[data-draggableElement="${slug}"]:not(.dragging)`),
    ];
    if (cards.length > 0) {
      return cards.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        },
        { offset: Number.NEGATIVE_INFINITY }
      ).element;
    }
  }

  bindEvents() {
    this.dragStart = this.dragStart.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.dragLeave = this.dragLeave.bind(this);
  }

  addEvents() {
    console.log(this.draggableElements);
    this.draggableElements.forEach((element) => {
      element.addEventListener("dragstart", this.dragStart);
      element.addEventListener("dragend", this.dragEnd);
    });
    this.dropzones.forEach((dropzone) => {
      dropzone.addEventListener("dragover", this.dragOver);
      dropzone.addEventListener("dragleave", this.dragLeave);
    });
  }
  init() {
    this.bindEvents();
    this.addEvents();
  }
}
