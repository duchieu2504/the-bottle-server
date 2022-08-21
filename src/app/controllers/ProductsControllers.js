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
    edit(req, res, next) {
        const _id = req.params.id;
        Products.findOne({ _id: _id })
            .then((product) =>
                res.render("products/edit", {
                    product: mongooseToObject(product),
                })
            )
            .catch(next);
    }
    update(req, res, next) {
        const newData = req.body;
        Products.updateOne({ _id: req.params.id }, { ...req.body })
            .then(() => res.redirect("/products/show"))
            .catch(next);
    }
}
const productControllers = new ProductsControllers();
export default productControllers;
