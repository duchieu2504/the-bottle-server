import mongoose from "mongoose";

// kết nối với mongoDB
const connect = async () => {
    try {
        await mongoose.connect(
            process.env.MONGODB_URI ||
                "mongodb://127.0.0.1:27017/myshop-backend"
        );
    } catch (err) {
        console.log("Connect failure");
    }
};
export default connect;
