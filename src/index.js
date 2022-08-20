const express = require("express");
const path = require("path");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const app = express();
const port = 8080;

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources", "views"));

app.use(morgan("combined"));

app.get("/", (req, res) => {
    res.render("home");
});

// routes.app()

app.listen(port);
