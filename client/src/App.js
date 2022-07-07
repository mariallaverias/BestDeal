//***React - React Router Stuff ****
import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

//***Views***
import HomeView from "./views/HomeView";
import AddGroceryListView from "./views/AddGroceryListView";
import MyListsView from "./views/MyListsView";

//***Components***
import Navbar from "./components/Navbar";

function App() {
  //******** */ Data ******

  const [shops, setShops] = useState("");
  const [list, setList] = useState("");
  const [groceryLists, setGroceryList] = useState("");

  useEffect(() => {
    getShops();
  }, []);

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    getGroceryList();
  }, []);

  async function getGroceryList() {
    try {
      let response = await fetch("/grocerylists/");
      if (response.ok) {
        let groceryListData = await response.json();
        setGroceryList(groceryListData);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  async function getList() {
    try {
      let response = await fetch("/list/");
      if (response.ok) {
        let listData = await response.json();
        setList(listData);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  async function getShops() {
    try {
      let response = await fetch("/shops/");
      if (response.ok) {
        let shopsData = await response.json();
        setShops(shopsData);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  //***VISUALIZATION *****/
  return (
    <div className="App">
      <h1>Hello Im the front end App</h1>

      <Navbar />

      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/AddGroceryList" element={<AddGroceryListView />} />
        <Route path="/myLists" element={<MyListsView />} />
      </Routes>
    </div>
  );
}

export default App;
