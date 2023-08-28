import multer from "multer";

const storage = multer.memoryStorage();

const filter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only Images"), false);
  }
};
const upload = multer({ storage: storage, fileFilter: filter });

const uploadImage = (fieldName) => upload.single(fieldName);

export default uploadImage