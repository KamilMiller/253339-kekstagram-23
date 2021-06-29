// Константы.
const HASHTAGS_LIMIT = 5;

// Валидация хэштэгов.
const checkHashtagValidity = (inputElement) => {
  const hashtagArr = inputElement.value.replace(/ +/g, ' ').trim().toLowerCase().split(' ');
  hashtagArr.forEach((item) => {
    const re = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
    if (hashtagArr.length > HASHTAGS_LIMIT) {
      inputElement.setCustomValidity('Максимум 5 хэштэгов');
    } else if (item === '#') {
      inputElement.setCustomValidity('Хештэг не может состоять только из одной решётки');
    } else if (item[0] !== '#') {
      inputElement.setCustomValidity('Хэтэги должны начинаться с символа "#"');
    } else if (!re.test(item)) {
      inputElement.setCustomValidity('Максимум 20 символов: одна "#", кириллические и латинские буквы, цифры 0-9');
    } else if (hashtagArr.indexOf(item) !== hashtagArr.lastIndexOf(item)) {
      inputElement.setCustomValidity('Хэштэги не должны повторяться (регистр не учитывается)');
    } else {
      inputElement.setCustomValidity('');
    }
  });
  inputElement.reportValidity();
};

export { checkHashtagValidity };
