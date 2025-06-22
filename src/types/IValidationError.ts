export default interface IValidationError {
  statusCode: number;
  status?: string;
  isOperational?: boolean;
  errors: {
    msg: string;
    param: string;
    location: string;
  }[];
  message?: string;
  [key: string]: any;
}
