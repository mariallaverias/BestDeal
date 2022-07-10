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
  //********Data ******

  const [shops, setShops] = useState(""); // USESTATE 3
  const [confirmedList, setConfirmedList] = useState(""); // USESTATE 4

  useEffect(() => {
    getShops();
  }, []);

  /// THIS FUNCTION SHOULD BE USED IN THE MY LISTS SECTION ???

  // useEffect(() => {
  //   getList();
  // }, []);

  // async function getList() {
  //   try {
  //     let response = await fetch("/list/");
  //     if (response.ok) {
  //       let listData = await response.json();
  //       setList(listData);
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }

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

  ///****  Setting data in Parent */

  const handleConfirmList = (filteredList) => {
    setConfirmedList(filteredList);
  };

  const saveListInParent = () => {}; /// THIS FUNCTION SHOULD POST THE LIST IN THE DB.

  //Components

  return (
    <div className="App">
      <h1>Hello Im the front end App</h1>

      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <HomeView
              confirmedList={confirmedList}
              saveListInParent={saveListInParent}
            />
          }
        />
        <Route
          path="/AddGroceryList"
          element={<AddGroceryListView handleConfirmList={handleConfirmList} />}
        />
        <Route path="/myLists" element={<MyListsView />} />
      </Routes>
    </div>
  );
}

export default App;
