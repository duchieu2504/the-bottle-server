import Products from "../model/Products.js";
import Reviews from "../model/Reviews.js";

class ReviewControllers {
    //POST :productId
    async create(req, res, next) {
        try {
            const result = req.body;
            const {
                comment_review,
                displayName_review,
                star,
                title_review,
                uid,
            } = result;
            const data = {
                comment: comment_review,
                displayName: displayName_review,
                star: star,
                title: title_review,
                userId: uid,
                productId: req.params.productId,
            };
            const review = new Reviews(data);
            review.save();
            res.json({ errCode: 0, message: "POST Sucess" });
        } catch (err) {
            res.status(500).json({ errCode: 1, message: err.message });
        }
    }

    // lay  danh gia san pham cua nguoi dung
    async getReviewProductUser(req, res, next) {
        try {
            const reviews = await Reviews.find({
                productId: req.query.productId,
                userId: req.query.userId,
            });
            res.json(reviews);
        } catch (err) {
            res.status(404).json({ errCode: 1, message: err.message });
        }
    }

    // lấy thông số các đánh giá
    async getReviewProductParameter(req, res, next) {
        try {
            const starNum = [5, 4, 3, 2, 1];
            const amountStar = async (star) => {
                const result = await Reviews.find({
                    productId: req.params.productId,
                    star: `${star}`,
                }).countDocuments();
                return result;
            };

            const parameterPromise = async () => {
                const promise = starNum.map(async (i) => {
                    const amount = await amountStar(i);
                    return await {
                        amount: amount,
                        star: i,
                    };
                });
                return await Promise.all(promise);
            };
            const parameter = await parameterPromise();
            const total = await Reviews.countDocuments({
                productId: req.params.productId,
            });
            const average_rating = parameter.reduce((result, para) => {
                const average = (para.amount * para.star) / total;
                return result + average;
            }, 0);
            res.json({
                totalReviews: total,
                parameter: parameter,
                average_rating: +average_rating.toFixed(2) || 0,
            });
        } catch (err) {
            res.status(404).json({ errCode: 1, message: err.message });
        }
    }

    // lay tat ca danh gia san pham theo pagination
    async getAllReview(req, res, next) {
        try {
            const productId = req.params.productId;

            const total = await Reviews.countDocuments();

            const _page = req.query._page;
            const _limit = req.query._limit;
            const skipNum = total < _limit ? 0 : (_page - 1) * _limit;
            const data = await Reviews.find({ productId: productId })
                .limit(_limit)
                .skip(skipNum);
            // res.json(data);
            await res.json({
                data: data,
                pagination: {
                    _page: +_page,
                    _limit: +_limit,
                    totalReviews: total,
                },
            });
        } catch (err) {
            res.status(404).json({ errCode: 1, message: err.message });
        }
    }

    // lấy tối đa 3   riview để hiện thị review feature
    async getReviewFeature(req, res, next) {
        try {
            const productId = req.params.productId;
            const data = await Reviews.find({ productId: productId })
                .sort({
                    star: "desc",
                })
                .limit(3);
            res.json(data);
        } catch (err) {
            res.status(404).json({ errCode: 1, message: err.message });
        }
    }

    // cap nhat danh gia cua người dùng tai 1 san pham
    async update(req, res, next) {
        try {
            const data = req.body;
            const userId = req.params.userId;
            const productId = req.params.productId;
            const { comment_review, displayName_review, title_review } = data;
            const review = await Reviews.findOne({
                userId: userId,
                productId: productId,
            });
            await Reviews.updateOne(
                { _id: review._id },
                {
                    ...data,
                    comment: comment_review,
                    displayName: displayName_review,
                    title: title_review,
                }
            );
            res.json({ errCode: 0, message: "SUCCESS UPDATE REVIEW" });
        } catch (err) {
            res.status(404).json({ errCode: 1, message: err.message });
        }
    }
}

const reviewControllers = new ReviewControllers();
export default reviewControllers;
