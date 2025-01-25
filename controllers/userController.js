const { createAdminUser } = require("../services/userService");
const { validationResult } = require("express-validator");
const { formatErrors } = require("../utils/validatorUtil");

const logger = require("../config/winston");

exports.createUser = async (req, res, next) => {
  try {
    //Validating Request
    const result = validationResult(req);

    if (result.isEmpty()) {
      const userData = await createAdminUser({ ...req.body });

      logger.debug(`User created with ID: ${userData.id}`);

      return res.status(201).send({
        status: "success",
        message: "User created successfully",
        data: { user: userData },
      });
    } else {
      return res.status(400).send({
        status: "failed",
        message: "validationErrors",
        errors: formatErrors(result.array()),
      });
    }
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      logger.error(
        "Unique constraint error:",
        err.errors.map((e) => e.message)
      );
    }

    logger.error(err.stack);

    return res.status(500).send({
      status: "failed",
      message: "Something went wrong please try again",
      data: {},
    });
  }
};
