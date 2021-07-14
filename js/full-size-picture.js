import { isEscEvent } from './util.js';

const bigPicturePopUp = document.querySelector('.big-picture');
const bigPictureImage = bigPicturePopUp.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicturePopUp.querySelector('.likes-count');
const commentsCount = bigPicturePopUp.querySelector('.comments-count');
const commentsList = bigPicturePopUp.querySelector('.social__comments');
const loadedCommentsCount = bigPicturePopUp.querySelector('.social__comment-count');
const commentsLoader = bigPicturePopUp.querySelector('.social__comments-loader');
const socialCaption = bigPicturePopUp.querySelector('.social__caption');
const bigPictureClose = bigPicturePopUp.querySelector('.big-picture__cancel');

const onFullSizePictureEscKeyDown = (evt) => {
  if (isEscEvent(evt)) {
    bigPicturePopUp.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

const closeBigPicturePopUp = () => {
  bigPicturePopUp.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onFullSizePictureEscKeyDown);
};

// Сборка комментария к полноразмерной фотографии
const getComment = (dataItem) => {
  const fragment = document.createDocumentFragment();

  const newComment = document.createElement('li');
  newComment.classList.add('social__comment');

  const newUser = document.createElement('img');
  newUser.classList.add('social__picture');
  newUser.src = dataItem.avatar;
  newUser.alt = dataItem.name;
  newUser.width = 35;
  newUser.height = 35;
  newComment.appendChild(newUser);

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = dataItem.message;
  newComment.appendChild(commentText);

  fragment.appendChild(newComment);
  commentsList.appendChild(fragment);
};

// Создание списка комментариев
const getCommentsList = (element) => {
  commentsList.replaceChildren();
  element.comments.forEach((item) => getComment(item));

  //Временно:
  loadedCommentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

// Демонстрация полноразмерного фото
const openFullSizePhoto = (element) => {
  bigPicturePopUp.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureImage.src = element.url;
  likesCount.textContent = element.likes;
  commentsCount.textContent = element.comments.length;
  socialCaption.textContent = element.description;

  bigPictureClose.addEventListener('click', closeBigPicturePopUp);
  document.addEventListener('keydown', onFullSizePictureEscKeyDown);
};

export { getCommentsList, openFullSizePhoto };
