import React, { useState, useEffect } from "react";

//I cant make it print and stay listed all the items. they pass correctly from the component.

//****Components *******/

import SelectGroceriesForm from "../components/SelectGroceriesForm";
import DisplayGroceryList from "../components/DisplayGroceryList";
import Button from "../components/Button";

function AddGroceryListView(props) {
  //*********/ Data ******

  const [allProducts, setProducts] = useState([]); //STATE 1
  const [productCategories, setProductCategories] = useState([]); //STATE 2
  const [newItems, setNewItems] = useState([]); // STATE 3
  const [filteredList, setFilteredList] = useState([]); // STATE 4

  useEffect(() => {
    getProducts();
    getProductCategories();
  }, []);

  useEffect(() => {
    setFilteredList();
  }, [newItems]);

  async function getProductCategories() {
    try {
      let response = await fetch("/productcategory/");
      if (response.ok) {
        let prodCategoriesData = await response.json();
        setProductCategories(prodCategoriesData);
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
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  //SETTING STATE RECEIVED FROM CHILDREN

  const listGroceryList = async (items) => {
    setNewItems(items);

    const ids = items && (await items.map((item) => +item)); // turn the added id's into numbers

    const y = ids && (await allProducts.filter((p) => ids.includes(+p.id))); // filters the products that match those ids

    setFilteredList(y);
  };

  const removeFromFilteredList = (item) => {
    let id = Number(item);
    let newFilteredList = filteredList.filter((items) => items.id !== id);

    console.log(newFilteredList);
    setFilteredList(newFilteredList);
  };

  // PASING TO PARENT
  const handleConfirmList = () => {
    props.handleConfirmList(filteredList);
  };

  return (
    <div>
      <SelectGroceriesForm
        allProducts={allProducts}
        productCategories={productCategories}
        listGroceryList={listGroceryList}
      />
      <DisplayGroceryList
        allProducts={allProducts}
        filteredList={filteredList}
        removeFromFilteredList={removeFromFilteredList}
      />
      {newItems && newItems.length > 0 ? (
        <Button function={handleConfirmList} buttonName="Confirm List" />
      ) : null}
      {/***LIST OF ITEMS IN THE GROCERY LIST****/}
    </div>
  );
}

export default AddGroceryListView;
