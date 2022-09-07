import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const { Schema } = mongoose;

const ProductsSchema = new Schema(
    {
        title: { type: String, required: true },
        descriptions: { type: String, required: true },
        category: { type: String, required: true },
        classify: { type: String, required: true },
        cloudinary_id: { type: String },
        price: { type: String, required: true },
        size: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);
//custom helper query
ProductsSchema.query.sortProduct = function (req) {
    if (req.query.hasOwnProperty("_sort")) {
        const isValidType = ["asc", "desc"].includes(req.query.type); // xử lý lỗi bảo mật
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : "desc",
        });
    }
    return this;
};

ProductsSchema.query.convertImage = async function (req) {
    try {
        const data = req.body;
        const image = data.image;
        const uploadResponse = await cloudinary.uploader.upload(image, {
            upload_preset: "dev_setups",
        });
        return { ...data, image: uploadResponse.public_id };
    } catch (err) {
        console.log("Lỗi tải Hình ảnh");
    }
};

ProductsSchema.plugin(mongoose_delete, {
    deletedAt: true,
    overrideMethods: "all",
});

const Products = mongoose.model("Products", ProductsSchema);
export default Products;
