const multer = require("multer");
const path = require("path");

const FileValidatorException = require("../exceptions/fileValidatorException");

const { generateUniqueImageName } = require("../utils/fileUtils");

const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, "temp");
  // },
  filename: function (req, file, cb) {
    cb(null, generateUniqueImageName(path.extname(file.originalname)));
  },
});

// File filter function to restrict file types
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true); // Accept the file
  } else {
    cb(new FileValidatorException("Unsupported file type"), false); // Reject the file
  }
};

const upload = multer({
  storage: storage,
});

module.exports = upload;
