import { isEscEvent } from './util.js';

const AVATAR_WIDTH = 35;
const AVATAR_HEIGHT = 35;
const MIN_COMMENTS_DISPLAYED = 5;
const COMMENTS_INCREMENT = 5;

const bigPicturePopUp = document.querySelector('.big-picture');
const bigPictureImage = bigPicturePopUp.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicturePopUp.querySelector('.likes-count');
const commentsCount = bigPicturePopUp.querySelector('.comments-count');
const commentsList = bigPicturePopUp.querySelector('.social__comments');
const loadedCommentsCount = bigPicturePopUp.querySelector('.social__comment-count');
const commentsLoader = bigPicturePopUp.querySelector('.social__comments-loader');
const socialCaption = bigPicturePopUp.querySelector('.social__caption');
const bigPictureClose = bigPicturePopUp.querySelector('.big-picture__cancel');
const commentsDisplayed = bigPicturePopUp.querySelector('.comments-displayed');

let displayedCommentsNumber = MIN_COMMENTS_DISPLAYED;
let commentsArr = [];

const closeFullsizePopUp = () => {
  bigPicturePopUp.classList.add('hidden');
  document.body.classList.remove('modal-open');
  displayedCommentsNumber = MIN_COMMENTS_DISPLAYED;
  commentsDisplayed.textContent = '';
  loadedCommentsCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
};

const onFullSizePictureEscKeyDown = (evt) => {
  if (isEscEvent(evt)) {
    closeFullsizePopUp();
  }
};

const onFullsizeCloseButtonPress = () => {
  closeFullsizePopUp();
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
  newUser.width = AVATAR_WIDTH;
  newUser.height = AVATAR_HEIGHT;
  newComment.appendChild(newUser);

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = dataItem.message;
  newComment.appendChild(commentText);

  fragment.appendChild(newComment);

  return fragment;
};

// Изменение числа отоборажаемых комментариев
const getMoreComments = (totalCommentsNumber) => {
  if (((totalCommentsNumber + 1) - displayedCommentsNumber) > 5) {
    displayedCommentsNumber += COMMENTS_INCREMENT;
    return displayedCommentsNumber;
  } else {
    return totalCommentsNumber;
  }
};

// Создание списка комментариев
const getCommentsList = (element, displayedNumber = MIN_COMMENTS_DISPLAYED) => {
  commentsList.replaceChildren();

  const comments = element.comments.map((item) => getComment(item));
  commentsCount.textContent = element.comments.length;

  if (element.comments.length > MIN_COMMENTS_DISPLAYED) {
    commentsDisplayed.textContent = displayedNumber;
    comments.slice(0, displayedNumber).forEach((item) => commentsList.appendChild(item));

  } else {
    commentsDisplayed.textContent = element.comments.length;
    comments.forEach((item) => commentsList.appendChild(item));
    loadedCommentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  }

  return commentsArr = comments;
};

// Демонстрация полноразмерного фото
const openFullSizePhoto = (element) => {
  bigPicturePopUp.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureImage.src = element.url;
  likesCount.textContent = element.likes;
  socialCaption.textContent = element.description;

  bigPictureClose.addEventListener('click', onFullsizeCloseButtonPress);
  document.addEventListener('keydown', onFullSizePictureEscKeyDown);
};

commentsLoader.addEventListener('click', () => {
  const currentDisplayedComments = getMoreComments(commentsArr.length);
  commentsDisplayed.textContent = currentDisplayedComments;
  commentsArr.slice(0, currentDisplayedComments).forEach((item) => commentsList.appendChild(item));
  if (currentDisplayedComments === commentsArr.length) {
    commentsLoader.classList.add('hidden');
  }
});

export { getCommentsList, openFullSizePhoto };
