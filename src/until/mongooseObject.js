export const mutipleMongooseToObject = (mongooses) => {
    return mongooses.map((mongoose) => mongoose.toObject());
};
export const mongooseToObject = (mongooses) => {
    return mongooses ? mongooses.toObject() : mongooses;
};
