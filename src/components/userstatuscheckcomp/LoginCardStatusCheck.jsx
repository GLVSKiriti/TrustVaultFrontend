import React, { useState } from "react";
import axios from "axios";

function LoginCardStatusCheck() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setError] = useState("");
  const [message, setMessage] = useState("");

  const statusCheck = async () => {
    setError("");
    setMessage("");
    const res = await axios.post("http://localhost:4000/cron/statusCheck", {
      email: email,
      password: password,
    });

    console.log(res.data.error);
    if (res.data.error) {
      setError(res.data.error);
    } else {
      setMessage(res.data.message);
    }
  };

  return (
    <div className="otpcard">
      <h2 className="otpcardheading">Status Check With Login</h2>
      {isError !== "" ? <p className="error">{isError}</p> : <></>}
      {message !== "" ? <p className="message">{message}</p> : <></>}

      <input
        name="email"
        type="email"
        placeholder="Enter Email"
        className="otpemail"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        name="password"
        type="password"
        placeholder="Enter Password"
        className="otpemail"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button
        className="sendotp"
        onClick={(event) => {
          event.preventDefault();
          statusCheck();
        }}
      >
        Check Status
      </button>
      <div className="circle1"></div>
      <div className="circle2"></div>
    </div>
  );
}

export default LoginCardStatusCheck;
