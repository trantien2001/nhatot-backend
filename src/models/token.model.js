import jwt from 'jsonwebtoken';

const generateToken = (payload) => {
  const { _id, isAdmin } = payload;

  const accessToken = jwt.sign({ _id, isAdmin }, process.env.ACCESS_TOKEN_SECRET + '', {
    expiresIn: '30s',
  });

  const refreshToken = jwt.sign({ _id, isAdmin }, process.env.REFRESH_TOKEN_SECRET + '', {
    expiresIn: '1h',
  });

  return { accessToken, refreshToken };
};

const tokenModel = {
  generateToken,
};

export default tokenModel;
