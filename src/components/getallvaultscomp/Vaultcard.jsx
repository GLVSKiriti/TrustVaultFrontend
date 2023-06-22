import React, { useState } from "react";
import vaultlogo from "../../assets/vault.png";
import usernamelogo from "../../assets/username.png";
import deletelogo from "../../assets/icons8-delete.svg";
import DropDownItem from "./DropDownItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DisResContext from "../displayvaultcomp/DisResContext";
import { useContext } from "react";

function Vaultcard(props) {
  const [isclicked, setClicked] = useState(false);
  let vnamecalss = "vaultname";
  const navigate = useNavigate();

  const { dispRes1, setDispRes } = useContext(DisResContext);

  const displayVaultfunc = async () => {
    const token = sessionStorage.getItem("jwt");
    const vsk = prompt("Enter the Vault Secret Key");
    const res = await axios.post(
      "http://localhost:4000/vault/displayVault",
      {
        vId: props.v_id,
        vaultSecretKey: vsk,
      },
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    setDispRes(res.data);
    // console.log(dispRes1);
  };
  if (Object.keys(dispRes1).length !== 0) {
    navigate("/displayVault");
  }

  if (props.ind % 3 === 1) {
    vnamecalss = "vaultname one";
  } else if (props.ind % 3 === 2) {
    vnamecalss = "vaultname two";
  } else {
    vnamecalss = "vaultname three";
  }

  return (
    <div className="holder">
      <div
        data-testid="vaultcard2"
        className="vaultcard2"
        onMouseOver={() => setClicked(true)}
        onMouseLeave={() => setClicked(false)}
      >
        <div
          data-testid="vaultcard"
          className="vaultcard"
          onClick={() => {
            displayVaultfunc();
          }}
        >
          <img src={vaultlogo} alt="" />
        </div>
        <span
          data-testid="vaultname"
          className={vnamecalss}
          onClick={() => {
            displayVaultfunc();
          }}
        >
          {props.content}
        </span>
        {isclicked ? (
          <div className="dropdownmenu">
            <ul>
              <DropDownItem
                key="0"
                image={usernamelogo}
                content="Nominees"
                n_name={props.nomineenames}
              />
              <DropDownItem
                key="1"
                image={deletelogo}
                content="Delete"
                v_id={props.v_id}
              />
            </ul>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Vaultcard;
