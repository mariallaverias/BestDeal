var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var shopsRouter = require("./routes/shops");
var productsRouter = require("./routes/products");
var productCategoriesRouter = require("./routes/productCategories");
var listRouter = require("./routes/list");
var groceryListtRouter = require("./routes/groceryLists");
var shop_productitems = require("./routes/shop_productitems");

var app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/shops", shopsRouter);
app.use("/products", productsRouter);
app.use("/productCategory", productCategoriesRouter);
app.use("/list", listRouter);
app.use("/grocerylists", groceryListtRouter);
app.use("/shop_productitems", shop_productitems);

module.exports = app;
