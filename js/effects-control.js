import { fileUploadControl } from './image-upload.js';
import { uploadedPicture } from './image-upload.js';
import { resetEffects } from './image-upload.js';

const effectsData = {
  chrome: {
    property: 'grayscale',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1,
    },
  },
  sepia: {
    property: 'sepia',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1,
    },
  },
  marvin: {
    property: 'invert',
    unit: '%',
    options: {
      range: {
        min: 1,
        max: 100,
      },
      step: 1,
      start: 100,
    },
  },
  phobos: {
    property: 'blur',
    unit: 'px',
    options: {
      range: {
        min: 1,
        max: 3,
      },
      step: 0.1,
      start: 3,
    },
  },
  heat: {
    property: 'brightness',
    unit: '',
    options: {
      range: {
        min: 1,
        max: 3,
      },
      step: 0.1,
      start: 3,
    },
  },
};
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevelValue = sliderContainer.querySelector('.effect-level__value');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');
const effectList = document.querySelector('.effects__list');
const noEffect = effectList.querySelector('#effect-none');

// Функция переключения фильтров.
const effectChangeHandler = (evt) => {
  if (!evt.target.matches('#effect-none')) {
    sliderContainer.style.display = 'block';
    for (const effect in effectsData) {
      if (evt.target.matches(`#effect-${effect}`)) {
        uploadedPicture.removeAttribute('class');
        uploadedPicture.classList.add(`effects__preview--${effect}`);
        break;
      }
    }
  } else {
    resetEffects();
  }
};

fileUploadControl.addEventListener('change', () => {
  sliderContainer.style.display = 'none';
});
effectList.addEventListener('change', effectChangeHandler);
noEffect.addEventListener('click', () => sliderContainer.style = 'display: none');

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
const changeFiltersSetup = (filter, arr) => {
  for (const element in arr) {
    if (filter.target.matches(`#effect-${element}`)) {
      sliderElement.noUiSlider.updateOptions(arr[element].options);
      break;
    }
  }
};

// Функция регулировки фильтра.
const getEffectsLevel = (arr, value) => {
  for (const element in arr) {
    if (effectList.querySelector(`#effect-${element}`).checked) {
      uploadedPicture.style.filter = `${arr[element].property}(${value}${arr[element].unit})`;
      break;
    }
  }
};

effectList.addEventListener('change', (evt) => changeFiltersSetup(evt, effectsData));
getEffectsLevel(effectsData, effectLevelValue.value);
sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
  effectLevelValue.value = unencoded[handle];
});
