import School from "../models/schoolModel";
import AppError from "../utils/appError";
import { deleteFile, moveFile } from "../utils/fileUtils";

export const createSchool = async (schoolData) => {
  const newSchoolData = await School.create(schoolData);
  return newSchoolData;
};

export const editSchool = async (schoolId, schoolData, file = null) => {
  //Checking School is exists
  const schoolModel = await School.findById(schoolId);

  if (!schoolModel) {
    throw new AppError(`School with Id ${schoolId} not found`, 404);
  }

  //Updating School Logo
  if (schoolData.is_logo_changed === "true") {
    const isFileMoved = await moveFile(
      file?.path,
      `uploads/school_logos/${file?.filename}`
    );

    if (isFileMoved) {
      let logoName = schoolModel.get("storage_logo_name", null, {
        getters: false,
      });
      await deleteFile(`uploads/school_logos/${logoName}`);
    }

    schoolData.storage_logo_name = file?.filename;
    schoolData.logo_original_name = file?.originalname;
  } else {
    if (schoolModel.storage_logo_name.trim()) {
      schoolData.storage_logo_name = schoolModel.get(
        "storage_logo_name",
        null,
        {
          getters: false,
        }
      );
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

  const schools = await School.find(filters)
    .select("school_unique_id name email phone_number storage_logo_name")
    .skip(offsetRecords)
    .limit(numOfRecords)
    .exec();

  const totalCount = await School.countDocuments(filters);

  let totalPages = Math.ceil(totalCount / numOfRecords);

  return { schools, totalCount, totalPages };
};

export const getSchool = async (schoolId) => {
  return await School.findById(schoolId).select("-password -__v").exec();
};

export const checkEmailExists = async (email, schoolId = null) => {
  const whereConditions = { email };

  if (schoolId) {
    whereConditions["_id"] = {
      $ne: schoolId,
    };
  }
  const existingEmail = await School.findOne(whereConditions);

  return existingEmail ? true : false;
};

export const checkPhoneNumberExists = async (phoneNumber, schoolId = null) => {
  const whereConditions = { phone_number: phoneNumber };

  if (schoolId) {
    whereConditions["_id"] = {
      $ne: schoolId,
    };
  }

  const isPhoneNuimberAvailable = await School.findOne(whereConditions);
  return isPhoneNuimberAvailable ? true : false;
};
