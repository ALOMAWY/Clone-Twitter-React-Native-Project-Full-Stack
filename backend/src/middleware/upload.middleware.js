// Multer
import multer from "multer";
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only Image Files Are Allowed", false));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, //5MB Limit
});

export default upload;
