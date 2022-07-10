import React, { useState, useEffect, Fragment } from "react";
import Button from "../components/Button";
import Supermarket from "../components/Supermarket";
import Welcome from "../components/Welcome";

function HomeView(props) {
  const [shops, setShops] = useState(""); // USESTATE 1

  const [displayList, setDisplayList] = useState(); // USESTATE 2

  const confirmedList = props.confirmedList;

  useEffect(() => {
    getShops();
  }, []);

  useEffect(() => {
    renderList();
  }, [confirmedList]);

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
      <div>{displayList}</div>
      <div>
        {confirmedList ? (
          <Button function={saveList} buttonName="Save List" />
        ) : null}
      </div>

      <Welcome shops={shops} />

      <table>
        <thead>
          <tr>
            <td>
              <Supermarket
                marketName="Superdona"
                shopId="1"
                confirmedList={confirmedList}
              ></Supermarket>
            </td>
            <td>
              <Supermarket
                marketName="Corte Escocés"
                shopId="2"
                confirmedList={confirmedList}
              ></Supermarket>
            </td>
            <td>
              <Supermarket
                marketName="Anacard"
                shopId="3"
                confirmedList={confirmedList}
              ></Supermarket>
            </td>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default HomeView;
