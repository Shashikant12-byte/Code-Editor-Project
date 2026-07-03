import express from "express";
import { runCode } from "../Controllers/runController.js";

const router = express.Router();

router.post("/", runCode);

export default router;