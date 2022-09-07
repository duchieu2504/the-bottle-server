import express from "express";
import reviewControllers from "../app/controllers/ReviewControllers.js";
const router = express.Router();

router.get("/create", reviewControllers.create);
router.get("/", reviewControllers.show);
export default router;
