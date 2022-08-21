import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductsSchema = new Schema(
    {
        title: { type: String, required: true },
        descriptions: { type: String, required: true },
        category: { type: String, required: true },
        price: { type: String, required: true },
        size: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Products = mongoose.model("Products", ProductsSchema);
export default Products;
