import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OtpCard() {
  const urlParams = new URLSearchParams(window.location.search);
  const v_id = urlParams.get("v_id");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const verifyEmail = async () => {
    // console.log(email);
    try {
      const res = await axios.post("http://localhost:4000/nominee/email", {
        email: email,
      });
      const { token, message } = res.data;
      console.log(token);
      if (token) {
        sessionStorage.setItem("jwt", token);
      } else {
        setError("Something Went Wrong!!Try again later");
      }
      setMessage(message);
      setClicked(true);
      setEmail("");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const verifyOtp = async () => {
    try {
      console.log(otp);
      console.log(v_id);
      const token = sessionStorage.getItem("jwt");
      const res = await axios.post(
        "http://localhost:4000/nominee/otpverify",
        {
          otp: otp,
          v_id: v_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );

      const { message, description } = res.data;
      setMessage(message);
      console.log(description);
      navigate(`/nominee/vault?v_id=${v_id}`, { state: description });
      setOtp("");
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className="otpcard">
      {error !== "" && <div className="error">{error}</div>}
      <h2 className="otpcardheading">
        {!clicked ? "Verify Your Mail" : "Verify Your OTP"}
      </h2>
      {/* <form className="otpcardform"> */}
      {!clicked ? (
        <input
          name="email"
          type="email"
          placeholder="Enter Email"
          className="otpemail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      ) : (
        <input
          name="otp"
          type="text"
          placeholder="Enter OTP"
          className="otpemail"
          value={otp}
          onChange={(event) => setOtp(event.target.value)}
        />
      )}

      {!clicked ? (
        <button
          className="sendotp"
          onClick={(event) => {
            event.preventDefault();
            verifyEmail();
          }}
        >
          Send OTP
        </button>
      ) : (
        <button
          className="sendotp"
          onClick={(event) => {
            event.preventDefault();
            verifyOtp();
          }}
        >
          Verify OTP
        </button>
      )}
      {/* </form> */}
      <div>{message}</div>
      <div className="circle1"></div>
      <div className="circle2"></div>
    </div>
  );
}

export default OtpCard;
