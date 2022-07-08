import React, { useState, useEffect } from "react";

function AddGroceryListView(props) {
  //*********/ Data ******

  const [allProducts, setProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [shopProducts, setShopProducts] = useState("");
  const [tagProdCat, setTagProdCat] = useState("");
  const [tagProducts, setTagProducts] = useState("");
  const [selectedProdCat, setSelectedProdCat] = useState(productCategories[0]);
  const [selectedProd, setSelectedProd] = useState(allProducts[0]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    getProducts();
    getProductCategories();
    getShopProducts();
  }, []);

  useEffect(() => {
    listProductsMenu();
  }, [selectedProdCat]);

  useEffect(() => {}, []);

  async function getProductCategories() {
    try {
      let response = await fetch("/productcategory/");
      if (response.ok) {
        let prodCategoriesData = await response.json();
        setProductCategories(prodCategoriesData);
        listProductCategoriesMenu(prodCategoriesData);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  async function getProducts() {
    try {
      let response = await fetch("/products/");
      if (response.ok) {
        let productData = await response.json();
        setProducts(productData);
        listProductsMenu(productData);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  async function getShopProducts() {
    try {
      let response = await fetch("/shop_productitems");
      if (response.ok) {
        let productData = await response.json();
        setShopProducts(productData);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  //***FUNCTIONS FOR VISUALIZATION */

  // Map all the product categories
  const listProductCategoriesMenu = (categories) => {
    const productCategoriesList = categories.map((pC) => (
      <option key={pC.id} value={pC.id}>
        {pC.name}
      </option>
    ));
    setTagProdCat(productCategoriesList);
  };

  //Based on the product categories, I filter the products to show in the select
  const listProductsMenu = async () => {
    const filterproducts = await allProducts.filter(
      (p) => p.fk_productCategoryId === Number(selectedProdCat)
    );
    setFilteredProducts(filterproducts);

    const productList = await filterproducts.map((p) => (
      <option key={p.id} value={p.id}>
        {p.name}
      </option>
    ));
    setTagProducts(productList);
  };

  //********Functions for handling changes and submit ********

  //To set state with the selected category so that I can use it to filter:
  const handleCategoryChange = (event) => {
    setSelectedProdCat(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setNewItem(selectedProd);
    setItems([...items, newItem]);
    // I want to show the selected product in the list div.
    // I have to grab the product Id saved as State in Selected Prod
  };

  const handleProductChange = (event) => {
    setSelectedProd(event.target.value);
    console.log(event);
  };

  return (
    <div>
      <h2>What would you like to buy?</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Category </label>
          {/* <input
            list="productCategories"
            name="productCategoryChoice"
            id="productCategoryChoice"
            onChange={handleChange}
          /> */}
          <select
            value={selectedProdCat}
            onChange={handleCategoryChange}
            defaultValue={"default"}
          >
            <option value="default" disabled>
              Select product category
            </option>
            {tagProdCat}
          </select>
        </div>
        <div>
          <label> Product </label>
          {
            //Datalist Attempt
            /* <input
            list="filteredProducts"
            name="prodsFiltered"
            id="prodsFiltered"
            autoComplete="off"
            onChange={handleProductChange}
          /> 
          <datalist
          id="filteredProducts"
        >
          {tagProducts}
        </datalist>
          */
          }
          <select
            value={selectedProd}
            onChange={handleProductChange}
            defaultValue={"default"}
          >
            <option value="default" disabled>
              Select product category
            </option>
            {tagProducts}
          </select>
          <button onSubmit={handleSubmit}>+</button>
        </div>
      </form>

      <div>
        <ul>
          {items.map((item, i) => {
            return <li key={i}>{item}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default AddGroceryListView;
