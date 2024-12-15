import { env } from '~/config/environment';

const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const router = express.Router();

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

// Sử dụng Multer để nhận file
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream((error, result) => {
      if (error)
        return res.status(500).send({ message: 'Upload failed', error });
      res.status(200).send({ secure_url: result.secure_url });
    });
    result.end(req.file.buffer); // Upload từ buffer file
  } catch (err) {
    res.status(500).send({ message: 'Server error', error: err });
  }
});

export const cloudinaryRoute = router;
