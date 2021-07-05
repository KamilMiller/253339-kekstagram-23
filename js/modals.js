const successModalTemplate = document.querySelector('#success').content.querySelector('.success');
const errorModalTemplate = document.querySelector('#error').content.querySelector('.error');

// Отрисовка окна с сообщением об успешной отправке фотографии.
const setSuccessModal = (modal) => {
  const fragment = document.createDocumentFragment();
  const modalSample = modal.cloneNode(true);
  modalSample.style.display = 'none';
  fragment.appendChild(modalSample);
  return document.body.appendChild(fragment);
};

setSuccessModal(successModalTemplate);
setSuccessModal(errorModalTemplate);
