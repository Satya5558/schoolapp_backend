const promiseFunction = () => {
  //return Promise.reject(new Error("peanut butter error"));

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "peanut butter",
      });
    }, 1000);
  });
};

const makeRequest = (name: string, age: number): string => {
  return name + " " + age;
};

export { makeRequest, promiseFunction };
