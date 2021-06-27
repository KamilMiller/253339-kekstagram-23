import { fileUplodControl } from './image-upload.js';
import { uploadedPicture } from './image-upload.js';

const RESIZE_SCALE_INCREMENT = 0.25;
let scaleIndex = 1;
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
// const uploadedPicture = document.querySelector('.img-upload__preview').querySelector('img');

// Уменьшение загруженного изображения
scaleControlSmaller.addEventListener('click', () => {
  if (scaleIndex > RESIZE_SCALE_INCREMENT) {
    scaleIndex -= RESIZE_SCALE_INCREMENT;
    uploadedPicture.style.transform = `scale(${scaleIndex})`;
    scaleControlValue.value = `${scaleIndex * 100}%`;
  }
});

// Увеличение загруженного изображения
scaleControlBigger.addEventListener('click', () => {
  if (scaleIndex < 1) {
    scaleIndex += RESIZE_SCALE_INCREMENT;
    uploadedPicture.style.transform = `scale(${scaleIndex})`;
    scaleControlValue.value = `${scaleIndex * 100}%`;
  }
});

// Сброс параметров величины загруженного изображения
fileUplodControl.addEventListener('change', () => {
  scaleIndex = 1;
  uploadedPicture.style.transform = `scale(${scaleIndex})`;
  scaleControlValue.value = `${scaleIndex * 100}%`;
});
