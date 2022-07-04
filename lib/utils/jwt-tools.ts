import rsa from 'jsrsasign';
import 'dotenv/config';

export const generateJwt = (data: unknown) => {
  const current = rsa.KJUR.jws.IntDate.get('now');
  const expireOneMinute = current + 86400;
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
