const logger = require("../config/winston");
const fs = require("fs");
const AppError = require("./appError");

//Generating unique image name
exports.generateUniqueImageName = (extension) => {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(7);
  return `${timestamp}-${randomString}${extension}`;
};

exports.deleteFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.exists(filePath, (status) => {
      if (status) {
        fs.unlink(filePath, (err) => {
          if (err) {
            logger.error(err.message);
            throw new AppError("Unable to delete file", 500);
          }
          resolve(true);
        });
      } else {
        logger.error(`${filePath} not found`);
        resolve(false);
      }
    });
  });
};

exports.moveFile = (source, destination) => {
  return new Promise((resolve, reject) => {
    fs.rename(source, destination, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};
