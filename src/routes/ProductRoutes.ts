import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  restoreProduct,
} from "../controllers/product.controller";
import { authenticateToken } from "../middlewares/authmiddlewares"
import upload from "../middlewares/upload";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/",  authenticateToken, upload.array("images", 5), createProduct);
router.put("/:id", authenticateToken, upload.array("images", 5), updateProduct);
router.delete("/:id", authenticateToken, deleteProduct);
router.patch("/restore/:id", authenticateToken, restoreProduct);

export default router;
