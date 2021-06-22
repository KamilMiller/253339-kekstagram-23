import { getRandomInt } from './util.js';

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

const getRandomElement = (arr) => {
  const elementIndex = getRandomInt(0, arr.length - 1);
  const randomElement = arr[elementIndex];
  arr.splice(elementIndex, 1);
  return randomElement;
};

// Функция создания массива комментариев.
const commentsAssembling = (commentQuantity) => {
  const commentsCache = [];
  const commentTextsCopy = COMMENT_TEXTS.slice();
  const commentateursCopy = COMMENTATEURS.slice();
  for (let i = 0; i < commentQuantity; i++) {
    commentsCache.push({
      id: i + 1,
      avatar: `img/avatar-${getRandomInt(0, 5)}.svg`,
      message: getRandomElement(commentTextsCopy),
      name: getRandomElement(commentateursCopy),
    });
  }
  return commentsCache;
};

// Функция сборки [карточки] фотогрфии с данными.
const picDataСollecting = (dataQuantity) => {
  const userPictures = [];
  for (let i = 1; i <= dataQuantity; i++) {
    const comments = commentsAssembling(getRandomInt(1, 6));
    userPictures.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: 'Это фотография.',
      likes: getRandomInt(5, 200),
      comments: comments,
      commentsNumber: comments.length,
    });
  }
  return userPictures;
};

export { picDataСollecting };
