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
      <div className="container">
        <h2>My Lists</h2>
        <div>
          <form>
            <input
              type="text"
              placeholder="Give your list with a name"
              className="form-control"
            ></input>
            <button className="btn btn-warning">Save</button>
          </form>
        </div>

        <div className="container">
          <h4>Saved Lists</h4>
          <div className="container">
            <form>
              <input type="text"></input>
              <button className="btn btn-outline-success btn-lg">Find</button>
            </form>
          </div>
          <ul className="list-group">
            <li className="list-group-item">Cleaning items</li>
            <li className="list-group-item">Cooking for 8: dominincan</li>
            <li className="list-group-item">Cooking for 8: christmas</li>
            <li className="list-group-item"> Weekly vegetables and fruits</li>
          </ul>
        </div>
      </div>

      <footer>
        <p>
          <a href="https://www.freepik.com/vectors/food-graphic">
            Food graphic vector created by rawpixel.com - www.freepik.com
          </a>
        </p>
      </footer>
    </div>
  );
}

export default MyLists;
