import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VaultDesKeyCard(props) {
  const [vaultSecretKey, SetVaultSecretKey] = useState("");
  const [isclicked, setisclicked] = useState(false);
  const [reso, setreso] = useState("");

  const getVaultData = async () => {
    const res = await axios.post("http://localhost:4000/nominee/vaultData", {
      vault_secret_key: vaultSecretKey,
      v_id: props.v_id,
    });

    setreso(res.data.vault_data);
    console.log(res.data);
    setisclicked(true);
  };

  return !isclicked ? (
    <div className="otpcard">
      <h2 className="otpcardheading">Enter The SecretKey</h2>
      <h3>{props.description}</h3>
      <input
        name="vault_secret_key"
        type="text"
        placeholder="Enter Key"
        className="otpemail"
        value={vaultSecretKey}
        onChange={(e) => SetVaultSecretKey(e.target.value)}
      />
      <button
        className="sendotp"
        onClick={(event) => {
          event.preventDefault();
          getVaultData();
        }}
      >
        Submit
      </button>
      <div className="circle1"></div>
      <div className="circle2"></div>
    </div>
  ) : (
    <div className="datacard">
      <div className="upper">
        <h1 className="datacardheading">Vault Data From The User</h1>
        <div className="circle1new"></div>
      </div>

      <div className="datacardcontent">{reso}</div>
      <div className="circle2new"></div>
    </div>
  );
}

export default VaultDesKeyCard;
