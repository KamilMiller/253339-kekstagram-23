import { isEscEvent } from './util.js';
// import { checkHashtagValidity } from './validation.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const bodyElement = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const fileUploadControl = uploadForm.querySelector('.img-upload__input');
const imageUploadForm = uploadForm.querySelector('.img-upload__overlay');
const uploadedPicture = uploadForm.querySelector('.img-upload__preview').querySelector('img');
const closeFormButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const commentTextArea = uploadForm.querySelector('.text__description');
const effectsPreview = uploadForm.querySelectorAll('.effects__preview');
const effectNone = document.querySelector('#effect-none');

// Загрузка файла изображения
const uploadFile = () => {
  uploadedPicture.src = '';
  effectsPreview.forEach((effect) => effect.style = 'background-image: none');
  const file = fileUploadControl.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      uploadedPicture.src = reader.result;
      effectsPreview.forEach((effect) => effect.style = `background-image: url("${reader.result}")`);
    });
    reader.readAsDataURL(file);
  }
};

// Сброс фильтров при закрытии формы.
const resetEffects = () => {
  uploadedPicture.removeAttribute('class');
  uploadedPicture.style.filter = 'none';
  effectNone.checked = true;
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
  uploadForm.reset();
  document.removeEventListener('keydown', onUploadFormEscKeyDown);
};

fileUploadControl.addEventListener('change', () => {
  uploadFile();
  openUpload();
});
closeFormButton.addEventListener('click', closeUpload);

closeFormButton.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    closeUpload();
  }
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

export { uploadForm, fileUploadControl, uploadedPicture, hashtagsInput, closeUpload, resetEffects };
