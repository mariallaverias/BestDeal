import React, { useState, useEffect } from "react";

function Button(props) {
  const handleSubmit = () => {
    props.function();
  };

  return (
    <div>
      <button onClick={handleSubmit}>{props.buttonName}</button>
    </div>
  );
}
export default Button;
