import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/nomineecomp/Header";
import Vaultcard from "../components/getallvaultscomp/Vaultcard";
import "./GetAllVaults.css";
import addbutton from "../assets/plus.png";
import { useNavigate } from "react-router-dom";

function GetAllVaults() {
  const [vaults, setVaults] = useState([]);
  const [isClick, setClick] = useState(true);
  const navigate = useNavigate();

  const fetchmyapi = async () => {
    const token = localStorage.getItem("jwt");
    const res = await axios.get("http://localhost:4000/vault/getAllVaults", {
      headers: {
        Authorization: token,
      },
    });
    setVaults(res.data.filterData);
    console.log(res.data.filterData);
  };

  useEffect(() => {
    fetchmyapi();
  }, [vaults]);

  //   const filterdata = res.data.filterData;
  return (
    <div>
      <div className="page3">
        <Header />
        <div className="vaultHolder">
          {vaults.map((each, index) => {
            return (
              <Vaultcard
                key={index}
                ind={index + 1}
                content={each.v_name}
                nomineenames={each.n_name}
                v_id={each.v_id}
              />
            );
          })}
          <div
            className="vaultcard add"
            onClick={() => {
              navigate("/addVault");
            }}
          >
            <img src={addbutton} alt="" />
          </div>
        </div>
      </div>
      {/* {isClick && (
        <div className="deletepopup">
          <div className="content">
            <h1>Enter Password</h1>
            <input
              type="password"
              className="deletepassword"
              placeholder="Enter Login Password"
            />
            <div className="buttons">
              <button className="delete">Delete</button>
              <button className="cancel">Cancel</button>
            </div>
            <div className="circle1"></div>
            <div className="circle2"></div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default GetAllVaults;
