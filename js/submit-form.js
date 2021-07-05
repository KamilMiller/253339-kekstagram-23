import { uploadForm } from './image-upload.js';
import { successUploadAlert, errorUploadAlert } from './modals-control.js';

// Закрытие формы при успешной отправке данных.
const setUserFormSubmit = (closeForm) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    fetch(
      'https://23.javascript.pages.academy/kekstagra',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          closeForm();
          successUploadAlert();
        } else {
          closeForm();
          errorUploadAlert();
        }
      })
      .catch(() => {
        closeForm();
        errorUploadAlert();
      });
  });
};

export { setUserFormSubmit };
