import { Op } from "sequelize";
import logger from "../config/winston";
import School from "../models/school";
import { ISchool } from "../types/ISchool";
import AppError from "../utils/appError";
import { moveFile } from "../utils/fileUtils";

export const createSchool = async (schoolData: ISchool) => {
  const newSchoolData = School.build(schoolData);
  // Generate a unique, sequential school ID in the format SCH-000001
  const lastSchool = await School.findOne({
    order: [["createdAt", "DESC"]],
    attributes: ["school_unique_id"],
  });

  let nextId = 1;
  if (lastSchool && lastSchool.school_unique_id) {
    const match = lastSchool.school_unique_id.match(/^SCH-(\d+)$/);
    if (match) {
      nextId = parseInt(match[1], 10) + 1;
    }
  }
  newSchoolData.school_unique_id = `SCH-${nextId.toString().padStart(6, "0")}`;
  await newSchoolData.hashPassword();

  const savedSchool = await newSchoolData.save();
  //const newSchoolData = await School.create(schoolData);
  return savedSchool;
};

export const editSchool = async (schoolId, schoolData, file = null) => {
  //Checking School is exists
  const schoolModel = await School.findByPk(schoolId);

  if (!schoolModel) {
    logger.warn(`School with Id ${schoolId} not found`);
    throw new AppError(`School with Id ${schoolId} not found`, 404);
  }

  //Updating School Logo
  if (schoolData.is_logo_changed === "true") {
    const isFileMoved = await moveFile(
      file?.path,
      `uploads/school_logos/${file?.filename}`
    );

    // if (isFileMoved) {
    //   let logoName = schoolModel.get("storage_logo_name", null, {
    //     getters: false,
    //   });
    //   await deleteFile(`uploads/school_logos/${logoName}`);
    // }

    schoolData.storage_logo_name = file?.filename;
    schoolData.logo_original_name = file?.originalname;
  } else {
    if (schoolModel.storage_logo_name.trim()) {
      // schoolData.storage_logo_name = schoolModel.get(
      //   "storage_logo_name",
      //   null,
      //   {
      //     getters: false,
      //   }
      // );
    }
  }

  //Updating Password
  if (schoolData.password && schoolData.password.trim()) {
    schoolModel.password = schoolData.password.trim();
  }

  //Removing password field from the object
  delete schoolData.password;

  Object.assign(schoolModel, schoolData);

  const updatedSchoolDetails = await schoolModel.save();
  return updatedSchoolDetails;
};

export const getSchools = async ({ numOfRecords, pageNum }, filters = {}) => {
  let offsetRecords = ((pageNum || 1) - 1) * numOfRecords;

  const { rows, count } = await School.findAndCountAll({
    where: filters,
    attributes: [
      "school_unique_id",
      "name",
      "email",
      "phone_number",
      "storage_logo_name",
      "id",
    ],
    offset: offsetRecords,
    limit: numOfRecords,
    order: [["createdAt", "DESC"]],
  });

  let totalPages = Math.ceil(count / numOfRecords);

  return { schools: rows, count, totalPages };
};

export const getSchool = async (schoolId) => {
  return await School.findByPk(schoolId, {
    attributes: { exclude: ["password"] },
  });
};

export const checkEmailExists = async (email, schoolId = null) => {
  const whereConditions = { email };

  if (schoolId) {
    whereConditions["id"] = {
      [Op.ne]: schoolId,
    };
  }
  const existingEmail = await School.findOne({ where: whereConditions });

  return existingEmail ? true : false;
};

export const checkPhoneNumberExists = async (phoneNumber, schoolId = null) => {
  const whereConditions = { phone_number: phoneNumber };

  if (schoolId) {
    whereConditions["id"] = {
      [Op.ne]: schoolId,
    };
  }

  const isPhoneNuimberAvailable = await School.findOne({
    where: whereConditions,
  });
  return isPhoneNuimberAvailable ? true : false;
};
