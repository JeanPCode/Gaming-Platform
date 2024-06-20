let ruleta = document.querySelector('.ruleta');
let girar = document.querySelector('.girar');
let seleccion = Math.ceil(Math.random() * 3600);

girar.onclick = function(){
  ruleta.classList.remove('girando'); 
  seleccion = Math.ceil(Math.random() * 3600);
  ruleta.classList.add('girando');
  animate(0);
}

function animate(timestamp) {
  let progress = timestamp / 5000; 
  let angle = seleccion * progress;
  ruleta.style.transform = `rotate3d(0, 0, 1, ${angle}deg)`;
  if (progress < 1) {
    requestAnimationFrame(animate);
  } else {
    ruleta.classList.remove('girando');
  }
}