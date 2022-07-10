import React, { useState, useEffect } from "react";

function ButtonConfirmList(props) {
  const handleSubmit = () => {
    props.handleConfirmList();
  };

  return (
    <div>
      <button onClick={handleSubmit}>Confirm List</button>
    </div>
  );
}
export default ButtonConfirmList;
