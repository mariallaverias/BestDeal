var express = require("express");
var router = express.Router();
const db = require("../model/helper");

//**GUARD***/
async function shopMustExist(req, res, next) {
  try {
    const { id } = req.params;
    const result = await db(
      `SELECT * FROM shops_productiItems WHERE fk_shopID=${id}`
    );
    if (result.data.length) {
      next();
    } else res.status(404).send({ message: "Shop does not exist" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
/* GET shops product items junction table*/

router.get("/", async function (req, res, next) {
  try {
    const result = await db("SELECT * FROM shops_productItems");
    res.status(200).send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const result = await db(
      `SELECT * FROM shops_productItems WHERE fk_shopID=${id}`
    );
    res.status(200).send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
