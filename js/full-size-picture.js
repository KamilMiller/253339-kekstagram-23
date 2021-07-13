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

// Создание списка комментариев
const getCommentsList = (dataArr, id) => {
  commentsList.replaceChildren();

  for(let i = 0; i < dataArr[id].comments.length; i++) {
    const newComment = document.createElement('li');
    commentsList.appendChild(newComment);
    newComment.classList.add('social__comment');

    const newUser = document.createElement('img');
    newComment.appendChild(newUser);
    newUser.classList.add('social__picture');
    newUser.src = dataArr[id].comments[i].avatar;
    newUser.alt = dataArr[id].comments[i].name;
    newUser.width = '35';
    newUser.height = '35';

    const commentText = document.createElement('p');
    newComment.appendChild(commentText);
    commentText.classList.add('social__text');
    commentText.textContent = dataArr[id].comments[i].message;
  }

  //Временно:
  loadedCommentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

// Демонстрация полноразмерного фото
const openFullSizePhoto = (dataArr, id) => {
  bigPicturePopUp.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureImage.src = dataArr[id].url;
  likesCount.textContent = dataArr[id].likes;
  commentsCount.textContent = dataArr[id].comments.length;
  socialCaption.textContent = dataArr[id].description;

  bigPictureClose.addEventListener('click', closeBigPicturePopUp);
  document.addEventListener('keydown', onFullSizePictureEscKeyDown);
};

export { getCommentsList, openFullSizePhoto };
