class FileValidatorException extends Error {
  constructor(message, ...args) {
    super(message);
    this.message = message || "Something went wrong. Please try again.";
  }
}

export default FileValidatorException;
