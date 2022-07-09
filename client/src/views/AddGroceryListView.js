import React, { useState, useEffect } from "react";

function AddGroceryListView(props) {
  //*********/ Data ******

  const [allProducts, setProducts] = useState([]); //STATE 1
  const [productCategories, setProductCategories] = useState([]); //STATE 2
  const [shopProducts, setShopProducts] = useState(""); //STATE 3 // Not sure I need this here, check line 54
  const [tagProdCat, setTagProdCat] = useState(""); //STATE 4
  const [tagProducts, setTagProducts] = useState(""); //STATE 5
  const [selectedProdCat, setSelectedProdCat] = useState(productCategories[0]); //STATE 6
  const [selectedProd, setSelectedProd] = useState(allProducts[0]); //STATE 7
  const [filteredProducts, setFilteredProducts] = useState([]); //STATE 8
  const [items, setItems] = useState([]); //STATE 9
  const [groceryList, setGroceryList] = useState([]); //STATE 10
  const [listedItems, setListedItems] = useState([]); //STATE 11

  useEffect(() => {
    getProducts();
    getProductCategories();
    getShopProducts();
  }, []);

  useEffect(() => {
    listProductsMenu();
  }, [selectedProdCat]);

  useEffect(() => {
    listGroceryList();
  }, [items]);

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
  /// TO DELETE? check if i need this here (REFER TO STATE 3)
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

  //***FUNCTIONS FOR VISUALIZATION *****/

  // Product Categories Dropdown
  const listProductCategoriesMenu = (categories) => {
    const productCategoriesList = categories.map((pC) => (
      <option key={pC.id} value={pC.id}>
        {pC.name}
      </option>
    ));
    setTagProdCat(productCategoriesList);
  };

  // Filtered Products based on category Dropdown
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

  //Based on selected products, list them.

  const listGroceryList = async () => {
    const ids = items.length && items.map((item) => +item); // turn the added id's into numbers
    const filteredList =
      ids && ids.length && allProducts.filter((p) => ids.includes(+p.id)); // filters the products that match those ids

    const x =
      (await filteredList.length) &&
      (await filteredList.map((p) => <li key={p.id}>{p.name}</li>)); // creates the <LI's to print>

    setGroceryList([x]);
  };

  //********Functions for handling changes and submit ********

  //To set state with the selected category so that I can use it to filter:
  const handleCategoryChange = (event) => {
    setSelectedProdCat(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setItems([...items, selectedProd]);
    listGroceryList();
    // I want to show the selected product in the list div.
    // I have to grab the product Id saved as State in Selected Prod
  };

  const handleProductChange = (event) => {
    setSelectedProd(event.target.value);
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
          {/* {items.map((item, i) => {
            return <li key={i}>{item}</li>;
          })} */}
          {groceryList}
        </ul>
      </div>
    </div>
  );
}

export default AddGroceryListView;
