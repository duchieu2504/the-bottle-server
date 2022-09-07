import express from "express";
import productControllers from "../app/controllers/ProductsControllers.js";
import multer from "../until/multer.js";
const router = express.Router();

router.get("/show", productControllers.show);
router.get("/create", productControllers.create);
router.get("/trash", productControllers.trash);
router.post("/handle-submit-form", productControllers.submitForm);
router.get("/:id/edit", productControllers.edit);
router.post("/store", multer.single("image"), productControllers.store);
router.put("/:id", multer.single("image"), productControllers.update);
router.patch("/:id/restore", productControllers.reStore);
router.delete("/:id", productControllers.delete);
router.delete("/:id/force", productControllers.deleteForce);

export default router;
