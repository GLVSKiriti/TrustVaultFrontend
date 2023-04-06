import React, { useState } from "react";
import axios from "axios";

function DropDownItem(props) {
  const [ishover, setHover] = useState(false);
  const nominee = props.n_name;

  const deleteVault = async () => {
    const password = prompt("Enter password");
    const token = sessionStorage.getItem("jwt");
    const res = await axios.delete(
      `http://localhost:4000/vault/deleteVault/${props.v_id}`,
      {
        headers: {
          Authorization: token,
        },
        data: {
          password: password,
        },
      }
    );

    console.log(res.data.message);
  };

  return (
    <div
      className="item"
      onMouseOver={() => {
        if (props.content === "Nominees") {
          setHover(true);
        }
      }}
      onMouseLeave={() => {
        if (props.content === "Nominees") {
          setHover(false);
        }
      }}
      onClick={() => {
        if (props.content === "Delete") {
          deleteVault();
        }
      }}
    >
      <img src={props.image} alt="" />
      <p>{props.content}</p>
      {ishover ? (
        <div className="nominees">
          {nominee.map((each, index) => {
            if (index + 1 === nominee.length) {
              return <div key={index}>{each.n_name}</div>;
            }
            return <div key={index}>{each.n_name + ","}</div>;
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default DropDownItem;
