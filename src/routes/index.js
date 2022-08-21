import productsRouter from "./products.js";

const routes = (app) => {
    app.use("/products", productsRouter);
};

export default routes;
