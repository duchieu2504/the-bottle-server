import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

// kết nối với mongoDB
const connect = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.USERNAMEMONGDB}:${process.env.PASSWORD}@the-bottle.ujjp7e3.mongodb.net/?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        // await mongoose.connect("mongodb://localhost:27017/myshop-backend");
        console.log("MongoDB connected");
    } catch (err) {
        console.log("ERROR", err.message);
    }
};
export default connect;
