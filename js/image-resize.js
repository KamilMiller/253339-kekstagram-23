import { fileUploadControl } from './image-upload.js';
import { uploadedPicture } from './image-upload.js';

let scaleIndex = 1;
const RESIZE_SCALE_INCREMENT = 0.25;
const MAX_SCALE = 1;
const MIN_SCALE = 0.25;
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleDicrections = {
  up: 1,
  down: -1,
};

// Функция сброса размера изображения до начального значения.
const resetPictureSize = () => {
  scaleIndex = 1;
  uploadedPicture.style.transform = `scale(${scaleIndex})`;
  scaleControlValue.value = `${scaleIndex * 100}%`;
};

// Изменение размера загрженного изображения.
const changeScale = (direction) => {
  if (direction === scaleDicrections.up && scaleIndex < MAX_SCALE
    || direction === scaleDicrections.down && scaleIndex > MIN_SCALE) {
    scaleIndex += RESIZE_SCALE_INCREMENT * direction;
    uploadedPicture.style.transform = `scale(${scaleIndex})`;
    scaleControlValue.value = `${scaleIndex * 100}%`;
  }
};

scaleControlSmaller.addEventListener('click', () => {
  changeScale(scaleDicrections.down);
});
scaleControlBigger.addEventListener('click', () => {
  changeScale(scaleDicrections.up);
});
fileUploadControl.addEventListener('change', resetPictureSize);
