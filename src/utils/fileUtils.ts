import promiseFS from "node:fs/promises";

import logger from "../config/winston";
import AppError from "./appError";

//Generating unique image name
export const generateUniqueImageName = (extension) => {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(7);
  return `${timestamp}-${randomString}${extension}`;
};

export const deleteFile = async (filePath) => {
  try {
    await promiseFS.access(filePath, promiseFS.constants.F_OK);
    return promiseFS.unlink(filePath);
  } catch (err) {
    logger.error(`${filePath} not found`);
    return new AppError(`${filePath} not found`);
  }
};

export const moveFile = async (source, destination) => {
  try {
    await promiseFS.copyFile(
      source,
      destination,
      promiseFS.constants.COPYFILE_EXCL
    );

    await promiseFS.unlink(source);
  } catch (err) {
    logger.error(err.message);
    throw new AppError("Error while uploading file please try again!");
  }

  return true;
};
