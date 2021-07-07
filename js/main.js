import { photoCardsRender, showAlert } from './photo-cards-render.js';
import { getData } from './api.js';
import './image-upload.js';
import './image-resize.js';
import './effects-control.js';
import { setUserFormSubmit } from './submit-form.js';

// Наполнение галереи фотографиями пользователей.
getData(photoCardsRender, showAlert);

//Отправка формы и закрытие окна.
setUserFormSubmit();
