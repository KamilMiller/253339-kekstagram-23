import { fileUplodControl } from './image-upload.js';
import { uploadedPicture } from './image-upload.js';
import { resetEffects } from './image-upload.js';

const effectsData = [
  {
    name: 'none',
    property: 'none',
  },
  {
    name: 'chrome',
    property: 'grayscale',
    unit: '',
  },
  {
    name: 'sepia',
    property: 'sepia',
    unit: '',
  },
  {
    name: 'marvin',
    property: 'invert',
    unit: '%',
  },
  {
    name: 'phobos',
    property: 'blur',
    unit: 'px',
  },
  {
    name: 'heat',
    property: 'brightness',
    unit: '',
  },
];
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevelValue = sliderContainer.querySelector('.effect-level__value');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');
const effectList = document.querySelector('.effects__list');
const noEffect = effectList.querySelector('#effect-none');

// Функция переключения фильтров.
const effectChangeHandler = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    if (!evt.target.matches('#effect-none')) {
      sliderContainer.style = 'display: block';
      for (let i = 1; i < effectsData.length; i++) {
        if (evt.target.matches(`#effect-${effectsData[i].name}`)) {
          uploadedPicture.removeAttribute('class');
          uploadedPicture.classList.add(`effects__preview--${effectsData[i]}`);
        }
      }
    } else {
      resetEffects();
    }
  }
};

// Инициализация слайдера.
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => parseFloat(value),
  },
});

// Функция изменения настроек слайдера для фильтров.
const changeFiltersSetup = (filter) => {
  if (filter.target.matches('#effect-chrome') || (filter.target.matches('#effect-sepia'))) {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
    });
    sliderElement.noUiSlider.set(1);
  } else if (filter.target.matches('#effect-marvin')) {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 100,
      },
      step: 1,
    });
    sliderElement.noUiSlider.set(100);
  } else if (filter.target.matches('#effect-phobos')) {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      step: 0.1,
    });
    sliderElement.noUiSlider.set(3);
  } else if (filter.target.matches('#effect-heat')) {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      step: 0.1,
    });
    sliderElement.noUiSlider.set(3);
  }
};

// Функция регулировки фильтра.
const getEffectsLevel = (arr, value) => {
  for (let i = 1; i < arr.length; i++) {
    if (effectList.querySelector(`#effect-${arr[i].name}`).checked) {
      uploadedPicture.style.filter = `${arr[i].property}(${value}${arr[i].unit})`;
    }
  }
};

fileUplodControl.addEventListener('change', () => {
  sliderContainer.style.display = 'none';
});
effectList.addEventListener('change', effectChangeHandler);
effectList.addEventListener('change', (evt) => changeFiltersSetup(evt));
sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
  effectLevelValue.value = unencoded[handle];
  getEffectsLevel(effectsData, effectLevelValue.value);
});
noEffect.addEventListener('click', () => sliderContainer.style = 'display: none');
