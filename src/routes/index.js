import productsRouter from "./products.js";
import apiRouter from "./api.js";

const routes = (app) => {
    app.use("/products", productsRouter);
    app.use("/api", apiRouter);
};

export default routes;
