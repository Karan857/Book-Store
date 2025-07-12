import { Router } from "express";
import * as categoryController from "../controllers/categoryController.ts";

const router = Router();

router.get("/", categoryController.getCategory);
router.post("/", categoryController.createCategory);
router.patch("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

export default router;
