process.env.JWT_SECRET = "MySecreet";

const request = require("supertest");

const app = require("../app");

describe("This is the school test", () => {
  test("School Test Method", async () => {
    const response = await request(app).get("/api/schools/test-method");

    //expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
  });

  test("Get School Test", async () => {
    const response = await request(app).get("/api/schools");

    expect(response.status).toBe(200);
  });

  test("Add school test", async () => {
    const response = await request(app).post("/api/schools").send({
      name: "",
      address: "Nizampet",
      city: "Hyderabad",
      state: "Telangana",
      country: "India",
      postal_code: "500090",
      phone_number: "",
      email: "",
      website: "www.blossoms.com",
    });

    //let objectFormat = {};

    const errorMessages = response?.body?.errors?.reduce((accum, err) => {
      accum[err.path]
        ? accum[err.path].push(err.msg)
        : (accum[err.path] = [err.msg]);
      return accum;
    }, {});

    expect(response.status).toBe(201);
  });
});
