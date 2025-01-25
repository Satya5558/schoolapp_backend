class FileValidatorException extends Error {
  constructor(message, ...args) {
    super(message, ...args);
    this.message = message || "Something went wrong. Please try again.";
  }
}

module.exports = FileValidatorException;
