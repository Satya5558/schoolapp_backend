process.env.JWT_SECRET = "MySecreet";

import { createSchool } from "../src/services/schoolService";

import School from "../src/models/schoolModel";

//jest.mock("../models");

describe("SchoolService_createSchool", () => {
  const mockSchoolData = { name: "My School", email: "myschool@gmail.com" };

  test("should create school and return the school data", async () => {
    //Mocking the data
    jest.spyOn(School, "create").mockResolvedValue(mockSchoolData as any);

    //Mocking the create method of School model
    expect(createSchool(mockSchoolData)).resolves.toEqual(mockSchoolData);

    expect(School.create).toHaveBeenCalledWith(mockSchoolData);
  });
});
