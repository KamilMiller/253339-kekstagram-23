// Функция получения случайных целых чисел.
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция для проверки максимальной длины строки.
const checkLength = (string, maxLength) => (string.length <= maxLength);

// Проверка нажатой клавиши.
const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export { getRandomInt, checkLength, isEscEvent };
