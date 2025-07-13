import { Router } from "express";

import * as bookController from "../controllers/bookController.ts";

const router = Router();

router.get("/", bookController.getBooks);
router.get("/category", bookController.getBooksByCategory);
router.get("/:id", bookController.getBookById);
router.post("/", bookController.createBook);
router.patch("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

export default router;
