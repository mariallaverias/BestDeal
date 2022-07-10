import React, { useState, useEffect } from "react";
import ButtonSaveList from "../components/ButtonSaveList";
import SuperDona from "../components/SuperDona";

function HomeView(props) {
  const [displayList, setDisplayList] = useState();
  const confirmedList = props.confirmedList;

  useEffect(() => {
    renderList();
  }, [confirmedList]);

  const renderList = async () => {
    const display = await confirmedList.map((p) => (
      <li key={p.id}>{p.name}</li>
    ));
    setDisplayList(display);
  };

  const saveList = () => {
    props.saveListInParent();
  };

  return (
    <div>
      <h2>im the home view</h2>
      {displayList}

      {confirmedList ? <ButtonSaveList saveList={saveList} /> : null}

      <div>
        <table className="table center">
          <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
          </tr>
          <tr>
            <td>Component 1</td>
            <td>Component 2</td>
            <td>Component 3</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default HomeView;
