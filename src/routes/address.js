import express from "express";
import addressCotrollers from "../app/controllers/AddressControllers.js";
const router = express.Router();

router.get("/:userId", addressCotrollers.getAddress);
router.get("/:id/edit", addressCotrollers.edit);
router.get("/:userId/default", addressCotrollers.getAddressDefault);

router.post("/", addressCotrollers.postAddress);

router.put("/:id", addressCotrollers.update);
export default router;
