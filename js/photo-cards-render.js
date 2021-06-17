import {picDataСollecting} from './pic-data-collecting.js';

// Переменные.
const photoCardTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

// Сборка галереи с фотографиями пользователей.
const photoCardsRender = (quantity) => {
  const fragment = document.createDocumentFragment();
  picDataСollecting(quantity).forEach((item) => {
    const photoCard = photoCardTemplate.cloneNode(true);
    photoCard.querySelector('.picture__img').src = item.url;
    photoCard.querySelector('.picture__comments').textContent = item.commentsNumber;
    photoCard.querySelector('.picture__likes').textContent = item.likes;
    fragment.appendChild(photoCard);
  });
  return picturesContainer.appendChild(fragment);
};

export {photoCardsRender};
