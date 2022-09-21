import Products from "../model/Products.js";
import Address from "../model/Address.js";
import cloudinary from "../../until/cloudinary.js";

class SearchControllers {
    async search(req, res, next) {
        try {
            const result = await Products.aggregate()
                .search({
                    autocomplete: {
                        query: `${req.query.title}`,
                        path: "title",
                        fuzzy: {
                            maxEdits: 2, // số ký tư tố đa bi lỗi trong tư ngư tim kiem, đây là toán tư làm mof, chinh sua toi da 2 ky tu
                        },
                    },
                })
                .limit(10)
                .project({
                    _id: 1,
                    title: 1,
                    category: 1,
                    cloudinary_id: 1,
                });
            const resultGetImage = async () => {
                let promise = result.map(async (item) => {
                    // console.log(i);
                    // const item = i.toObject();
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
            const data = await resultGetImage();
            await res.json(data);
        } catch (err) {
            res.status(500).json({ errCode: 1, message: err.message });
        }
    }
}

const searchController = new SearchControllers();
export default searchController;
