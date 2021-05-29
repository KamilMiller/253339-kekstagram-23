// Функция получения случайных целых чисел.
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для проверки максимальной длины строки.
function checkLength(stroke, maxLength) {
  return (stroke.length <= maxLength);
}

getRandomInt();
checkLength();
