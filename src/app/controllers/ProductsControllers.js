import {
    mongooseToObject,
    mutipleMongooseToObject,
} from "../../until/mongooseObject.js";
import Products from "../model/Products.js";

class ProductsControllers {
    show(req, res, next) {
        Products.find()
            .then((product) =>
                res.render("products/show", {
                    product: mutipleMongooseToObject(product),
                })
            )
            .catch(next);
    }
    create(req, res, next) {
        res.render("products/create");
        // Products.create()
    }
    store(req, res, next) {
        const data = req.body;
        const products = new Products(data);
        products
            .save()
            .then(() => res.redirect("/products/show"))
            .catch(next);
        // Products.save
    }
}
const productControllers = new ProductsControllers();
export default productControllers;
