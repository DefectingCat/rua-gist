import rsa from 'jsrsasign';
import 'dotenv/config';
import { MAX_AGE } from 'lib/constents';

export const generateJWT = (data: unknown) => {
  const key = process.env.JWT_KEY;
  if (!key) throw new Error('Key not exist!');

  const current = rsa.KJUR.jws.IntDate.get('now');
  const expireOneMinute = current + MAX_AGE;
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    iat: current,
    nbf: current,
    exp: expireOneMinute,
    data,
  };
  const signature = rsa.KJUR.jws.JWS.sign(
    'HS256',
    JSON.stringify(header),
    JSON.stringify(payload),
    process.env.JWT_KEY
  );

  return signature;
};

export const decodeJWT = (jwt: string) => {
  const key = process.env.JWT_KEY;
  if (!key) throw new Error('Key not exist!');

  // const isValid = rsa.KJUR.jws.JWS.verifyJWT(jwt, key);
  // if (!isValid) throw new Error('It is not valid token!');

  const headerObj = rsa.KJUR.jws.JWS.readSafeJSONString(
    rsa.b64utoutf8(jwt.split('.')[0])
  );
  const payloadObj = rsa.KJUR.jws.JWS.readSafeJSONString(
    rsa.b64utoutf8(jwt.split('.')[1])
  );

  return {
    headerObj,
    payloadObj,
  };
};
