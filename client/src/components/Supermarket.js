import React, { useState, useEffect } from "react";

function Supermarket(props) {
  ////****DATA****////

  const marketName = props.marketName; //supermarket named passed by parent
  const shopId = Number(props.shopId); //supermarket id passed by parent
  const confirmedList = props.confirmedList; //grocery list passed by parent
  const [shopProds, setShopProds] = useState([]); //USESTATE 2
  const [display, setDisplay] = useState([]); // USESTATE 3
  const [total, setTotal] = useState(0); // USESTATE 4

  useEffect(() => {
    getShopsProds();
  }, []);

  useEffect(() => {
    showProductsInShop();
  }, [props.confirmedList, shopProds]);

  useEffect(() => {
    calculateTotalPrice();
  }, [display]);

  async function getShopsProds() {
    try {
      let response = await fetch(`/shop_productitems/${shopId}`);
      if (response.ok) {
        let data = await response.json();
        setShopProds(data);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  ////*** FUNCTIONS FOR VISUALIZATION ****/

  //filter the products by Id with the array of the confirmed list
  const showProductsInShop = async () => {
    const ids =
      props.confirmedList &&
      (await props.confirmedList.map((item) => Number(item.id)));

    const selection =
      ids && shopProds && (await shopProds.filter((p) => ids.includes(+p.id)));

    await setDisplay(selection);
  };

  //calculate total price of the grocery list

  const calculateTotalPrice = async () => {
    let result = 0;
    const ids =
      display.length > 0 &&
      (await display.map((item) => (result += Number(item.price))));
    await setTotal(Number(result));
  };
  return (
    <div>
      <div>
        <img src={props.src} className="table-logo"></img>
      </div>
      <div>
        <table className="table table-bordered border-success padding">
          <thead>
            <tr>
              <th>Product</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Qty(gr)</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {display.length > 0 &&
              display.map((d) => (
                <tr key={d.id}>
                  <td>{d.name}</td>
                  <td>{d.brand}</td>
                  <td>{d.price}€</td>
                  <td>{d.packageQuantity}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <h3>{total.toFixed(2)}€</h3>
    </div>
  );
}
export default Supermarket;
