import express from "express";
import {
  checkAuth,
  login,
  logout,
  register,
  updateProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  getProfile,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", authMiddleware, updateProfile);

router.get("/check", authMiddleware, checkAuth);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.put("/change-password", authMiddleware, changePassword);

router.get("/profile", authMiddleware, getProfile);

export default router;
