import { promiseFunction } from "../src/services/testService";

describe("Async Tests", () => {
  it("First Async Test", () => {
    // expect(promiseFunction()).rejects.toThrow("peanut butter error");
    expect(promiseFunction()).resolves.toEqual({
      id: 1,
      name: "peanut butter",
    });
    // return promiseFunction().then((result) => {
    //   expect(result).toBe("peanut butter");
    // });
  });

  it("Await function test", async () => {
    //await expect(promiseFunction()).resolves.toBe("peanut butter");
    await expect(promiseFunction()).rejects.toBe("peanut butter error");

    // try {
    //   const result = await promiseFunction();
    //   expect(result).toEqual("peanut butter");
    // } catch (err) {
    //   expect(err).toEqual("peanut butter error");
    // }
  });
});
