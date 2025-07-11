import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  restoreUser,
  upgradeToArtisan
} from "../../controllers/auth/user.controller";

import { authenticateToken } from "../../middlewares/authmiddlewares";

const router: Router = Router();

router.get("/", getAllUsers); // rota pública
router.get("/:id", getUserById); // rota pública
router.post("/register", createUser); // rota pública 

// rotas privadas
router.put("/:id", authenticateToken, updateUser);
router.delete("/:id", authenticateToken, deleteUser);
router.patch("/:id/restore", authenticateToken, restoreUser);
router.post("/upgrade-to-artisan", authenticateToken, upgradeToArtisan); 


export default router;
