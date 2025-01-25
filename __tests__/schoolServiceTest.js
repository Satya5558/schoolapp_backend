process.env.JWT_SECRET = "MySecreet";

const schoolService = require("../services/schoolService");
const { sequelize, School } = require("../models");
const { Op } = require("sequelize");

//jest.mock("../models");

describe("SchoolService_createSchool", () => {
  const mockSchoolData = { name: "My School", email: "myschool@gmail.com" };

  test("should create school and return the school data", async () => {
    //Mocking the data
    //School.create.mockResolvedValue(mockSchoolData);

    const result = await schoolService.createSchool(mockSchoolData);

    expect(result).toEqual(mockSchoolData);
    expect(School.create).toHaveBeenCalledWith(mockSchoolData);
  });

  test("Test email existence", async () => {
    let email = "vasista@outlook.com";
    let schoolId = 2;
    const existingEmail = await School.findOne({
      where: {
        email: email,
        id: {
          [Op.ne]: schoolId,
        },
      },
    });

    expect(existingEmail).not.toBeNull();
    //expect(existingEmail).not.toBeUndefined();
  });
});
