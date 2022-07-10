import React, { useState, useEffect } from "react";

export default function Welcome(props) {
  const shops = props.shops;
  const [checked, setChecked] = useState("");

  const handleClick = (event) => {
    console.log(event);
    const clicked = event.target.value;
    console.log(clicked);
    setChecked([...checked, clicked]);
  };

  return (
    <div>
      <h3>Which shops would you like to compare?</h3>
      <form>
        {shops &&
          shops.map((shop) => (
            <label key={shop.id}>
              <input
                id={shop.id}
                type="checkbox"
                key={shop.name}
                onClick={handleClick}
                value={shop.id}
              />
              {shop.name}
            </label>
          ))}
      </form>
    </div>
  );
}
