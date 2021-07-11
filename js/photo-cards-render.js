import { getData } from './api.js';
import { filtersBox } from './filter.js';

const ALERT_SHOW_TIME = 20000;
const photoCardTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

// Сообщение об обшибке загрузки данных.
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Сборка фрагмента с карточками.
const setPhotoCard = (fragment, element) => {
  const photoCard = photoCardTemplate.cloneNode(true);
  photoCard.querySelector('.picture__img').src = element.url;
  photoCard.querySelector('.picture__comments').textContent = element.comments.length;
  photoCard.querySelector('.picture__likes').textContent = element.likes;
  fragment.appendChild(photoCard);
};

// Сборка галереи с фотографиями пользователей.
const photoCardsRender = (data) => {
  const fragment = document.createDocumentFragment();
  data.forEach((item) => {
    setPhotoCard(fragment, item);
  });
  filtersBox.classList.remove('img-filters--inactive');
  document.querySelectorAll('.picture').forEach((element) => element.remove());
  return picturesContainer.appendChild(fragment);
};

const dataPromise = getData(showAlert);
dataPromise.then(photoCardsRender);

export { photoCardsRender, dataPromise };
