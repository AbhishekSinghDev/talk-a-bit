import express from "express";
import protect from "../middleware/verifyTokenMiddleware.js";
import { searchUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", protect, searchUser);

export default router;
