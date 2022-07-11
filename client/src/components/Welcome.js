import React, { useState, useEffect } from "react";
import Button from "./Button";

export default function Welcome(props) {
  const shops = props.shops;
  const [checked, setChecked] = useState("");
  const [selectedShops, setSelectedShops] = [];

  const handleClick = (event) => {
    if (event.target.checked) {
      const clicked = event.target.name;
      setChecked([...checked, clicked]);
    } else if (!event.target.checked) {
      const unclicked = event.target.name;
      const updated = checked.filter((e) => e !== unclicked);
      setChecked(updated);
    }
  };

  const handleSubmit = (event) => {
    console.log("handlesubmit called");
    event.preventDefault();
    props.shopsSelected(checked);
  };

  return (
    <div>
      <h3>Which shops would you like to compare?</h3>
      <form onSubmit={handleSubmit}>
        {props.shops &&
          props.shops.map((shop) => (
            <label key={shop.shopId}>
              <input
                name={shop.shopId}
                type="checkbox"
                key={shop.name}
                onClick={handleClick}
                value={shop.shopId}
              />
              {shop.name}
            </label>
          ))}
        <button type="submit"> Add Grocery List</button>
      </form>
    </div>
  );
}
