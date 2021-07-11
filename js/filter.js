import { dataPromise, photoCardsRender } from './photo-cards-render.js';
import { getRandomElement } from './util.js';
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
  for (const button of buttons) {
    button.addEventListener('click', function () {
      buttons.forEach((i) => i.classList.remove('img-filters__button--active'));
      this.classList.toggle('img-filters__button--active');
    });
  }
};

// Выборка 10 случайных фотографий пользователей
const getRandomTenPictures = (arr) => {
  const randomTenPicture = [];
  const copyOfPictureData = arr.slice();
  for (let i = 0; i < 10; i++) {
    randomTenPicture.push(getRandomElement(copyOfPictureData));
  }
  photoCardsRender(randomTenPicture);
};

// Сортировка фотографий по количеству комментариев
const getDiscussedPictures = (arr) => {
  const copy = arr.slice();
  copy.sort((a, b) => b.comments.length - a.comments.length);
  photoCardsRender(copy);
};

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
