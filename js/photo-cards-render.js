const ALERT_SHOW_TIME = 10000;
const photoCardTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

// Сообщение об обшибке загрузки данных.
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
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

// Сборка галереи с фотографиями пользователей.
const photoCardsRender = (data) => {
  const fragment = document.createDocumentFragment();
  data.forEach((item) => {
    const photoCard = photoCardTemplate.cloneNode(true);
    photoCard.querySelector('.picture__img').src = item.url;
    photoCard.querySelector('.picture__comments').textContent = item.comments.length;
    photoCard.querySelector('.picture__likes').textContent = item.likes;
    fragment.appendChild(photoCard);
  });
  return picturesContainer.appendChild(fragment);
};

const getUsersPhotoData = (renderFunction) => {
  fetch('https://23.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photoCardsData) => {
      renderFunction(photoCardsData);
    })
    .catch(() => {
      showAlert('Не удалось загрузить фотографии пользователей :(');
    });
};

export { photoCardsRender, getUsersPhotoData };
