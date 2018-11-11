import { environment } from '../../environments/environment';

export const constants = {
  backendBaseUrl: `${environment.baseHref}/api`,
  defaultPasswordLength: 12,
  encryptionKeyProperty: 'passwd::encryption-key',
  encryptionStrategy: 'aes-256-cbc',
  lowercaseChars: 'abdefghijklmnopqrstuvwxyz',
  numberChars: '123456789',
  specialChars: '!@#$%^&*?<>{}[]().;:,~`\'"+=|\\/',
  uppercaseChars: 'ABDEFGHIJKLMNOPQRSTUVWXYZ',
};
