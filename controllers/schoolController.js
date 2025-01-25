const { validationResult } = require("express-validator");
const logger = require("../config/winston");

const {
  createSchool,
  getSchools,
  editSchool,
  checkEmailExists,
  getSchool,
} = require("../services/schoolService");
const { moveFile } = require("../utils/fileUtils");
const { formatErrors } = require("../utils/validatorUtil");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createSchool = async (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    try {
      const schoolDetails = { ...req.body };

      if (req.file) {
        const isUploaded = await moveFile(
          req?.file?.path,
          `uploads/school_logos/${req.file?.filename}`
        );

        schoolDetails.storage_logo_name = req?.file?.filename;
        schoolDetails.logo_original_name = req?.file?.originalname;
      }

      const newSchoolData = await createSchool(schoolDetails);

      logger.info(`School is created with name ${newSchoolData?.name}`);

      return res.status(201).send({
        status: "success",
        data: { schoolData: newSchoolData },
      });
    } catch (err) {
      return res.status(500).send({
        status: "failed",
        message: "Something went wrong please try again",
      });
    }
  } else {
    return res.status(400).send({
      status: "failed",
      message: "validationErrors",
      errors: formatErrors(result.array()),
    });
  }
};

exports.editSchool = catchAsync(async (req, res, next) => {
  const result = validationResult(req);

  //Validating form validation
  if (result.isEmpty()) {
    const schoolDetails = { ...req.body };
    //Updateing School details
    const updateSchool = await editSchool(
      req?.params?.schoolId,
      schoolDetails,
      req.file
    );

    return res.status(200).send({
      status: "success",
      message: "School updated successfully!",
      data: updateSchool.toJSON(),
    });
  } else {
    return res.status(400).send({
      status: "failed",
      message: "validationErrors",
      errors: formatErrors(result.array()),
    });
  }
});

exports.getSchools = async (req, res, next) => {
  try {
    const recordsLimit = {
      numOfRecords: req?.query?.numRecords * 1 || 20,
      pageNum: req?.query?.pageNum * 1 || 1,
    };

    let filters = {};

    if (req?.query?.school_id) {
      filters["school_unique_id"] = req?.query?.school_id;
    }

    if (req?.query?.name) {
      filters["name"] = { $regex: `^${req?.query?.name}`, $options: "i" };
    }

    if (req?.query?.email) {
      filters["email"] = { $regex: `^${req?.query?.email}`, $options: "i" };
    }

    if (req?.query?.phone_number) {
      filters["phone_number"] = req?.query?.phone_number;
    }

    const schoolsData = await getSchools(recordsLimit, filters);

    let { schools } = schoolsData;

    return res.status(200).send({
      status: "success",
      data: { ...schoolsData, schools },
    });
  } catch (ex) {
    return res.status(500).send({
      status: "failed",
      message: ex.message,
    });
  }
};

exports.getSchool = async (req, res, next) => {
  try {
    const schoolDetails = await getSchool(req.params.schoolId);

    if (schoolDetails === null) {
      return res.status(404).send({
        status: "failed",
        message: "School not found",
      });
    } else {
      const { createdAt, updatedAt, ...schoolData } = schoolDetails.toJSON();

      return res.status(200).send({
        status: "success",
        data: { schoolData },
      });
    }
  } catch (ex) {
    return res.status(500).send({
      status: "failed",
      message: "Something went wrong",
    });
  }
};

exports.checkEmail = async (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    let email = req.params.email;

    const isEmailExists = await checkEmailExists(email);

    return res.status(200).send({
      message: "success",
      isEmailExists,
    });
  }

  return res.status(403).send({
    message: "failed",
    errors: result.array(),
  });
};

exports.testMethod = async (req, res, next) => {
  return res.status(200).send({
    status: "success",
    message: "Request reached successfully!",
  });
};
