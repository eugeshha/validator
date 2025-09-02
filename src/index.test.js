import { Validator } from './index.js';

describe('Validator', () => {
  let validator;

  beforeEach(() => {
    validator = new Validator();
  });

  describe('validateUsername', () => {
    test('should return true for valid usernames', () => {
      const validUsernames = [
        'my-username',
        'user_name',
        'username',
        'user-name',
        'a',
        'abc123def',
        'user-123-name',
        'user_123_name',
        'test123name',
        'a1b2c'
      ];

      validUsernames.forEach(username => {
        expect(validator.validateUsername(username)).toBe(true);
      });
    });

    test('should return false for usernames starting with numbers', () => {
      const invalidUsernames = [
        '123user',
        '1username',
        '123',
        '1a',
        '123abc'
      ];

      invalidUsernames.forEach(username => {
        expect(validator.validateUsername(username)).toBe(false);
      });
    });

    test('should return false for usernames ending with numbers', () => {
      const invalidUsernames = [
        'user123',
        'username1',
        'a1',
        'abc123'
      ];

      invalidUsernames.forEach(username => {
        expect(validator.validateUsername(username)).toBe(false);
      });
    });

    test('should return false for usernames starting with underscore', () => {
      const invalidUsernames = [
        '_user',
        '_username',
        '_',
        '_a'
      ];

      invalidUsernames.forEach(username => {
        expect(validator.validateUsername(username)).toBe(false);
      });
    });

    test('should return false for usernames ending with underscore', () => {
      const invalidUsernames = [
        'user_',
        'username_',
        'a_',
        'abc_'
      ];

      invalidUsernames.forEach(username => {
        expect(validator.validateUsername(username)).toBe(false);
      });
    });

    test('should return false for usernames starting with dash', () => {
      const invalidUsernames = [
        '-user',
        '-username',
        '-',
        '-a'
      ];

      invalidUsernames.forEach(username => {
        expect(validator.validateUsername(username)).toBe(false);
      });
    });

    test('should return false for usernames ending with dash', () => {
      const invalidUsernames = [
        'user-',
        'username-',
        'a-',
        'abc-'
      ];

      invalidUsernames.forEach(username => {
        expect(validator.validateUsername(username)).toBe(false);
      });
    });

    test('should return false for usernames with more than 3 consecutive digits', () => {
      const invalidUsernames = [
        'user1234',
        'user12345',
        '1234user',
        'user1234name',
        'a1234b',
        'user1234-',
        'user1234_',
        '1234',
        'user12345name'
      ];

      invalidUsernames.forEach(username => {
        expect(validator.validateUsername(username)).toBe(false);
      });
    });

    test('should return true for usernames with exactly 3 consecutive digits', () => {
      const validUsernames = [
        'a123b',
        'user123name',
        'test123test'
      ];

      validUsernames.forEach(username => {
        expect(validator.validateUsername(username)).toBe(true);
      });
    });

    test('should return false for usernames with invalid characters', () => {
      const invalidUsernames = [
        'user@name',
        'user.name',
        'user name',
        'user+name',
        'user*name',
        'user#name',
        'user$name',
        'user%name',
        'user^name',
        'user&name',
        'user(name)',
        'user[name]',
        'user{name}',
        'user|name',
        'user\\name',
        'user/name',
        'user:name',
        'user;name',
        'user"name"',
        "user'name'",
        'user<name>',
        'user,name',
        'user?name',
        'user!name',
        'user~name',
        'user`name`',
        'пользователь',
        '用户名',
        'ユーザー名'
      ];

      invalidUsernames.forEach(username => {
        expect(validator.validateUsername(username)).toBe(false);
      });
    });

    test('should return false for empty or invalid input', () => {
      expect(validator.validateUsername('')).toBe(false);
      expect(validator.validateUsername(null)).toBe(false);
      expect(validator.validateUsername(undefined)).toBe(false);
      expect(validator.validateUsername(123)).toBe(false);
      expect(validator.validateUsername({})).toBe(false);
      expect(validator.validateUsername([])).toBe(false);
    });

    test('should handle edge cases', () => {
      // Один символ
      expect(validator.validateUsername('a')).toBe(true);
      expect(validator.validateUsername('1')).toBe(false);
      expect(validator.validateUsername('-')).toBe(false);
      expect(validator.validateUsername('_')).toBe(false);

      // Два символа
      expect(validator.validateUsername('ab')).toBe(true);
      expect(validator.validateUsername('a1')).toBe(false); // не может заканчиваться цифрой
      expect(validator.validateUsername('1a')).toBe(false); // не может начинаться с цифры
      expect(validator.validateUsername('a-')).toBe(false);
      expect(validator.validateUsername('-a')).toBe(false);
      expect(validator.validateUsername('a_')).toBe(false);
      expect(validator.validateUsername('_a')).toBe(false);

      // Три символа
      expect(validator.validateUsername('abc')).toBe(true);
      expect(validator.validateUsername('a1b')).toBe(true);
      expect(validator.validateUsername('123')).toBe(false); // начинается с цифры
      expect(validator.validateUsername('a-1')).toBe(false); // заканчивается цифрой - невалидно
      expect(validator.validateUsername('1-a')).toBe(false); // начинается с цифры
    });

    test('should handle mixed valid and invalid characters', () => {
      expect(validator.validateUsername('user123name')).toBe(true); // тире и подчеркивание в середине - валидно
      expect(validator.validateUsername('user-name_test')).toBe(true); // тире и подчеркивание в середине - валидно  
      expect(validator.validateUsername('user_name-test')).toBe(true); // тире и подчеркивание в середине - валидно
      expect(validator.validateUsername('user-name_123')).toBe(false); // заканчивается цифрой - невалидно
      expect(validator.validateUsername('user_name-123')).toBe(false); // заканчивается цифрой - невалидно
      expect(validator.validateUsername('user123-')).toBe(false); // заканчивается тире
      expect(validator.validateUsername('user123_')).toBe(false); // заканчивается подчеркиванием
    });
  });
});
