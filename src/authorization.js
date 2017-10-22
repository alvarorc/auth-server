import expressJWT from 'express-jwt';
import jwt from 'jsonwebtoken';
import config from 'config';

const SECRET = config.get('secret') || 'secret';
const PRE_TYPE = config.get('pretype');

export const signtoken = data => jwt.sign(
  data,
  SECRET,
  { expiresIn: '1h' },
);

export const decodetoken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (e) {
    return null;
  }
};

export default expressJWT({
  secret: SECRET,
  credentialsRequired: false,
  getToken: function fromHeaderOrQuerystring(req) {
    const authorization = (req.headers.authorization) ? req.headers.authorization.split(' ') : null;
    if (authorization && authorization[0] === PRE_TYPE) {
      req.user = decodetoken(authorization[1]);
      return authorization[1];
    } else if (req.query && req.query.token) {
      req.user = decodetoken(req.query.token);
      return req.query.token;
    }
    return null;
  },
});
