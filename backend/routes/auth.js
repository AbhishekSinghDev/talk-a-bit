import { login, signup } from "../controllers/authController.js";
import express from "express";

const router = express.Router();

router.post("/login", login);
router.post("/register", signup);

export default router;
