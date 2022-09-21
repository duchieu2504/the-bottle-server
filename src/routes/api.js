import express from "express";
import reviewRouter from "./reviews.js";
import orderRouter from "./order.js";
import addressRouter from "./address.js";

import apiControllers from "../app/controllers/ApiControllers.js";
import searchController from "../app/controllers/SearchControllers.js";

const router = express.Router();

router.get("/products", apiControllers.getProducts);
router.get("/search", searchController.search);

router.get("/products/image/:id", apiControllers.getImage);
router.use("/review", reviewRouter);
router.use("/orderProducts", orderRouter);
router.use("/address", addressRouter);

export default router;
