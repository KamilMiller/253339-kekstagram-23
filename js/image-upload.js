import { isEscEvent } from './util.js';
import { checkHashtagValidity } from './validation.js';

const bodyElement = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const fileUplodControl = uploadForm.querySelector('.img-upload__input');
const imageUploadForm = uploadForm.querySelector('.img-upload__overlay');
const uploadedPicture = uploadForm.querySelector('.img-upload__preview').querySelector('img');
const closeFormButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const commentTextArea = uploadForm.querySelector('.text__description');

// Сброс фильтров при закрытии формы.
const resetEffects = () => {
  uploadedPicture.removeAttribute('class');
  uploadedPicture.style.filter = 'none';
};

// Открытие и закрытие формы.
const onUploadFormEscKeyDown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    imageUploadForm.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
    resetEffects();
    uploadForm.reset();
  }
};

const openUpload = () => {
  imageUploadForm.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onUploadFormEscKeyDown);
};

const closeUpload = () => {
  imageUploadForm.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  resetEffects();
  document.removeEventListener('keydown', onUploadFormEscKeyDown);
};

fileUplodControl.addEventListener('change', openUpload);
closeFormButton.addEventListener('click', closeUpload);

closeFormButton.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    closeUpload();
  }
});

// Валидация хэштэгов.
hashtagsInput.addEventListener('input', () => {
  checkHashtagValidity(hashtagsInput);
});

// Блокировка закртытия окна при активных строках ввода хэштэгов и комментариев.
hashtagsInput.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
});

commentTextArea.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
});

export { fileUplodControl, uploadedPicture, resetEffects };
