import React, { useState, useEffect } from "react";

function Button(props) {
  const handleSubmit = () => {
    props.function();
  };

  return (
    <div>
      <button
        className="btn btn-outline-success btn-lg "
        onClick={handleSubmit}
      >
        {props.buttonName}
      </button>
    </div>
  );
}
export default Button;
