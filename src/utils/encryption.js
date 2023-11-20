import { config } from '../config';

const CryptoJS = require('crypto-js');

class Encryption {
  decrypt = (cipherText, type = 'object') => {
    const { AES_SECRET_KEY } = config;

    const bytes = CryptoJS.AES.decrypt(cipherText, AES_SECRET_KEY);

    let originalText = '';

    if (type === 'string') {
      originalText = bytes.toString(CryptoJS.enc.Utf8);
    } else {
      originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

    return originalText;
  };

  encrypt = (plainData) => {
    const { AES_SECRET_KEY } = config;

    let encryptedText = '';

    let tempPlainData = '';

    if (typeof plainData === 'string') {
      tempPlainData = plainData;
    } else {
      tempPlainData = JSON.stringify(plainData);
    }

    encryptedText = CryptoJS.AES.encrypt(
      tempPlainData,
      AES_SECRET_KEY
    ).toString();

    return encryptedText;
  };
}

export default new Encryption();
