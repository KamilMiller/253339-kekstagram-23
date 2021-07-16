import { uploadForm } from './upload-form.js';
import { successAlert, errorAlert } from './modals.js';
import { sendData } from './api.js';

// Закрытие формы при успешной отправке данных.
const setUserFormSubmit = () => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendData(formData, successAlert, errorAlert);
  });
};

export { setUserFormSubmit };
