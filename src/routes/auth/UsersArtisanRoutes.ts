import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  restoreUser,
} from "../controllers/auth/userArtisan.controller";

import { authenticateToken } from "../middlewares/authmiddlewares";
import upload from "../middlewares/upload";

const router: Router = Router();
// rotas públicas
router.get("/", getAllUsers); 
router.get("/:id", getUserById); 
router.post("/register",upload.single("profileImage"), createUser); 

// rotas privadas
router.put("/:id", upload.single("profileImage"), authenticateToken, updateUser);
router.delete("/:id", authenticateToken, deleteUser);
router.patch("/:id/restore", authenticateToken, restoreUser);

export default router;
