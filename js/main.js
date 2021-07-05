import { photoCardsRender, getUsersPhotoData } from './photo-cards-render.js';
import './image-upload.js';
import './image-resize.js';
import './effects-control.js';
import { setUserFormSubmit } from './submit-form.js';
import { closeUpload } from './image-upload.js';

// Наполнение галереи фотографиями пользователей.
getUsersPhotoData(photoCardsRender);

//Отправка формы и закрытие окна.
setUserFormSubmit(closeUpload);
