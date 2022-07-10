import React, { useState, useEffect } from "react";

function Supermarket(props) {
  ////****DATA****////
  const marketName = props.marketName;
  const shopId = Number(props.shopId);
  const confirmedList = props.confirmedList;
  const [shopProds, setShopProds] = useState(); //USESTATE 2
  const [display, setDisplay] = useState(); // USESTATE 3
  const [total, setTotal] = useState(); // USESTATE 4

  useEffect(() => {
    getShopsProds();
  }, []);

  useEffect(() => {
    showProductsInShop();
  }, [confirmedList]);

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
      confirmedList && (await confirmedList.map((item) => Number(item.id)));

    const selection =
      ids && shopProds && (await shopProds.filter((p) => ids.includes(+p.id)));

    setDisplay(selection);
  };

  const calculateTotalPrice = async () => {
    let total = 0;
    const ids =
      display && (await display.map((item) => (total += Number(item.price))));
    await setTotal(Number(total));
  };
  return (
    <div>
      <h3>{marketName}</h3>
      <p>{shopId}</p>
      <div>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Qty(gr)</th>
            </tr>
          </thead>
          <tbody>
            {display &&
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
      <h3>{total}€</h3>
    </div>
  );
}
export default Supermarket;
