import React from "react";
import emaillogo from "../../assets/email.png";
import passwordlogo from "../../assets/password.png";

function Login(props) {
  return (
    <div className="login-box">
      <h1>LOGIN</h1>
      <form action="" className="login-form">
        <div>
          <img src={emaillogo} alt="" />
          <input type="email" placeholder="Enter Email" className="email-inp" />
        </div>
        <div>
          <img src={passwordlogo} alt="" />
          <input
            type="password"
            placeholder="Enter Password"
            className="pass-inp"
          />
        </div>
        <button className="login-inp">Login</button>
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
