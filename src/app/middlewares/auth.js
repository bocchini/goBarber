import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const autHeader = req.headers.authorization;
  if (!autHeader) {
    return res.status(401).json({ error: 'Token not provided ' });
  }

  //retorna uma array com o bearer e o token, não utilizo a primeira parte do array
  const [, token] = autHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
