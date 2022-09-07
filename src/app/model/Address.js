import mongoose from "mongoose";

const { Schema } = mongoose;

const AddressSchema = new Schema(
    {
        userId: { type: String, default: null },
        fullName: { type: String, required: true },
        email: { type: String },
        isDefault: { type: Boolean, required: true, default: false },
        phoneNumber: { type: String, required: true },
        billingAddress: { type: String },
        province: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Address = mongoose.model("Address", AddressSchema);
export default Address;
