export class Validator {
  validateUsername(username) {
    if (!username || typeof username !== 'string') {
      return false;
    }

    const allowedCharsRegex = /^[a-zA-Z0-9_-]+$/;
    
    if (!allowedCharsRegex.test(username)) {
      return false;
    }

    const startRegex = /^[0-9_-]/;
    
    if (startRegex.test(username)) {
      return false;
    }

    const endRegex = /[0-9_-]$/;
    
    if (endRegex.test(username)) {
      return false;
    }

    const consecutiveDigitsRegex = /\d{4,}/;
    
    if (consecutiveDigitsRegex.test(username)) {
      return false;
    }

    return true;
  }
}

console.log('Validator Demo');

const validator = new Validator();

const validUsernames = [
  'my-username',
  'user_name',
  'test-user_name',
  'user123name',
  'abc123def'
];

const invalidUsernames = [
  '123user',
  'user123',
  'user123-',
  'user_',
  'user1234',
  'user@name',
  'пользователь',
  '',
  '123',
  '-user',
  '_user'
];

console.log('Valid usernames:');
validUsernames.forEach(username => {
  console.log(`${username}: ${validator.validateUsername(username)}`);
});

console.log('\nInvalid usernames:');
invalidUsernames.forEach(username => {
  console.log(`${username}: ${validator.validateUsername(username)}`);
});
