import { Request, Response } from "express";
import { makeRequest } from "../services/testService";
import catchAsync from "../utils/catchAsync";

const testRequest = catchAsync(async (req: Request, res: Response) => {
  let userDetails: string = makeRequest("Satya", 37);
  return res.status(200).json({ userDetails });
});

export { testRequest };
