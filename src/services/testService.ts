const promiseFunction = () => {
  return Promise.reject("peanut butter error");
};

const makeRequest = (name: string, age: number): string => {
  return name + " " + age;
};

export { makeRequest, promiseFunction };
