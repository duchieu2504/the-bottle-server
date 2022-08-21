import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import { engine } from "express-handlebars";
import morgan from "morgan";
import db from "./config/db/index.js";
import routes from "./routes/index.js";
import methodOverride from "method-override";
import helpers from "./helpers/handlebars.js";

const app = express();
const port = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Xử lý đường dẫn các tệp tĩnh như hình ảnh, file css, tệp JS
app.use(express.static(path.join(__dirname, "public")));

// Connect to DB
db();

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
app.use(methodOverride("_method"));

app.engine(".hbs", engine({ extname: ".hbs", helpers: helpers }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources", "views"));

app.use(morgan("combined"));

app.get("/", (req, res) => {
    res.render("home");
});

routes(app);

app.listen(port);
