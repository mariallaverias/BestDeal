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
      <footer>
        <h6>
          <a href="https://www.freepik.com/vectors/food-graphic">
            Food graphic vector created by rawpixel.com - www.freepik.com
          </a>
        </h6>
      </footer>
    </div>
  );
}

export default MyLists;
