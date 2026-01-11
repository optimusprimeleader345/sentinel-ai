// File upload utility for deepfake analysis
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for image/video uploads
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'video/mp4',
    'video/webm'
  ];

  const maxSize = 50 * 1024 * 1024; // 50MB

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Unsupported file type. Only JPG, PNG, MP4, and WebM files are allowed.'), false);
  }

  // Check file size in stream (basic check)
  if (req.file && req.file.size > maxSize) {
    return cb(new Error('File too large. Maximum size is 50MB.'), false);
  }

  cb(null, true);
};

// Create multer instance (not pre-configured middleware)
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB
  }
});

// Create specific middleware for different field names
const uploadFile = upload.single('file');
const uploadLogFile = upload.single('logFile');

export { upload, uploadFile, uploadLogFile };
