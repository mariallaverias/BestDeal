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

  // *****Functions to display Drop Down in Form*****//

  // Creates Product Categories Dropdown
  const listProductCategoriesMenu = async (categories) => {
    const productCategoriesList = await productCategories.map((pC) => (
      <option key={pC.id} value={pC.id}>
        {pC.name}
      </option>
    ));
    setTagProdCat(productCategoriesList);
  };

  // Creates dropdown with Filtered Products based on category
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

  //sets state with the product category selected
  const handleCategoryChange = (event) => {
    setSelectedProdCat(event.target.value);
  };

  //updates items added to grocery list
  const handleSubmit = (event) => {
    event.preventDefault();
    let newItems = [...items, selectedProd];

    setItems(newItems);
    props.listGroceryList(newItems);
  };

  // I want to show the selected product in the list div.
  // I have to grab the product Id saved as State in Selected Prod

  const handleProductChange = (event) => {
    setSelectedProd(event.target.value);
  };

  return (
    <div className="container">
      <h2>What would you like to buy?</h2>
      <div className="container">
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
              className="form-select form-select-l mb-3"
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
              className="form-select inline"
              value={selectedProd}
              onChange={handleProductChange}
              defaultValue={"default"}
            >
              <option className="inline" value="default" disabled>
                Select product
              </option>
              {tagProducts}
            </select>
            <button
              className="inline 
            btn btn-outline-success btn-lg"
              onSubmit={handleSubmit}
            >
              +
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default SelectGroceriesForm;
