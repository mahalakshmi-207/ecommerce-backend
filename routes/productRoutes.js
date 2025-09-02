import express from "express"
import protect from "../middleware/authMiddleware.js"
import { createProduct, getProducts, getProductById,deleteProduct,updateProduct,getMyProducts } from "../controllers/productController.js";

const router = express.Router();

router.post("/", protect, createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.delete("/:id", protect, deleteProduct);
router.put("/:id", protect, updateProduct);
router.get("/myproducts", protect, getMyProducts);

export default router;