import { fileUplodControl } from './image-upload.js';
import { uploadedPicture } from './image-upload.js';

const effects = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevelValue = sliderContainer.querySelector('.effect-level__value');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');
const effectList = document.querySelector('.effects__list');
const noEffect = effectList.querySelector('#effect-none');

fileUplodControl.addEventListener('change', () => {
  sliderContainer.style.display = 'none';
});

const effectChangeHandler = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    if (!evt.target.matches('#effect-none')) {
      sliderContainer.style = 'display: block';
      for (let i = 1; i < effects.length; i++) {
        if (evt.target.matches(`#effect-${effects[i]}`)) {
          uploadedPicture.removeAttribute('class');
          uploadedPicture.classList.add(`effects__preview--${effects[i]}`);
        }
      }
    } else {
      uploadedPicture.removeAttribute('class');
    }
  }
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
  effectLevelValue.value = unencoded[handle];
});

console.log(effectLevelValue.value);

effectList.addEventListener('change', effectChangeHandler);
noEffect.addEventListener('click', () => sliderContainer.style = 'display: none');
