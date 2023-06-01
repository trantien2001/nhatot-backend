import { validateToken, validateRefreshToken, generateToken } from './JWT.js';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';

export const isAuth = async (req, res, next) => {
  // Lấy access token từ header
  try {
    const accessTokenFromHeader = req.headers.authorization;
    const refreshTokenFromHeader = req.headers.refreshtoken?.toString() || '';
    const accessToken = accessTokenFromHeader?.split(' ')[1];
    const refreshToken = refreshTokenFromHeader && refreshTokenFromHeader.split(' ')[1];
    const isValidToken = accessToken && validateToken(accessToken);
    if (!isValidToken) {
      const verifiedRefreshToken = refreshToken && validateRefreshToken(refreshToken);
      if (!verifiedRefreshToken) {
        next(new ApiError(httpStatus.UNAUTHORIZED, 'Không có quyền truy cập'));
      } else {
      }
    }
    return next();
  } catch (error) {
    next(new ApiError(httpStatus.UNAUTHORIZED, 'Login timeout. Please login again !'));
  }
};
