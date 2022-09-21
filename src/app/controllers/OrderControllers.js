import Orders from "../model/OrderProduct.js";
import Products from "../model/Products.js";
import Address from "../model/Address.js";
class OrderControllers {
    store(req, res, next) {
        Orders.find()
            .then((order) => res.render("orderProduct/show", order))
            .catch(next);
    }

    async createOrderUnpaid(req, res, next) {
        try {
            const product = await Products.findById(req.body.productId);
            const address = await Address.findOne({
                userId: req.params.id,
                isDefault: true,
            });
            const orderUnpaid = await Orders.findOne({
                userId: req.params.id,
                unpaid: false,
            });
            if (orderUnpaid) {
                const totalPrice =
                    Number(orderUnpaid.totalPrice) + Number(product.price);
                const data = {
                    totalPrice: `${totalPrice}`,
                    productIds: [...orderUnpaid.productIds, req.body],
                };
                await Orders.updateOne(
                    { _id: orderUnpaid._id },
                    {
                        ...data,
                    }
                );
                await res.json({
                    errCode: "0",
                    message: "thêm sản phâm thành công",
                });
            } else {
                const data = {
                    userId: req.params.id,
                    code: "hello",
                    address: address?._id || null,
                    totalPrice: product.price,
                    productIds: [req.body],
                };
                const order = new Orders(data);

                order
                    .save()
                    .then(() => console.log("Sucess"))
                    .next();
            }
        } catch (err) {
            res.status(404).json({
                errCode: "1",
                message: "lỗi tải lên dữ liệu sản phẩm vào giỏ hàng",
            });
        }
    }

    // tất ca danh sách đơn hàng của người dùng
    async listOrder(req, res, next) {
        try {
            const id = req.params.id;
            const order = await Orders.find({ userId: id, unpaid: true });
            await res.json(order);
        } catch (err) {
            res.status(404).json([]);
        }
    }

    // đơn hàng chưa thanh toán
    async getOrderUnpaid(req, res, next) {
        try {
            const id = req.params.id;
            const order = await Orders.find({ userId: id, unpaid: false });
            await res.json({
                errCode: "0",
                data: order[0],
            });
        } catch (err) {
            res.json({
                errCode: "1",
                data: {},
            });
        }
    }
    async patchOrder(req, res, next) {
        try {
            await Orders.updateOne(
                { userId: req.params.id, unpaid: false },
                req.body
            );
            await res.json({
                errCode: "0",
                message: "Xác nhận đã chuyển khoản",
            });
        } catch (err) {
            res.status(404).json({
                errCode: "1",
                message: "lỗi xác nhận đã chuyển khoản của khách hàng",
            });
        }
    }
    async patchProductIds(req, res, next) {
        try {
            const data = req.body;
            const order = await Orders.findOne({
                userId: req.params.id,
                unpaid: false,
            });

            // cập nhật danh sách số luong moi
            const newProductId = async () => {
                let promise = order.productIds.map(async (i) => {
                    if (i.productId === data.productId) {
                        return await data;
                    } else {
                        return await i;
                    }
                });
                return await Promise.all(promise);
            };
            const newProductIds = await newProductId();

            // cập nhật tông số tien phai tra
            const totalPrice = async () => {
                let promise = newProductIds.reduce(async (value, i) => {
                    const val = await value;
                    const product = await Products.findById(i.productId);
                    return await (val +
                        Number(product.price) * Number(i.quantily));
                }, 0);
                return await promise;
            };
            const newTotalPrice = await totalPrice();

            await Orders.updateOne(
                { userId: req.params.id, unpaid: false },
                { productIds: newProductIds, totalPrice: `${newTotalPrice}` }
            );
            await res.json({
                errCode: "0",
                message: "Thay đôi số lượng thành công",
            });
            // const  result = await
        } catch (err) {
            res.status(404).json({
                errCode: "1",
                message: "lỗi cập nhật số lượng sản phẩm",
            });
        }
    }

    async deleteProductId(req, res, next) {
        try {
            const productId = req.body;
            const uid = req.params.uid;

            const order = await Orders.findOne({
                userId: uid,
                unpaid: false,
            });
            if (order) {
                const productIdsCopy = [...order.productIds];
                const item = await productIdsCopy.find(
                    (i) => i.productId === productId
                );
                const index = await productIdsCopy.indexOf(item);
                await productIdsCopy.splice(index, 1);

                // cập nhật tông số tien phai tra
                const totalPrice = async () => {
                    let promise = productIdsCopy.reduce(async (value, i) => {
                        const val = await value;
                        const product = await Products.findById(i.productId);
                        return await (val +
                            Number(product.price) * Number(i.quantily));
                    }, 0);
                    return await promise;
                };
                const newTotalPrice = await totalPrice();
                await Orders.updateOne(
                    { userId: uid, unpaid: false },
                    {
                        productIds: productIdsCopy,
                        totalPrice: `${newTotalPrice}`,
                    }
                );
                await res.json({
                    errCode: "0",
                    message: "Thay đôi số lượng thành công",
                });
            }
        } catch (err) {
            res.status(404).json({
                errCode: "1",
                message: "lỗi cập nhật số lượng sản phẩm",
            });
        }
    }
}

const orderControllers = new OrderControllers();
export default orderControllers;
