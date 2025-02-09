const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const similarChars = ['1', 'l', 'I', '0', 'O'];

const consonants = 'bcdfghjklmnpqrstvwxz';
const vowels = 'aeiouy';

export const generatePassword = (options: {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSpecial: boolean;
  excludeSimilar: boolean;
  pronounceable: boolean;
}): string => {
  if (options.pronounceable) {
    return generatePronounceable(options.length);
  }

  let chars = '';
  if (options.includeUppercase) chars += uppercaseChars;
  if (options.includeLowercase) chars += lowercaseChars;
  if (options.includeNumbers) chars += numberChars;
  if (options.includeSpecial) chars += specialChars;

  if (!chars) chars = lowercaseChars; // Fallback to lowercase if nothing selected

  let password = '';
  const array = new Uint32Array(options.length);
  crypto.getRandomValues(array);

  for (let i = 0; i < options.length; i++) {
    const char = chars[array[i] % chars.length];
    if (options.excludeSimilar && similarChars.includes(char)) {
      i--; // Try again
      continue;
    }
    password += char;
  }

  return password;
};

const generatePronounceable = (length: number): string => {
  let result = '';
  let isVowel = Math.random() > 0.5;

  while (result.length < length) {
    const chars = isVowel ? vowels : consonants;
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    result += chars[array[0] % chars.length];
    isVowel = !isVowel;
  }

  return result.slice(0, length);
};

export const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  
  if (password.length >= 12) strength += 2;
  else if (password.length >= 8) strength += 1;
  
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  
  return Math.min(5, strength);
};