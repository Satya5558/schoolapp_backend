const axios = require("axios");

const mockCallBack = jest.fn((x) => 42 + x);

class User {
  static all() {
    return axios.get("/users.json").then((resp) => resp);
  }
}

jest.mock("axios");

describe("Mock Tests", () => {
  it("should handle errors from the API", async () => {
    // Mock axios.get() to return a rejected promise
    axios.get.mockRejectedValue(new Error("Network error"));

    try {
      // This should throw an error
      await axios.get("/user");
    } catch (error) {
      // Assert that the error is handled properly
      expect(error.message).toBe("Network error");
    }
  });

  it("Mock_user_data", () => {
    const users = [{ name: "satya" }, { name: "venkat" }];
    const resp = { data: users };

    //Mocking get method in axios module
    axios.get.mockReturnValueOnce(resp);

    return User.all().then((response) =>
      expect(response.data).toEqual(resp.data)
    );
  });

  it("Foreach Mock", () => {
    forEach([0, 1], mockCallBack);

    expect(mockCallBack.mock.calls.length).toBe(2);
    expect(mockCallBack.mock.calls[0][0]).toBe(0);
    expect(mockCallBack.mock.calls[1][0]).toBe(1);
    expect(mockCallBack.mock.results.length).toBe(2);
    expect(mockCallBack.mock.results[0].value).toBe(42);
  });

  it("Test-Mock-Function", () => {
    const myMock2 = jest.fn(function () {
      console.log(this);
    });
    const b = {};
    const bound = myMock2.bind(b);
    bound();
    //console.log(myMock2.mock.contexts);
  });

  it("Mock-return-values", () => {
    const myMock3 = jest.fn();
    myMock3
      .mockReturnValueOnce(2)
      .mockReturnValueOnce("x")
      .mockReturnValueOnce(4);
    console.log(myMock3());
    console.log(myMock3());
    console.log(myMock3());
  });
});

function forEach(items, callback) {
  for (const item of items) {
    callback(item);
  }
}
