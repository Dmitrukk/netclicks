const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';
const API_KEY = 24%5 + '19fb1d37c2549cc959583feb7d3c06ea' + 24%5;

const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');
const modal = document.querySelector('.modal');
const tvShowsList = document.querySelector('.tv-shows__list');

const DBService = class {
    getData = async (url) => {
        const res = await fetch (url);
        if (res.ok) {
            return res.json();
        } else {
            throw new Error (`Не удалось получить данные по адресу ${url}`);
        }
    }

    getTestData = () => {
        return this.getData('test.json');
    }
}

const renderCard = response => {
    console.log(response);
    tvShowsList.textContent = '';

    response.results.forEach(item =>{
        const { 
            backdrop_path: backdrop,
            name: title, 
            poster_path: poster, 
            vote_average: vote
        } = item;

        const posterIMG = poster ? IMG_URL + poster : 'img/no-poster.jpg';
        const backdropIMG = backdrop ? IMG_URL + backdrop : '';
        const voteElem = vote ? `<span class="tv-card__vote">${vote}</span>` : '';

        const card = document.createElement('li');
        card.classList.add('tv-shows__item');
        card.innerHTML = `
            <a href="#" class="tv-card">
            ${voteElem}
                <img class="tv-card__img"
                     src="${posterIMG}"
                     data-backdrop="${backdropIMG}"
                     alt="Звёздные войны: Повстанцы">
                <h4 class="tv-card__head">${title}</h4>
            </a>
        `;
        
        tvShowsList.append(card);
    }) 
};

new DBService().getTestData().then(renderCard);

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

const switchImage = event => {
    const card = event.target.closest('.tv-shows__item');

    if(card) {
        const img = card.querySelector('.tv-card__img');

        if (img.dataset.backdrop) {
            [img.dataset.backdrop, img.src] = [img.src, img.dataset.backdrop];
        }
    }
  };

tvShowsList.addEventListener('mouseover', switchImage);
tvShowsList.addEventListener('mouseout', switchImage);

  tvShowsList.addEventListener('click', event => {
    event.preventDefault();  
    
    const target = event.target;
      const card = target.closest('.tv-card');

      if (card) {
          document.body.style.overflow = 'hidden';
          modal.classList.remove('hide');
      }
  });

  modal.addEventListener('click', event => {
      if(event.target.closest('.cross') || 
        event.target.classList.contains('modal')) {
        document.body.style.overflow = '';
        modal.classList.add('hide');
      }
  });

