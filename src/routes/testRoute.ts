import express from "express";
import { testRequest } from "../controllers/testController";

const router = express.Router();

router.get("/", testRequest);

export default router;
