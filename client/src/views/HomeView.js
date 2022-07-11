import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import Supermarket from "../components/Supermarket";
import Welcome from "../components/Welcome";

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
      (await confirmedList.map((p) => <li key={p.id}>{p.name}</li>));
    setDisplayList(display);
  };

  const saveList = () => {
    props.saveListInParent();
  };

  return (
    <div>
      <Welcome shops={shops} shopsSelected={(shops) => shopsSelected(shops)} />
      <div>{displayList}</div>
      <div>
        {confirmedList ? (
          <Button function={saveList} buttonName="Save List" />
        ) : null}
      </div>

      <table>
        <thead>
          <tr>
            <td>
              {props.selectedShops.includes("1") ? (
                <Supermarket
                  marketName="Superdona"
                  shopId="1"
                  confirmedList={props.confirmedList}
                ></Supermarket>
              ) : null}
            </td>
            <td>
              {props.selectedShops.includes("2") ? (
                <Supermarket
                  marketName="Corte Escocés"
                  shopId="2"
                  confirmedList={props.confirmedList}
                ></Supermarket>
              ) : null}
            </td>
            <td>
              {props.selectedShops.includes("3") ? (
                <Supermarket
                  marketName="Anacard"
                  shopId="3"
                  confirmedList={props.confirmedList}
                ></Supermarket>
              ) : null}
            </td>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default HomeView;
