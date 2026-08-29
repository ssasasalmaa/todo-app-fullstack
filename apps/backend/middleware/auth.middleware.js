import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

export const protect = async (req, res, next) => {
  let token;

  // Cek apakah ada header authorization dan diawali dengan 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Ambil token dari string "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];

      // Verifikasi token pakai secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Ambil data user berdasarkan ID dari token (password-nya di-exclude)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Lanjut ke controller berikutnya
    } catch (error) {
      console.error(error);
      return res.status(401,).json({ message: 'Not authorized, token failed!' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided!' });
  }
};