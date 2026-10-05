import multer from 'multer';
import createHttpError from 'http-errors';

// Настройка памяти для хранения файла
const storage = multer.memoryStorage();

// Фильтр для проверки типа файла
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(createHttpError(400, 'Only images allowed'));
  }
};

// Создание upload middleware
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
}).single('avatar');
