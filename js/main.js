// Константы.
const PHOTO_CARDS_QUATITY = 25;

// Массив реплик комментариев.
const COMMENT_TEXTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Как можно было поймать такой неудачный момент?!',
];

// Массив имен авторов комментариев.
const COMMENTATEURS = ['Charm', 'Strange', 'Muon', 'Tau', 'Gluon', 'Higgs'];

// Функция получения случайных целых чисел.
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для проверки максимальной длины строки.
// function checkLength(stroke, maxLength) {
//   return (stroke.length <= maxLength);
// }

// Изъятие элементов из массива в случайном порядке.
function getRandomElement(arr) {
  const elementIndex = getRandomInt(0, arr.length - 1);
  const randomElement = arr[elementIndex];
  arr.splice(elementIndex, 1);
  return randomElement;
}

// Функция создания массива комментариев.
function commentsAssembling(commentQuantity) {
  const commentsCache = [];
  const commentTextsCopy = COMMENT_TEXTS.slice();
  const commentateursCopy = COMMENTATEURS.slice();
  for (let index = 0; index < commentQuantity; index++) {
    commentsCache.push({
      id: index + 1,
      avatar: `img/avatar-${getRandomInt(0, 5)}.svg`,
      message: getRandomElement(commentTextsCopy),
      name: getRandomElement(commentateursCopy),
    });
  }
  return commentsCache;
}

// Функция сборки [карточки] фотогрфии с данными.
function picDataСollecting(dataQuantity) {
  const userPictures = [];
  for (let index = 1; index <= dataQuantity; index++) {
    const comments = commentsAssembling(getRandomInt(1, 6));
    userPictures.push({
      id: index,
      url: `photos/${index}.jpg`,
      description: 'Это фотография.',
      likes: getRandomInt(5, 200),
      comments: comments,
      commentsNumber: comments.length,
    });
  }
  return userPictures;
}

// checkLength();
picDataСollecting(PHOTO_CARDS_QUATITY);
