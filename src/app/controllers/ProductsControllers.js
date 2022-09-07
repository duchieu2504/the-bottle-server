import {
    mongooseToObject,
    mutipleMongooseToObject,
} from "../../until/mongooseObject.js";
import Products from "../model/Products.js";
import "dotenv/config";
import cloudinary from "../../until/cloudinary.js";

class ProductsControllers {
    //danh sách cả sản phẩm gửi cho client : GEt /products/show
    show(req, res, next) {
        Products.find({})
            .sortProduct(req)
            .then((product) =>
                res.render("products/show", {
                    product: mutipleMongooseToObject(product),
                })
            )
            .catch(next);
    }

    //danh sách cả sản phẩm đã xóa GEt /products/trash
    trash(req, res, next) {
        Products.findDeleted()
            .then((product) =>
                res.render("products/trash", {
                    product: mutipleMongooseToObject(product),
                })
            )
            .catch(next);
    }

    //chuyển đến trang views hiển thi form tạo sản phẩm mới: GET /products/create
    create(req, res, next) {
        const category = ["whiskey", "shop alcohol"];
        const classify = ["teqwuila", "vokda", "bourbon", "american", "vokda"];

        res.render("products/create", {
            category: category,
            classify: classify,
        });
    }

    //tạo mới sản phẩm : POST /products/store
    async store(req, res, next) {
        try {
            const data = req.body;
            const result = await cloudinary.uploader.upload(req.file.path, {
                upload_preset: "dev_the_bottle",
            });
            const product = { ...data, cloudinary_id: result.public_id };
            // console.log(product);
            const products = new Products(product);
            // console.log(products);
            await products.save();
            await res.redirect("/products/show");

            // products
            //     .save()
            //     .then(() => res.redirect("/products/show"))
            //     .catch(next);
        } catch {
            next();
            res.json({ errCode: 1, error: "Upload file image fail" });
        }
    }

    //chuyển đển trang view hiện thị form cập nhật sản phẩm : GET /products/:id/edit
    async edit(req, res, next) {
        try {
            const category = ["whiskey", "shop alcohol"];
            const classify = [
                "teqwuila",
                "vokda",
                "bourbon",
                "american",
                "vokda",
            ];

            let product = await Products.findById(req.params.id); //thêm async await cần thời gian tìm
            const _id = req.params.id;
            const cloudinary_id = product.cloudinary_id;
            const { resources } = await cloudinary.search
                .expression(
                    `folder:dev_the_bottle AND public_id:${cloudinary_id}`
                )
                .sort_by("public_id", "desc")
                .max_results(30)
                .execute();

            const urlImage = resources.map((file) => file.secure_url);
            await res.render("products/edit", {
                product: mongooseToObject(product),
                image: urlImage ? urlImage[0] : "",
                category: category,
                classify: classify,
                categoryId: {
                    categoryId: mongooseToObject(product).category,
                },
                classifyId: {
                    classifyId: mongooseToObject(product).classify,
                },
            });
            // const productedit = Products.findOne({ _id: _id })
            //     .then((product) => {
            //         res.render("products/edit", {
            //             product: mongooseToObject(product),
            //             image: urlImage ? urlImage[0] : "",
            //             category: category,
            //             classify: classify,
            //             categoryId: {
            //                 categoryId: mongooseToObject(product).category,
            //             },
            //             classifyId: {
            //                 classifyId: mongooseToObject(product).classify,
            //             },
            //         });
            //     })
            //     .catch(next);
        } catch (err) {
            next();
            res.json({ errCode: "1" });
        }
    }

    // cập nhật sản phẩm PUT /products/:id?_method=PUT
    async update(req, res, next) {
        try {
            const product = await Products.findById(req.params.id);

            // // Upload image to cloudinary
            var result;
            if (req.file) {
                result = await cloudinary.uploader.upload(req.file.path, {
                    upload_preset: "dev_the_bottle",
                });
                // // Delete image from cloudinary
                if (product.cloudinary_id)
                    await cloudinary.uploader.destroy(product.cloudinary_id);
            }
            await Products.updateOne(
                { _id: req.params.id },
                {
                    ...req.body,
                    cloudinary_id: result?.public_id || product.cloudinary_id,
                }
            );
            await res.redirect("/products/show");
        } catch {
            next();
            res.json({ errCode: 1, error: "Lỗi cập nhật hình ảnh" });
        }
    }

    // xóa mềm sản phẩm, chưa hoàn toàn DELETE /products/:id
    delete(req, res, next) {
        Products.delete({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    // xóa hoàn toàn sản phẩm DELETE /products/:id/force
    async deleteForce(req, res, next) {
        try {
            const product = await Products.findDeleted({ _id: req.params.id });

            // console.log(product[0].cloudinary_id);
            await cloudinary.uploader.destroy(product[0].cloudinary_id);

            await Products.deleteOne({ _id: req.params.id });
            await res.redirect("back");
        } catch {
            next();
            res.json({ errCode: "1", errMessage: "Lỗi xóa hình ảnh" });
        }
    }

    //khôi phục sản phẩm PATCH /products/:id
    reStore(req, res, next) {
        Products.restore({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    //submitForm
    submitForm(req, res, next) {
        const data = req.body;
        switch (data.action) {
            case "1":
                Products.delete({ _id: { $in: data.productIds } })
                    .then(() => res.redirect("back"))
                    .catch(next);
                break;
            default:
                break;
        }
    }
}
const productControllers = new ProductsControllers();
export default productControllers;
