import { fileUplodControl } from './image-upload.js';
import { uploadedPicture } from './image-upload.js';
import { resetEffects } from './image-upload.js';

const effectsData = [
  // {
  //   id: 'none',
  //   property: 'none',
  // },
  {
    chrome: {
      id: 'chrome',
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
  },
  {
    sepia: {
      id: 'sepia',
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
  },
  {
    marvin: {
      id: 'marvin',
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
  },
  {
    phobos: {
      id: 'phobos',
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
  },
  {
    heat: {
      id: 'heat',
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
      for (const effect of effectsData) {
        // Ниже в строке нужно добавить свойство 'id' в строку. Я не могу сформулировать эту задачу для цикла.
        if (evt.target.matches(`#effect-${effect.id}`)) {
          uploadedPicture.removeAttribute('class');
          // Та же проблема:
          uploadedPicture.classList.add(`effects__preview--${effect.id}`);
          break;
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
const changeFiltersSetup = (filter, arr) => {
  for (const element of arr) {
    // Та же история. Элементы массива effectsData -- это объекты с разными ключами, свойствами которых также является объект.
    // Поскольку ключи разные, как сформулировать задачу для цикла, чтобы он прошел по всем объектам массива, и извлек свойства 'id' и 'options' из вложенных объектов?:
    if (filter.target.matches(`#effect-${element.id}`)) {
      sliderElement.noUiSlider.updateOptions(element.options);
      break;
    }
  }
};

// Функция регулировки фильтра.
const getEffectsLevel = (arr, value) => {
  for (const element of arr) {
    // Здесь то же самое:
    if (effectList.querySelector(`#effect-${element.id}`).checked) {
      uploadedPicture.style.filter = `${element.property}(${value}${element.unit})`;
      break;
    }
  }
};

fileUplodControl.addEventListener('change', () => {
  sliderContainer.style.display = 'none';
});
effectList.addEventListener('change', effectChangeHandler);
effectList.addEventListener('change', (evt) => changeFiltersSetup(evt, effectsData));
sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
  effectLevelValue.value = unencoded[handle];
  getEffectsLevel(effectsData, effectLevelValue.value);
});
noEffect.addEventListener('click', () => sliderContainer.style = 'display: none');
