//***React - React Router Stuff ****
import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import logo from "./images/Best-Deal.jpg";

//***Views***
import HomeView from "./views/HomeView";
import AddGroceryListView from "./views/AddGroceryListView";
import MyListsView from "./views/MyListsView";

//***Components***
import Navbar from "./components/Navbar";

function App() {
  //********Data ******

  const [confirmedList, setConfirmedList] = useState(""); // USESTATE 1
  const [selectedShops, setSelectedShops] = useState([]); //USESTATE 2
  const navigate = useNavigate();

  ///****  Setting data in Parent */

  const handleConfirmList = (filteredList) => {
    setConfirmedList(filteredList);
    navigate("/");
  };

  const shopsSelected = (shops) => {
    console.log("called");
    setSelectedShops(shops);
    navigate("/AddGroceryList");
  };

  const saveListInParent = () => {}; /// THIS FUNCTION SHOULD POST THE LIST IN THE DB.

  //Components

  return (
    <div>
      <div className="bg">
        <div className="App bg ">
          <div className="container">
            <img
              src={logo}
              alt="Best Deal Logo - save money when buying your groceries"
              className="rounded"
            ></img>
          </div>

          <Navbar />
          <div className="container-md">
            <Routes>
              <Route
                path="/"
                element={
                  <HomeView
                    confirmedList={confirmedList}
                    saveListInParent={saveListInParent}
                    shopsSelected={(shops) => shopsSelected(shops)}
                    selectedShops={selectedShops}
                  />
                }
              />
              <Route
                path="/AddGroceryList"
                element={
                  <AddGroceryListView handleConfirmList={handleConfirmList} />
                }
              />
              <Route path="/myLists" element={<MyListsView />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
