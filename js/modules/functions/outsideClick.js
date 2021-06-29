export default function outsideClick(element, activeClass, callback){
    function handleOutsideClick(event){
        if(!element.contains(event.target)){
            event.preventDefault();
            callback();
            document.body.removeEventListener('click', handleOutsideClick);
        }
    }
    if(!element.classList.contains(activeClass)){
        setTimeout(() => document.body.addEventListener('click', handleOutsideClick), 0);  
    } 
}