import React, { useState } from "react";
import "./AddVault.css";
import deletelogo from "../assets/icons8-delete.svg";
import Header from "../components/nomineecomp/Header";
import DisResContext from "../components/displayvaultcomp/DisResContext";
import { useContext } from "react";
import axios from "axios";

function DisplayVault() {
  // const [dispRes, fetchedvault] = useState({
  //   v_id: "1",
  //   v_name: "test1v1update2",
  //   data: "This is a secured application 12@569.#$ update2",
  //   description: "test1key1update",
  //   nominee: [
  //     {
  //       v_id: 1,
  //       n_email: "utest1n1@gmail.com",
  //       n_name: "utestn1",
  //       n_ph_no: "1234567891",
  //     },
  //     {
  //       v_id: 1,
  //       n_email: "utest1n2@gmail.com",
  //       n_name: "utestn2",
  //       n_ph_no: "1234567891",
  //     },
  //     {
  //       v_id: 1,
  //       n_email: "utest1n3@gmail.com",
  //       n_name: "utestn3",
  //       n_ph_no: "1234567891",
  //     },
  //     {
  //       v_id: 1,
  //       n_email: "utest1n4@gmail.com",
  //       n_name: "utestn4",
  //       n_ph_no: "1234567891",
  //     },
  //   ],
  // });

  const { dispRes1, fetchedvaultorg } = useContext(DisResContext);
  const [dispRes, fetchedvault] = useState(dispRes1);
  const [updatecheck, setUpdateCheck] = useState(false);
  // const [vsk, setvsk] = useState("");
  console.log(dispRes1);
  console.log(dispRes);
  function setvname(val, name) {
    fetchedvault({ ...dispRes, [name]: val });
  }

  function addnominee() {
    console.log(dispRes);
    console.log("lllllllllll");
    console.log(dispRes1);
    let nomDetails = dispRes.nominee;
    nomDetails.push({ n_name: "", n_email: "", n_ph_no: "" });
    fetchedvault({ ...dispRes, nominee: nomDetails });
    console.log(dispRes1);
    console.log(dispRes);
  }

  function deletenominee(index) {
    let nomDetails = dispRes.nominee;
    if (nomDetails.length === 1) {
      alert("Atleast One Nominee is required for a vault");
    } else {
      const list = [...nomDetails];
      list.splice(index, 1);
      fetchedvault({ ...dispRes, nominee: list });
    }
  }

  function handleNomineeChangeDetails(event, index, tag) {
    let nomDetails = dispRes.nominee;
    const update = event.target.value;
    const list = [...nomDetails];
    list[index][tag] = update;
    fetchedvault({ ...dispRes, nominee: list });
  }

  const fetchupdatevaultapi = async () => {
    const token = sessionStorage.getItem("jwt");
    const res = await axios.put(
      `http://localhost:4000/vault/updateVault/${dispRes1.v_id}`,
      dispRes1,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data.message);
  };

  return (
    <div className="page4">
      <Header />
      <div className="addvaultsection">
        <div className="buttonsforaddvault">
          {!updatecheck ? (
            <button
              className="addva"
              onClick={() => {
                setUpdateCheck(true);
              }}
            >
              Edit Vault
            </button>
          ) : (
            <button
              className="addva"
              onClick={() => {
                fetchedvaultorg(dispRes);
                fetchupdatevaultapi();
                setUpdateCheck(false);
              }}
            >
              Save Changes
            </button>
          )}
          {updatecheck && (
            <button
              className="cancelva"
              onClick={() => {
                // navigate("/getAllVaults");
                console.log(dispRes1.nominee);
                fetchedvault(dispRes1);
                setUpdateCheck(false);
              }}
            >
              Cancel
            </button>
          )}
        </div>
        <div className="sec vname">
          <h2>Vault Name</h2>
          {!updatecheck ? (
            <input
              type="text"
              placeholder="Enter Vault Name"
              value={dispRes1.v_name}
            />
          ) : (
            <input
              type="text"
              placeholder="Enter Vault Name"
              value={dispRes.v_name}
              onChange={(event) => {
                setvname(event.target.value, "v_name");
              }}
            />
          )}
        </div>
        <div className="sec data">
          <h2>Data</h2>
          {!updatecheck ? (
            <textarea
              type="text"
              placeholder="Enter Your Data Here"
              // contentEditable
              value={dispRes1.data}
            ></textarea>
          ) : (
            <textarea
              type="text"
              placeholder="Enter Your Data Here"
              contentEditable
              value={dispRes.data}
              onChange={(event) => {
                setvname(event.target.value, "data");
              }}
            ></textarea>
          )}
        </div>
        <h2 className="nomdetailsheading">Nominee Details</h2>
        {!updatecheck ? (
          <div className>
            {dispRes1.nominee.map((each, index) => {
              return (
                <div className="nomineedetails">
                  <h2>Nominee {index + 1}</h2>
                  <input
                    className="nom"
                    type="text"
                    placeholder="Enter Name"
                    value={each.n_name}
                  />
                  <input
                    className="nom"
                    type="email"
                    placeholder="Enter Mail"
                    value={each.n_email}
                  />
                  <input
                    className="nom"
                    type="text"
                    placeholder="Enter Number"
                    value={each.n_ph_no}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className>
            {dispRes.nominee.map((each, index) => {
              return (
                <div className="nomineedetails">
                  <h2>Nominee {index + 1}</h2>
                  <input
                    className="nom"
                    type="text"
                    placeholder="Enter Name"
                    value={each.n_name}
                    onChange={(event) => {
                      handleNomineeChangeDetails(event, index, "n_name");
                    }}
                  />
                  <input
                    className="nom"
                    type="email"
                    placeholder="Enter Mail"
                    value={each.n_email}
                    onChange={(event) => {
                      handleNomineeChangeDetails(event, index, "n_email");
                    }}
                  />
                  <input
                    className="nom"
                    type="text"
                    placeholder="Enter Number"
                    value={each.n_ph_no}
                    onChange={(event) => {
                      handleNomineeChangeDetails(event, index, "n_ph_no");
                    }}
                  />
                  <img
                    onClick={() => {
                      deletenominee(index);
                    }}
                    src={deletelogo}
                    alt=""
                  />
                </div>
              );
            })}
            <div
              className="addnomineebutton"
              onClick={() => {
                addnominee();
              }}
            >
              <b>+</b> Add Nominee
            </div>
          </div>
        )}
        {updatecheck && (
          <div className="sec vsk">
            <h2>Vault Secret Key</h2>
            <input
              type="text"
              placeholder="Enter Vault Secret Key"
              onChange={(event) => {
                setvname(event.target.value, "vaultSecretKey");
              }}
            />
          </div>
        )}
        {!updatecheck ? (
          <div className="sec desc">
            <h2>Description</h2>
            <textarea
              type="text"
              placeholder="Describe about the Vault Secret Key so that nominee can guess it by reading this description"
              value={dispRes1.description}
            ></textarea>
          </div>
        ) : (
          <div className="sec desc">
            <h2>Description</h2>
            <textarea
              type="text"
              placeholder="Describe about the Vault Secret Key so that nominee can guess it by reading this description"
              value={dispRes.description}
              onChange={(event) => {
                setvname(event.target.value, "description");
              }}
            ></textarea>
          </div>
        )}
        <div className="circle1"></div>
        <div className="circle2"></div>
      </div>
    </div>
  );
}

export default DisplayVault;
