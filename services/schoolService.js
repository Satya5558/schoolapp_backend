const { School } = require("../models");

exports.createSchool = async (schoolData) => {
  const newSchoolData = await School.create(schoolData);

  return newSchoolData;
};

exports.getSchools = async (pageRequest) => {
  let numOfRecords = pageRequest?.numOfRecords || 20;
  let offsetRecords = ((pageRequest?.pageNum || 1) - 1) * numOfRecords;

  const { count: totalCount, rows: schools } = await School.findAndCountAll({
    attributes: ["id", "name", "email", "website", "address"],
    limit: numOfRecords,
    offset: offsetRecords,
  });

  let totalPages = Math.ceil(totalCount / numOfRecords);

  return { schools, totalCount, totalPages };
};

exports.checkEmailExists = async (email) => {
  const existingEmail = await School.findOne({
    where: {
      email: email,
    },
  });

  return existingEmail ? true : false;
};
