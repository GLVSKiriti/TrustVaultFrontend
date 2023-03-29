import React from "react";
import emaillogo from "../../assets/email.png";
import passwordlogo from "../../assets/password.png";
import usernamelogo from "../../assets/username.png";

function SignUp(props) {
  return (
    <div className="signup-box">
      <h1>SignUp</h1>
      <form action="" className="signup-form">
        <div>
          <img src={usernamelogo} alt="" />
          <input type="text" placeholder="Username" className="username-inp" />
        </div>
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
        <div>
          <img src={passwordlogo} alt="" />
          <input
            type="password"
            placeholder="Enter Password Again"
            className="pass-inp"
          />
        </div>
        <button className="signup-inp">SignUp</button>
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
