export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSpecial: boolean;
  excludeSimilar: boolean;
  pronounceable: boolean;
}

export interface PasswordHistory {
  password: string;
  timestamp: Date;
  strength: number;
}