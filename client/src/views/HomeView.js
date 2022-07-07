import React from "react";

function HomeView(props) {
  const products = props.products;

  return (
    <div>
      <h2>im the home view</h2>

      {/* {products && products.map((p) => <p key={p.id}>{p.name}</p>)} */}
    </div>
  );
}

export default HomeView;
