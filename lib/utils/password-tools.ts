import CryptoJS from 'crypto-js';

export const verifyPasswd = (password: string, md5Passwd: string) => {
  const md5Str = CryptoJS.MD5(password).toString();
  return md5Str === md5Passwd;
};

export const generateMD5Passwd = (password: string) => {
  return CryptoJS.MD5(password).toString();
};
