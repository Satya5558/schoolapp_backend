const { validationResult } = require("express-validator");
const {
  createSchool,
  getSchools,
  checkEmailExists,
} = require("../services/schoolService");

const logger = require("../config/winston");

exports.createSchool = async (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    try {
      const newSchoolData = await createSchool(req.body);

      logger.info(`School is created with name ${newSchoolData.name}`);

      return res.status(201).send({
        status: "success",
        data: { schoolData: newSchoolData },
      });
    } catch (ex) {
      logger.error(ex.message);
      return res.status(500).send({
        status: "failed",
        message: "Something went wrong please try again",
      });
    }
  }

  res.status(403).send({
    status: "failed",
    errors: result.array(),
  });
};

exports.getSchools = async (req, res, next) => {
  try {
    const pageRequest = {
      numOfRecords: req.query?.numRecords * 1 || 20,
      pageNum: req.query?.pageNum * 1 || 1,
    };

    const schoolsData = await getSchools(pageRequest);

    return res.status(200).send({
      status: "success",
      data: schoolsData,
    });
  } catch (ex) {
    return res.status(500).send({
      status: "failed",
      message: ex.message,
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
