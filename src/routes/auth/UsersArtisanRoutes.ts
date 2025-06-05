import { Router } from "express";
import {
  getAllUsersArtisan,
  getUserByIdArtisan,
  createUserArtisan,
  updateUserArtisan,
  deleteUserArtisan,
  restoreUserArtisan,
} from "../../controllers/auth/userArtisan.controller";

import { authenticateToken } from "../../middlewares/authmiddlewares";
import upload from "../../middlewares/upload";

const router: Router = Router();
// rotas públicas
router.get("/", getAllUsersArtisan); 
router.get("/:id", getUserByIdArtisan); 
router.post("/register",upload.single("profileImage"), createUserArtisan); 

// rotas privadas
router.put("/:id", upload.single("profileImage"), authenticateToken, updateUserArtisan);
router.delete("/:id", authenticateToken, deleteUserArtisan);
router.patch("/:id/restore", authenticateToken, restoreUserArtisan);

export default router;
