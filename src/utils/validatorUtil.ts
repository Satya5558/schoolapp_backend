const formatErrors = (validationErrors) => {
  return validationErrors.reduce((accum, { path, msg }) => {
    accum[path] ? accum[path].push(msg) : (accum[path] = [msg]);
    return accum;
  }, {});
};

export default formatErrors;
