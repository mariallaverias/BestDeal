import React, { useState, useEffect } from "react";

function ButtonSaveList(props) {
  const handleSubmit = () => {
    props.saveList();
  };

  return (
    <div>
      <button onClick={handleSubmit}>Save List</button>
    </div>
  );
}
export default ButtonSaveList;
