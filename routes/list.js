var express = require("express");
var router = express.Router();
const db = require("../model/helper");

//***GUARD***/
async function productListMustExist(req, res, next) {
  try {
    const { id } = req.params;
    const result = await db(`SELECT * FROM List WHERE id=${id}`);
    if (result.data.length) {
      next();
    } else res.status(404).send({ message: "List not found" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

router.get("/", async function (req, res, next) {
  try {
    const result = await db("SELECT * from List");
    res.status(200).send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("/:id", productListMustExist, async function (req, res, next) {
  try {
    const { id } = req.params;
    const result = await db(`SELECT * FROM List WHERE id=${id}`);
    res.status(200).send(result.data[0]);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
