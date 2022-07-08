var express = require("express");
var router = express.Router();
const db = require("../model/helper");

//***GUARD***/
async function listMustExist(req, res, next) {
  try {
    const { id } = req.params;
    const result = await db(`SELECT * FROM list WHERE id=${id}`);
    if (result.data.length) {
      next();
    } else res.status(404).send({ message: "List not found" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

router.get("/", async function (req, res, next) {
  try {
    const result = await db("SELECT * from list");
    res.status(200).send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("/:id", listMustExist, async function (req, res, next) {
  try {
    const { id } = req.params;
    const result = await db(`SELECT * FROM list WHERE id=${id}`);
    res.status(200).send(result.data[0]);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post("/", async function (req, res, next) {
  const { products } = req.body;
  let sql = `INSERT INTO list (products) VALUES ("${products}")`;
  try {
    await db(sql);
    const result = await db("SELECT * from list");
    res.status(201).send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.delete("/:id", listMustExist, async function (req, res, next) {
  const { id } = req.params;
  let sql = `DELETE FROM list WHERE id=${id};`;
  try {
    await db(sql);
    const result = await db("SELECT * from list");
    res.status(200).send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
