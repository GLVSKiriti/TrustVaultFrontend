import React, { useState } from "react";
import emaillogo from "../../assets/email.png";
import passwordlogo from "../../assets/password.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginfunc = async () => {
    const res = await axios.post("http://localhost:4000/auth/signin", {
      email: email,
      password: password,
    });

    const { message, token } = res.data;
    if (token) {
      sessionStorage.setItem("jwt", token);
      navigate("/getAllVaults");
    } else {
      alert("Sign In Again");
    }
  };

  return (
    <div className="login-box">
      <h1>LOGIN</h1>
      <form action="" className="login-form">
        <div>
          <img src={emaillogo} alt="" />
          <input
            name="email"
            type="email"
            placeholder="Enter Email"
            className="email-inp"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <img src={passwordlogo} alt="" />
          <input
            name="password"
            type="password"
            placeholder="Enter Password"
            className="pass-inp"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button
          className="login-inp"
          onClick={(event) => {
            event.preventDefault();
            loginfunc();
          }}
          disabled={!email || !password}
        >
          Login
        </button>
      </form>
      <h2 className="forg_pass">Forget Password?</h2>
      <h2 className="flipbuttlog">
        Don't you have an account?
        <span
          className="cardr"
          onClick={() => {
            console.log("clicked from logincard");
            props.flip();
          }}
        >
          SignUp
        </span>
      </h2>
    </div>
  );
}

export default Login;
