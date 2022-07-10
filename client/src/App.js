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

  const [confirmedList, setConfirmedList] = useState(""); // USESTATE 1

  ///****  Setting data in Parent */

  const handleConfirmList = (filteredList) => {
    setConfirmedList(filteredList);
  };

  const saveListInParent = () => {}; /// THIS FUNCTION SHOULD POST THE LIST IN THE DB.

  //Components

  return (
    <div className="App">
      <h1>Best Deal</h1>

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
