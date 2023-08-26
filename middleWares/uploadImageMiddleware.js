const multer = require("multer");
const ApiError = require("../utils/apiError");

const storage = multer.memoryStorage();

const filter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new ApiError("Only Images", 400), false);
  }
};
const upload = multer({ storage: storage, fileFilter: filter });

exports.uploadUserImage = (fieldName) => upload.single(fieldName);
