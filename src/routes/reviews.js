import express from "express";
import reviewControllers from "../app/controllers/ReviewControllers.js";
const router = express.Router();

router.get("/:productId", reviewControllers.getAllReview);
router.get("/:productId/features", reviewControllers.getReviewFeature);
router.get(
    "/:productId/parameter",
    reviewControllers.getReviewProductParameter
);
router.get("/", reviewControllers.getReviewProductUser);

router.post("/:productId", reviewControllers.create);

router.put("/:productId/:userId", reviewControllers.update);

export default router;
