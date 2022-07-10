import React, { useState, useEffect } from "react";

function MyLists() {
  const [lists, setList] = useState("");

  useEffect(() => {
    getLists();
  }, []);

  async function getLists() {
    try {
      let response = await fetch("/list/");
      if (response.ok) {
        let listData = await response.json();
        setList(listData);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div>
      <h2>Im the my lists view</h2>
    </div>
  );
}

export default MyLists;
