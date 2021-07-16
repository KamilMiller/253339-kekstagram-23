import { dataPromise, photoCardsRender } from './photo-cards-render.js';
import { debounce } from './utils/debounce.js';

const RERENDER_DELAY = 500;
const filtersBox = document.querySelector('.img-filters');
const buttons = document.querySelectorAll('.img-filters__button');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

// Оформление кнопок фильтров при переключении
// Логику взял здесь: https://ru.stackoverflow.com/questions/876796/Настроить-переключение-кнопок
const setFilterButtonsStyle = () => {
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((element) => element.classList.remove('img-filters__button--active'));
      button.classList.toggle('img-filters__button--active');
    });
  });
};

// Выборка 10 случайных фотографий пользователей
const getRandomTenPictures = (arr) => {
  const randomTenPicture = arr.map((item) => [Math.random(), item]).sort().map((element) => element[1]).slice(0, 10);
  photoCardsRender(randomTenPicture);
};

// Сортировка фотографий по количеству комментариев
const getDiscussedPictures = (arr) => {
  const copy = arr.slice();
  copy.sort((a, b) => b.comments.length - a.comments.length);
  photoCardsRender(copy);
};

// Фильтрация
const setFilters = (e) => {
  const target = e.target;
  if (target === filterDefault) {
    dataPromise.then(photoCardsRender);
  } else if (target === filterRandom) {
    dataPromise.then(getRandomTenPictures);
  } else if (target === filterDiscussed) {
    dataPromise.then(getDiscussedPictures);
  }
};

filtersBox.addEventListener('click', debounce((evt) => setFilters(evt), RERENDER_DELAY));

setFilterButtonsStyle();

export { filtersBox };
