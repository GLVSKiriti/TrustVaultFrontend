import React, { useState } from "react";
import emaillogo from "../../assets/email.png";
import passwordlogo from "../../assets/password.png";
import usernamelogo from "../../assets/username.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp(props) {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repass, setRepass] = useState("");
  const navigate = useNavigate();

  const signupAPI = async () => {
    if (password === repass) {
      const res = await axios.post("http://localhost:4000/auth/signup", {
        username: username,
        email: email,
        password: password,
      });
      if (res.data.error) {
        alert("User Already exists");
      } else {
        const { message, token } = res.data;
        if (token) {
          sessionStorage.setItem("jwt", token);
          navigate("/getAllVaults");
        } else {
          alert("Sign Up Again");
        }
      }
    } else {
      alert("Password Mismatched");
    }
  };

  return (
    <div className="signup-box">
      <h1>SignUp</h1>
      <form action="" className="signup-form">
        <div>
          <img src={usernamelogo} alt="" />
          <input
            type="text"
            placeholder="Username"
            className="username-inp"
            value={username}
            onChange={(event) => {
              setusername(event.target.value);
            }}
          />
        </div>
        <div>
          <img src={emaillogo} alt="" />
          <input
            type="email"
            placeholder="Enter Email"
            className="email-inp"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div>
          <img src={passwordlogo} alt="" />
          <input
            type="password"
            placeholder="Enter Password"
            className="pass-inp"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div>
          <img src={passwordlogo} alt="" />
          <input
            type="password"
            placeholder="Enter Password Again"
            className="pass-inp"
            value={repass}
            onChange={(event) => {
              setRepass(event.target.value);
            }}
          />
        </div>
        <button
          className="signup-inp"
          onClick={(event) => {
            event.preventDefault();
            signupAPI();
          }}
        >
          SignUp
        </button>
      </form>
      <h2 className="flipbuttlog">
        Already have an account?
        <span
          className="cardr"
          onClick={() => {
            console.log("clicked from signupcard");
            props.flip();
          }}
        >
          SignIn
        </span>
      </h2>
    </div>
  );
}

export default SignUp;
