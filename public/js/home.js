/*Funcion para Menu Interactivo*/
(function(){
    const openButton = document.querySelector('.nav-home-menu');
    const menu = document.querySelector('.nav-home-options');
    const closeMenu = document.querySelector('.nav-home-close');

    openButton.addEventListener('click', ()=>{
        menu.classList.add('nav-home-options--show');
    });

    closeMenu.addEventListener('click', ()=>{
        menu.classList.remove('nav-home-options--show');
    });
})();

/*Funcion para Testimonios*/
(function(){
    const sliders = [...document.querySelectorAll('.body-view')];
    const buttonNext = document.querySelector('#view-next');
    const buttonBefore = document.querySelector('#view-before');
    let value;   

    buttonNext.addEventListener('click', ()=>{
        changePosition(1);
    });

    buttonBefore.addEventListener('click', ()=>{
        changePosition(-1);
    });

    const changePosition = (add)=>{
        const currentTestimony = document.querySelector('.body-view--show').dataset.id;
        value = Number(currentTestimony);
        value+= add;


        sliders[Number(currentTestimony)-1].classList.remove('body-view--show');
        if(value === sliders.length+1 || value === 0){
            value = value === 0 ? sliders.length  : 1;
        }

        sliders[value-1].classList.add('body-view--show');
    }
})();

/*Funcion para Seccion de Preguntas*/
this.addEventListener("DOMContentLoaded", () =>{
    const questions = document.querySelectorAll(".question")
    questions.forEach((question) => question.addEventListener("click", () =>{
  
        if(question.parentNode.classList.contains("active")){
            question.parentNode.classList.toggle("active")
        }
    else{
    questions.forEach(question => question.parentNode.classList.remove("active"))
    question.parentNode.classList.add("active")
        }

    }))
}) 