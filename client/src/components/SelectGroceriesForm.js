import React, { useState, useEffect } from "react";

function SelectGroceriesForm(props) {
  const allProducts = props.allProducts;
  const productCategories = props.productCategories;

  const [tagProdCat, setTagProdCat] = useState(""); //STATE 1
  const [tagProducts, setTagProducts] = useState(""); //STATE 2
  const [selectedProdCat, setSelectedProdCat] = useState(productCategories[0]); //STATE 3
  const [selectedProd, setSelectedProd] = useState(allProducts[0]); //STATE 4
  const [filteredProducts, setFilteredProducts] = useState([]); //STATE 5
  const [items, setItems] = useState([]); //STATE 6

  useEffect(() => {
    listProductCategoriesMenu(productCategories);
    listProductsMenu(allProducts);
  }, [allProducts]);

  useEffect(() => {
    listProductCategoriesMenu(productCategories);
    listProductsMenu(allProducts);
  }, [items]);

  useEffect(() => {
    listProductsMenu();
  }, [selectedProdCat]);

  // useEffect(() => {
  //   props.listGroceryList();
  // }, [items]);

  // *****Functions to display Drop Down in Form*****//

  // Product Categories Dropdown
  const listProductCategoriesMenu = async (categories) => {
    const productCategoriesList = await productCategories.map((pC) => (
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

  //********Functions for handling changes and submit ********

  const handleCategoryChange = (event) => {
    setSelectedProdCat(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let newItems = [...items, selectedProd];

    setItems(newItems);
    props.listGroceryList(newItems);

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
    </div>
  );
}
export default SelectGroceriesForm;
