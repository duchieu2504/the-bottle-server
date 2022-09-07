import cloudinary from "../../until/cloudinary.js";
import { mutipleMongooseToObject } from "../../until/mongooseObject.js";
import Products from "../model/Products.js";

class ApiControllers {
    //get /products
    async getProducts(req, res, next) {
        const apiProducts = await Products.find({});
        try {
            const result = async () => {
                let promise = apiProducts.map(async (i) => {
                    const item = i.toObject();
                    const { resources } = await cloudinary.search
                        .expression(
                            `folder:dev_the_bottle AND public_id:${item.cloudinary_id}`
                        )
                        .sort_by("public_id", "desc")
                        .max_results(30)
                        .execute();
                    const urlImage = resources.map((file) => file.secure_url);
                    return await { ...item, image: urlImage[0] };
                });
                return await Promise.all(promise);
            };
            const data = await result();
            // console.log(data);
            res.status(200).json(data);
        } catch (err) {
            res.json(apiProducts);
        }
        // Products.find()
        //     .lean()
        //     .then((a) => {
        //         console.log(a);
        //         const b = a.map((i) => {
        //             console.log(i.cloudinary_id);
        //             const { resources } = await cloudinary.search
        //                 .expression(
        //                     `folder:dev_the_bottle AND public_id:${i.cloudinary_id}`
        //                 )
        //                 .sort_by("public_id", "desc")
        //                 .max_results(30)
        //                 .execute();

        //             console.log(resources);

        //             const urlImage = resources.map((file) => file.secure_url);
        //         });
        //         return b;
        //     })
        //     .then((product) => res.status(200).json(product))
        //     .catch(next);
    }

    //get /products/image/:cloudinary_id
    async getImage(req, res, next) {
        try {
            const id = req.params.id;
            const product = await Products.findById(id);
            const { resources } = await cloudinary.search
                .expression(
                    `folder:dev_the_bottle AND public_id:dev_the_bottle/nvnhbt8nha8bzrwvppl8`
                )
                .sort_by("public_id", "desc")
                .max_results(30)
                .execute();

            const urlImage = resources.map((file) => file.secure_url);
            console.log(urlImage[0]);
            res.status(200).json({ image: urlImage[0] });
        } catch (err) {
            res.status(500).json({ errCode: "1", mes: "Lỗi tải hình ảnh" });
            next();
        }
    }
}
const apiControllers = new ApiControllers();
export default apiControllers;
