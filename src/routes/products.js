import express from "express";
import productControllers from "../app/controllers/ProductsControllers.js";
const router = express.Router();

router.get("/show", productControllers.show);
router.get("/create", productControllers.create);
router.post("/store", productControllers.store);

export default router;
