var express = require("express");
var router = express.Router();
const db = require("../model/helper");

//***GUARD***/
async function groceryListMustExist(req, res, next) {
  try {
    const { id } = req.params;
    const result = await db(`SELECT * FROM GroceryLists WHERE id=${id}`);
    if (result.data.length) {
      next();
    } else res.status(404).send({ message: "Grocery list not found" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

router.get("/", async function (req, res, next) {
  try {
    const result = await db("SELECT * from GroceryLists");
    res.status(200).send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("/:id", groceryListMustExist, async function (req, res, next) {
  try {
    const { id } = req.params;
    const result = await db(`SELECT * FROM GroceryLists WHERE id=${id}`);
    res.status(200).send(result.data[0]);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
