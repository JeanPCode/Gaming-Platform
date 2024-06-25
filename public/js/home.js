/*Funcion para menu interactivo*/
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

/*Funcion para carrusel de testimonios*/
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

/*Funcion para dropdown de preguntas*/
(function(){
    const titleQuestions = [...document.querySelectorAll('.tittle-questions')];
    console.log(titleQuestions)

    titleQuestions.forEach(question =>{
        question.addEventListener('click', ()=>{
            let height = 0;
            let answer = question.nextElementSibling;
            let addPadding = question.parentElement.parentElement;

            addPadding.classList.toggle('question--add');
            question.children[0].classList.toggle('arrow-questions--rotate');

            if(answer.clientHeight === 0){
                height = answer.scrollHeight;
            }

            answer.style.height = `${height}px`;
        });
    });
})();