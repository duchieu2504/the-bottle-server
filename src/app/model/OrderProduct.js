import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const { Schema } = mongoose;

const OrderSchema = new Schema(
    {
        code: { type: String, required: true },
        userId: { type: String, default: null },
        address: { type: String, default: null },
        confirmedPayment: { type: Boolean, default: false }, // xác nhận đã thanh toán từ phía server
        totalPrice: { type: String, required: true },
        unpaid: { type: Boolean, required: true, default: false }, // xác nhận đã chuyển khoản hay chưa, quyết định lưu các sản phẩm trong store của khách hàng
        productIds: { type: Array, required: true },
        message: { type: String, default: "" }, // nội dung tin nhắn
    },
    {
        timestamps: true,
    }
);

const OrderProduct = mongoose.model("Orders", OrderSchema);
export default OrderProduct;
