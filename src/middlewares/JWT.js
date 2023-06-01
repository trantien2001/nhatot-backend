import freeze from '../config/freeze.js';
import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;

const generateToken = (payload) => {
  const { id_user, fullName, id_role } = payload;

  const accessToken = sign({ id_user, fullName, id_role }, freeze.JWT_SECRET, {
    expiresIn: freeze.tokenLife,
  });

  const refreshToken = sign({ id_user, fullName, id_role }, freeze.SECRET_REFRESH, {
    expiresIn: freeze.refreshTokenLife,
  });

  return { accessToken, refreshToken };
};

const validateToken = (accessToken) => {
  const key = freeze.JWT_SECRET;
  try {
    const validToken = verify(accessToken, key);
    return validToken;
  } catch (error) {
    return false;
  }
};

const validateRefreshToken = (refreshToken) => {
  const key = freeze.SECRET_REFRESH;
  const validToken = verify(refreshToken, key);
  return validToken;
};

export { generateToken, validateToken, validateRefreshToken };
