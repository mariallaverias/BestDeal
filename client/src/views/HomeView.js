import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import Supermarket from "../components/Supermarket";
import Welcome from "../components/Welcome";

import Anacard from "../images/Anacard.jpg";
import Superdona from "../images/Superdona.jpg";
import CorteEscoces from "../images/CorteEscoces.jpg";

function HomeView(props) {
  const [shops, setShops] = useState(""); // USESTATE 1
  const [displayList, setDisplayList] = useState([]); // USESTATE 2
  const navigate = useNavigate();
  const confirmedList = props.confirmedList;
  const selectedShops = props.selectedShops;

  useEffect(() => {
    getShops();
  }, []);

  useEffect(() => {
    renderList();
  }, [props.confirmedList]);

  async function getShops() {
    try {
      let response = await fetch("/shops/");
      if (response.ok) {
        let shopsData = await response.json();
        setShops(shopsData);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  const shopsSelected = (shops) => {
    props.shopsSelected(shops);
  };

  const renderList = async () => {
    const display =
      confirmedList &&
      (await confirmedList.map((p) => (
        <li className="list-group-item" key={p.id}>
          {p.name}
        </li>
      )));
    setDisplayList(display);
  };

  const saveList = () => {
    navigate("/myLists");
  };

  //Code to refreshPage from: https://upmostly.com/tutorials/how-to-refresh-a-page-or-component-in-react
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="App Container">
      {!displayList ? (
        <Welcome
          shops={shops}
          shopsSelected={(shops) => shopsSelected(shops)}
        />
      ) : null}

      <div>
        <ul className="list-group">{displayList}</ul>
      </div>
      <div>
        {/* {confirmedList ? (
          <Button function={saveList} buttonName="Save List" />
        ) : null} */}
        {confirmedList ? (
          <button className="btn  btn-warning" onClick={saveList}>
            Save List
          </button>
        ) : null}
      </div>
      <div className="container">
        <table className="table responsive">
          <thead>
            <tr>
              <td>
                {props.selectedShops.includes("1") ? (
                  <Supermarket
                    marketName="Superdona"
                    shopId="1"
                    confirmedList={props.confirmedList}
                    src={Superdona}
                  ></Supermarket>
                ) : null}
              </td>
              <td>
                {props.selectedShops.includes("2") ? (
                  <Supermarket
                    marketName="Corte Escocés"
                    shopId="2"
                    confirmedList={props.confirmedList}
                    src={CorteEscoces}
                  ></Supermarket>
                ) : null}
              </td>
              <td>
                {props.selectedShops.includes("3") ? (
                  <Supermarket
                    marketName="Anacard"
                    shopId="3"
                    confirmedList={props.confirmedList}
                    src={Anacard}
                  ></Supermarket>
                ) : null}
              </td>
            </tr>
          </thead>
        </table>
      </div>
      {displayList ? (
        <button
          className="btn btn-outline-success btn-lg"
          onClick={refreshPage}
        >
          New Grocery List
        </button>
      ) : null}
    </div>
  );
}

export default HomeView;
