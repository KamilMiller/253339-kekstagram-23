// Проверка нажатой клавиши.
const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

// Функция получения случайных целых чисел.
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Извлечение элементов из массива в случайном порядке.
const getRandomElement = (arr) => {
  const elementIndex = getRandomInt(0, arr.length - 1);
  const randomElement = arr[elementIndex];
  arr.splice(elementIndex, 1);
  return randomElement;
};

export { getRandomElement, isEscEvent };
