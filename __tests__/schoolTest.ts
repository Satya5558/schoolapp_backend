process.env.JWT_SECRET = "MySecreet";

import request from "supertest";

import app from "../src/app";

function errorTest() {
  throw new Error("Something went wrong");
}

describe("This is the school test", () => {
  const shoppingList = [
    "diapers",
    "kleenex",
    "trash bags",
    "paper towels",
    "milk",
  ];

  test("Error Assertion", () => {
    expect(() => errorTest()).toThrow("Something went wrong");
  });

  test("Array Comparison", () => {
    expect(shoppingList).toContain("water");
  });

  test("School Test Method", async () => {
    const response = await request(app).get("/api/schools/test-method");

    let user = { name: "Satya" };
    //expect(response.status).toBe(200);
    //expect(response.body.status).toBe("success");
    expect(response.body.user).toStrictEqual(user);
  });

  test("null test", () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
  });

  test("Numerical comparison", () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);

    // toBe and toEqual are equivalent for numbers
    expect(value).toBe(4);
    expect(value).toEqual(4);
  });

  test("String comparisons", () => {
    const name = "S Satya venkata rayudu";
    expect(name).toMatch(/^S S/);
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
