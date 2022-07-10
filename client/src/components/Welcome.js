import React from "react";

export default function Welcome(props) {
  const shops = props.shops;

  return (
    <div>
      <h3>Which shops would you like to compare?</h3>
      <form>
        {shops &&
          shops.map((shop) => (
            <label>
              <input type="checkbox" key={shop.id} value={shop.id} />
              {shop.name}
            </label>
          ))}
      </form>
    </div>
  );
}
