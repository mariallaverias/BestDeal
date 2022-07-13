var express = require("express");
var router = express.Router();
const db = require("../model/helper");

//**GUARD***/
async function shopMustExist(req, res, next) {
  try {
    const { id } = req.params;
    const result = await db(`SELECT * FROM shops WHERE shopId=${id}`);
    if (result.data.length) {
      next();
    } else res.status(404).send({ message: "Shop does not exist" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

/* GET shops listing. */
router.get("/", async function (req, res, next) {
  try {
    const result = await db("SELECT * FROM shops;");
    res.status(200).send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
/* GET shops by id. */

router.get("/:id", shopMustExist, async function (req, res, next) {
  try {
    const { id } = req.params;
    const result = await db(`SELECT * FROM shops WHERE shopId=${id}`);
    res.status(200).send(result.data[0]);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
