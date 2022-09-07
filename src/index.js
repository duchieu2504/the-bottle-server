import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import { engine } from "express-handlebars";
import morgan from "morgan";
import db from "./config/db/index.js";
import routes from "./routes/index.js";
import methodOverride from "method-override";
import helpers from "./helpers/handlebars.js";
import sortMiddleware from "./app/middlewares/middlewares.js";

import cors from "cors";
const app = express();
const PORT = process.env.PORT || 8080;

import * as dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Xử lý đường dẫn các tệp tĩnh như hình ảnh, file css, tệp JS
app.use(express.static(path.join(__dirname, "public")));

// Connect to DB
db();

// xử lý các method post, get
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
app.use(methodOverride("_method"));

// sortMiddleware
app.use(sortMiddleware);

app.use(cors());

// views
app.engine(".hbs", engine({ extname: ".hbs", helpers: helpers }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources", "views"));

app.use(morgan("combined"));

routes(app);

app.listen(PORT);
