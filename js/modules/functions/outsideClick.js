export default function outsideClick(element, activeClass, callback){
    function handleOutsideClick(event){
        if(!element.contains(event.target)){
            event.preventDefault();
            callback();
            document.body.removeEventListener('click', handleOutsideClick);
        } else if (element.getAttribute('data-menu') == "landing" && event.target.hasAttribute('data-menu-link')) {
            document.body.removeEventListener('click', handleOutsideClick); 
            callback();   
        }
    }
    if(!element.classList.contains(activeClass)){
        setTimeout(() => document.body.addEventListener('click', handleOutsideClick), 0);  
    }
}