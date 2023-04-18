const { typeImage } = require('../constants/typeFile');

const multer = require('multer');

const upload = (path) => {
  const storage = multer.diskStorage({
    destination: (_req, file, callBack) => {
      callBack(null, `public/images/${path}`);
    },
    filename: (_req, file, callBack) => {
      const uniqueSuffix = `${Date.now() + file.originalname}`;
      callBack(null, uniqueSuffix);
    },
  });

  const upload = multer({
    storage,
    fileFilter: (_req, file, callBack) => {
      if (
        file.mimetype === typeImage.PNG ||
        file.mimetype === typeImage.JPG ||
        file.mimetype === typeImage.JPEG
      )
        callBack(null, true);
      else {
        callBack(null, false);
        return callBack(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    },
  });

  return upload;
};

module.exports = { upload };
