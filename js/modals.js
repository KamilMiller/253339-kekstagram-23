import { isEscEvent } from './util.js';

const successModalTemplate = document.querySelector('#success').content.querySelector('.success');
const errorModalTemplate = document.querySelector('#error').content.querySelector('.error');

// Действия с модальнфм окном
const onModalEscKeyDown = (evt) => {
  if (isEscEvent(evt)) {
    const element = document.querySelector('.modal-open');
    element.remove();
    document.removeEventListener('keydown', onModalEscKeyDown);
  }
};

const onSpaceAroundModalClick = (evt) => {
  const element = document.querySelector('.modal-open');
  if (evt.target !== element.querySelector('div')) {
    element.remove();
  }
};

const onModalButtonClick = () => {
  const element = document.querySelector('.modal-open');
  element.remove();
};

// Сборка модальных окон и установка обработчиков
const showAlert = (alert) => {
  const modalWindowElement = alert.cloneNode(true);
  modalWindowElement.classList.add('modal-open');
  document.body.appendChild(modalWindowElement);
  const buttonElement = modalWindowElement.querySelectorAll('.success__button, .error__button')[0];
  document.addEventListener('keydown', onModalEscKeyDown);
  modalWindowElement.addEventListener('click', onSpaceAroundModalClick);
  buttonElement.addEventListener('click', onModalButtonClick);
};

const successAlert = () => showAlert(successModalTemplate);
const errorAlert = () => showAlert(errorModalTemplate);

export { successAlert, errorAlert };
