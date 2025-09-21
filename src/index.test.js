import { Validator } from './index.js';

describe('Validator', () => {
  let validator;

  beforeEach(() => {
    validator = new Validator();
  });

  describe('validateUsername', () => {
    test.each([
      'my-username',
      'user_name',
      'username',
      'user-name',
      'a',
      'abc123def',
      'user-123-name',
      'user_123_name',
      'test123name',
      'a1b2c',
      'a123b',
      'user123name',
      'test123test',
      'user123name',
      'user-name_test',
      'user_name-test'
    ])('should return true for valid username: %s', (username) => {
      expect(validator.validateUsername(username)).toBe(true);
    });

    test.each([
      ['123user', 'starting with number'],
      ['1username', 'starting with number'],
      ['123', 'starting with number'],
      ['1a', 'starting with number'],
      ['123abc', 'starting with number'],
      ['user123', 'ending with number'],
      ['username1', 'ending with number'],
      ['a1', 'ending with number'],
      ['abc123', 'ending with number'],
      ['_user', 'starting with underscore'],
      ['_username', 'starting with underscore'],
      ['_', 'starting with underscore'],
      ['_a', 'starting with underscore'],
      ['user_', 'ending with underscore'],
      ['username_', 'ending with underscore'],
      ['a_', 'ending with underscore'],
      ['abc_', 'ending with underscore'],
      ['-user', 'starting with dash'],
      ['-username', 'starting with dash'],
      ['-', 'starting with dash'],
      ['-a', 'starting with dash'],
      ['user-', 'ending with dash'],
      ['username-', 'ending with dash'],
      ['a-', 'ending with dash'],
      ['abc-', 'ending with dash'],
      ['user1234', 'more than 3 consecutive digits'],
      ['user12345', 'more than 3 consecutive digits'],
      ['1234user', 'more than 3 consecutive digits'],
      ['user1234name', 'more than 3 consecutive digits'],
      ['a1234b', 'more than 3 consecutive digits'],
      ['user1234-', 'more than 3 consecutive digits'],
      ['user1234_', 'more than 3 consecutive digits'],
      ['1234', 'more than 3 consecutive digits'],
      ['user12345name', 'more than 3 consecutive digits'],
      ['user@name', 'invalid characters'],
      ['user.name', 'invalid characters'],
      ['user name', 'invalid characters'],
      ['user+name', 'invalid characters'],
      ['user*name', 'invalid characters'],
      ['user#name', 'invalid characters'],
      ['user$name', 'invalid characters'],
      ['user%name', 'invalid characters'],
      ['user^name', 'invalid characters'],
      ['user&name', 'invalid characters'],
      ['user(name)', 'invalid characters'],
      ['user[name]', 'invalid characters'],
      ['user{name}', 'invalid characters'],
      ['user|name', 'invalid characters'],
      ['user\\name', 'invalid characters'],
      ['user/name', 'invalid characters'],
      ['user:name', 'invalid characters'],
      ['user;name', 'invalid characters'],
      ['user"name"', 'invalid characters'],
      ["user'name'", 'invalid characters'],
      ['user<name>', 'invalid characters'],
      ['user,name', 'invalid characters'],
      ['user?name', 'invalid characters'],
      ['user!name', 'invalid characters'],
      ['user~name', 'invalid characters'],
      ['user`name`', 'invalid characters'],
      ['пользователь', 'invalid characters'],
      ['用户名', 'invalid characters'],
      ['ユーザー名', 'invalid characters'],
      ['user-name_123', 'ending with number'],
      ['user_name-123', 'ending with number'],
      ['user123-', 'ending with dash'],
      ['user123_', 'ending with underscore']
    ])('should return false for username: %s (%s)', (username) => {
      expect(validator.validateUsername(username)).toBe(false);
    });

    test.each([
      ['', 'empty string'],
      [null, 'null'],
      [undefined, 'undefined'],
      [123, 'number'],
      [{}, 'object'],
      [[], 'array']
    ])('should return false for invalid input: %s (%s)', (input) => {
      expect(validator.validateUsername(input)).toBe(false);
    });

    test('should handle edge cases', () => {
      expect(validator.validateUsername('a')).toBe(true);
      expect(validator.validateUsername('1')).toBe(false);
      expect(validator.validateUsername('-')).toBe(false);
      expect(validator.validateUsername('_')).toBe(false);
      expect(validator.validateUsername('ab')).toBe(true);
      expect(validator.validateUsername('a1')).toBe(false);
      expect(validator.validateUsername('1a')).toBe(false);
      expect(validator.validateUsername('a-')).toBe(false);
      expect(validator.validateUsername('-a')).toBe(false);
      expect(validator.validateUsername('a_')).toBe(false);
      expect(validator.validateUsername('_a')).toBe(false);
      expect(validator.validateUsername('abc')).toBe(true);
      expect(validator.validateUsername('a1b')).toBe(true);
      expect(validator.validateUsername('123')).toBe(false);
      expect(validator.validateUsername('a-1')).toBe(false);
      expect(validator.validateUsername('1-a')).toBe(false);
    });
  });
});
