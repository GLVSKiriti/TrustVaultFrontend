import React, { useState } from "react";
import vaultlogo from "../../assets/vault.png";
import usernamelogo from "../../assets/username.png";
import deletelogo from "../../assets/icons8-delete.svg";
import DropDownItem from "./DropDownItem";

function Vaultcard(props) {
  const [isclicked, setClicked] = useState(false);
  let vnamecalss = "vaultname";

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
        className="vaultcard2"
        onMouseOver={() => setClicked(true)}
        onMouseLeave={() => setClicked(false)}
      >
        <div className="vaultcard">
          <img src={vaultlogo} alt="" />
        </div>
        <span className={vnamecalss}>{props.content}</span>
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
