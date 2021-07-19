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
  const target = evt.target;
  const element = document.querySelector('.modal-open');
  if (!target.closest('.success__inner') && !target.closest('.error__inner')) {
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

const showSuccessAlert = () => showAlert(successModalTemplate);
const showErrorAlert = () => showAlert(errorModalTemplate);

export { showSuccessAlert, showErrorAlert };
