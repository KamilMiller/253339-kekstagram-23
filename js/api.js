import { closeUpload } from './image-upload.js';

const DATA_REQUEST_URL = 'https://23.javascript.pages.academy/kekstagram/data';
const DATA_SUBMIT_URL = 'https://23.javascript.pages.academy/kekstagram';

// Получение данных с сервера
const getData = (onError) => fetch(DATA_REQUEST_URL)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Не удалось загрузить фотографии пользователей :( Код ошибки: ${response.status_code}`);
  })
  .then((json) => json)
  .catch(() => {
    onError('Не удалось загрузить фотографии пользователей :(');
  });

// Отправка данных на сервер
const sendData = (data, onSuccess, onError) => {
  fetch(
    DATA_SUBMIT_URL,
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => {
      if (response.ok) {
        closeUpload();
        onSuccess();
      } else {
        closeUpload();
        onError();
      }
    })
    .catch(() => {
      closeUpload();
      onError();
    });
};

export { getData, sendData };
