/**
 * Класс для валидации имени пользователя
 */
export class Validator {
  /**
   * Проверяет имя пользователя на соответствие правилам
   * @param {string} username - имя пользователя для проверки
   * @returns {boolean} - true если имя валидно, false если нет
   */
  validateUsername(username) {
    // Проверяем, что строка не пустая
    if (!username || typeof username !== 'string') {
      return false;
    }

    // Регулярное выражение для проверки допустимых символов
    // Допустимы только латинские буквы, символы тире -, подчёркивания _ и цифры (0-9)
    const allowedCharsRegex = /^[a-zA-Z0-9_-]+$/;
    
    if (!allowedCharsRegex.test(username)) {
      return false;
    }

    // Проверяем, что имя не начинается с цифр, символов подчёркивания или тире
    const startRegex = /^[0-9_-]/;
    
    if (startRegex.test(username)) {
      return false;
    }

    // Проверяем, что имя не заканчивается цифрами, символами подчёркивания или тире
    const endRegex = /[0-9_-]$/;
    
    if (endRegex.test(username)) {
      return false;
    }

    // Проверяем, что не содержит подряд более трёх цифр
    const consecutiveDigitsRegex = /\d{4,}/;
    
    if (consecutiveDigitsRegex.test(username)) {
      return false;
    }

    return true;
  }
}

// Демонстрация работы класса
console.log('Validator Demo');

const validator = new Validator();

// Примеры валидных имен
const validUsernames = [
  'my-username',
  'user_name',
  'test-user_name',
  'user123name',
  'abc123def'
];

// Примеры невалидных имен
const invalidUsernames = [
  '123user',      // начинается с цифры
  'user123',      // заканчивается цифрой
  'user123-',     // заканчивается тире
  'user_',        // заканчивается подчеркиванием
  'user1234',     // более 3 цифр подряд
  'user@name',    // недопустимый символ
  'пользователь', // кириллица
  '',             // пустая строка
  '123',          // только цифры
  '-user',        // начинается с тире
  '_user'         // начинается с подчеркивания
];

console.log('Valid usernames:');
validUsernames.forEach(username => {
  console.log(`${username}: ${validator.validateUsername(username)}`);
});

console.log('\nInvalid usernames:');
invalidUsernames.forEach(username => {
  console.log(`${username}: ${validator.validateUsername(username)}`);
});
