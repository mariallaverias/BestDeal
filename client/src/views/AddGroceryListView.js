import React, { useState, useEffect } from "react";

function AddGroceryListView(props) {
  //******** */ Data ******

  const [allProducts, setProducts] = useState("");
  const [productCategories, setProductCategories] = useState("");
  const [shopProducts, setShopProducts] = useState("");
  const [tagProdCat, setTagProdCat] = useState("");
  const [tagProducts, setTagProducts] = useState("");
  const [selectedProdCat, setSelectedProdCat] = useState(productCategories[0]);
  const [filteredProducts, setFilteredProducts] = useState(null);

  useEffect(() => {
    getProducts();
    getProductCategories();
    getShopProducts();
  }, []);

  async function getProductCategories() {
    try {
      let response = await fetch("/productcategory/");
      if (response.ok) {
        let prodCategoriesData = await response.json();
        setProductCategories(prodCategoriesData);
        listProductCategories(prodCategoriesData);
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
        listProducts(productData);
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

  //***FUNCTIONS FOR VISUALIZARION */

  // Map all the product categories
  const listProductCategories = (categories) => {
    const productCategoriesList = categories.map((pC) => (
      <option key={pC.id} value={pC.id}>
        {pC.name}
      </option>
    ));
    setTagProdCat(productCategoriesList);
  };

  const listProducts = (items) => {
    const filterproducts = items.filter(
      (p) => p.fk_productCategoryId === Number(selectedProdCat)
    );
    setFilteredProducts(filterproducts);

    const productList = filteredProducts.map((p) => (
      <option key={p.id} value={p.name} />
    ));

    setTagProducts(productList);
  };

  const handleChange = (event) => {
    setSelectedProdCat(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
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
            onChange={handleChange}
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
          <input
            list="filteredProducts"
            name="productsInCategory"
            id="productsInCategory"
          />
          <datalist id="filteredProducts">{tagProducts}</datalist>
          <button>+</button>
        </div>
      </form>
    </div>
  );
}

export default AddGroceryListView;
