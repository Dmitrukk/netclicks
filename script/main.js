const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
});

document.body.addEventListener('click', (event) =>{
    if (!event.target.closest('.left-menu')) {
        console.log('клик не внутри меню');
        leftMenu.classList.remove('openMenu');
        hamburger.classList.remove('open');
    }
});

leftMenu.addEventListener('click', () => {
    const target = event.target;
    const dropdown = target.closest('.dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
        leftMenu.classList.add('openMenu');
        hamburger.classList.add('open');
    }
});

const switchImage = (src) => {
    document.querySelectorAll('.tv-card__img').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        src = el.src;
        el.src = el.getAttribute('data-backdrop');
      })
      el.addEventListener('mouseleave', () => {el.src = src});
    });
  }
  switchImage();