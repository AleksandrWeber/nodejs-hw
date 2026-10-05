
import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const updateUserAvatar = async (req, res) => {
  const { _id: userId } = req.user;

  // Проверяем наличие файла
  if (!req.file) {
    throw createHttpError(400, 'No file');
  }

  // Загружаем файл в Cloudinary
  const result = await saveFileToCloudinary(req.file.buffer, userId);

  // Обновляем аватар пользователя в БД
  const user = await User.findByIdAndUpdate(
    userId,
    { avatar: result.secure_url },
    { returnDocument: 'after' }
  );

  res.status(200).json({ url: user.avatar });
};



