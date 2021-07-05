import './modals.js';
import { isEscEvent } from './util.js';

const successAlert = document.querySelector('.success');
const successAlertButton = successAlert.querySelector('.success__button');
const errorAlert = document.querySelector('.error');
const errorAlertButton = errorAlert.querySelector('.error__button');

const onSuccessEscKeyDown = (evt) => {
  if (isEscEvent(evt)) {
    successAlert.style.display = 'none';
  }
};

const onErrorEscKeyDown = (evt) => {
  if (isEscEvent(evt)) {
    errorAlert.style.display = 'none';
  }
};

const onSpaceAroundSuccessClick = (evt) => {
  if (evt.target !== successAlert.querySelector('.success__inner')) {
    successAlert.style.display = 'none';
  }
};

const onSpaceAroundErrorClick = (evt) => {
  if (evt.target !== errorAlert.querySelector('.error__inner')) {
    errorAlert.style.display = 'none';
  }
};

const onSuccessButtonClick = () => {
  successAlert.style.display = 'none';
};

const onErrorButtonClick = () => {
  errorAlert.style.display = 'none';
};

const successUploadAlert = () => {
  successAlert.style.display = 'flex';
  // Обработчик №1:
  successAlertButton.addEventListener('click', onSuccessButtonClick);
  // Обработчик №2:
  successAlert.addEventListener('click', (evt) => {
    onSpaceAroundSuccessClick(evt);
  });
  // Обработчик №3:
  document.addEventListener('keydown', (evt) => {
    onSuccessEscKeyDown(evt);
  });
};

const errorUploadAlert = () => {
  errorAlert.style.display = 'flex';
  // Обработчик №1:
  errorAlertButton.addEventListener('click', onErrorButtonClick);
  // Обработчик №2:
  errorAlert.addEventListener('click', (evt) => {
    onSpaceAroundErrorClick(evt);
  });
  // Обработчик №3:
  document.addEventListener('keydown', (evt) => {
    onErrorEscKeyDown(evt);
  });
};

export { successUploadAlert, errorUploadAlert };
