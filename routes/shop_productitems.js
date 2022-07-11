var express = require("express");
var router = express.Router();
const db = require("../model/helper");

//**GUARD***/
async function shopMustExist(req, res, next) {
  try {
    const { id } = req.params;
    const result = await db(
      `SELECT * FROM shops_productitems WHERE fk_shopID=${id}`
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

//JUNCTION TABLE - returns all the products in a shop by shopId, along with the details of the products

router.get("/:id", shopMustExist, async function (req, res, next) {
  try {
    const { id } = req.params;
    const sql = `SELECT sp.*, pi.*,  sp.fk_productId AS productId
    FROM shops_productItems AS sp
    LEFT JOIN productitems AS pi ON sp.fk_productId = pi.id
    WHERE fk_shopID=${id} `;

    const result = await db(sql);
    res.status(200).send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
