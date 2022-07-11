import React, { useState, useEffect } from "react";

function DisplayGroceryList(props) {
  const filteredList = props.filteredList;
  const [groceryList, setGroceryList] = useState([]);

  useEffect(() => {
    showItems();
  }, [props.filteredList]);

  const showItems = async () => {
    const x =
      props.filteredList &&
      props.filteredList.map((p) => <li key={p.id}>{p.name}</li>); // creates the <LI's to print>
    setGroceryList([x]);
  };

  // const handleSubmit = () => {
  //   props.addList();
  // };
  return (
    <div>
      <h3>Grocery List</h3>
      <ul>{groceryList}</ul>

      {/* <button onClick={handleSubmit}>Confirm List</button> */}
    </div>
  );
}
export default DisplayGroceryList;
