import express from "express";
import orderControllers from "../app/controllers/OrderControllers.js";
const router = express.Router();

router.get("/:id/unpaid", orderControllers.getOrderUnpaid); // lấy đơn hàng chưa thanh toán của nguowfw dùng đã đăng nhập
router.post("/:id/unpaid", orderControllers.createOrderUnpaid); // tạo mới 1 đơn hàng khi nguowfw dùng đã có tài khoản
router.patch("/:id/productIds", orderControllers.patchProductIds); // thêm sản phẩm vào danh sách sản phẩm ProductIds
router.patch("/:uid/deleteProductId", orderControllers.deleteProductId); // lấy tất ca danh sách đon hàng  nguowfw dùng đã đăng nhập
router.patch("/:id/", orderControllers.patchOrder); // chỉnh sưa filed  unpaid:  true --  xác nhận đã thanh toán  tù người dùng
router.get("/:id", orderControllers.listOrder); // lấy tất ca danh sách đon hàng  nguowfw dùng đã đăng nhập
export default router;
