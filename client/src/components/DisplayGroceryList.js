import React, { useState, useEffect } from "react";

function DisplayGroceryList(props) {
  const filteredList = props.filteredList;
  const [groceryList, setGroceryList] = useState([]);

  useEffect(() => {
    showItems();
  }, [props.filteredList]);

  //this function creates all the items (<li>) to display in the grocery list
  // each item has also a button to remove it from the list.
  const showItems = async () => {
    const x =
      props.filteredList &&
      props.filteredList.map((p) => (
        <li
          key={p.id}
          className="list-group-item justify-content-between align-items-center"
        >
          <p className=" d-inline ">{p.name}</p>
          <button
            type="button"
            className=" btn btn-danger btn-sm d-inline padding-left: 5px"
            onClick={(id) => props.removeFromFilteredList(p.id)}
          >
            x
          </button>
        </li>
      )); // creates the <LI's to print>
    setGroceryList([x]);
  };

  return (
    <div className="container">
      <h3>Grocery List</h3>
      <div className="container">
        <ul className="list-group">{groceryList}</ul>
      </div>
    </div>
  );
}
export default DisplayGroceryList;
