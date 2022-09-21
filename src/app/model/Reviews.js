import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const { Schema } = mongoose;

const ReviewSchema = new Schema(
    {
        comment: { type: String, required: true },
        title: { type: String, required: true },
        userId: { type: String, required: true },
        displayName: { type: String, required: true },
        star: { type: String, required: true },
        productId: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Reviews = mongoose.model("Reviews", ReviewSchema);
export default Reviews;
