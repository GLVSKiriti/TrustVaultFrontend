import React from "react";
import Design from "../homepagecomp/Desgin";
import Title from "../homepagecomp/Title";
import Profileicon from "./Profileicon";

function Header() {
  return (
    <div className="header">
      <Title />
      <Profileicon />
      <div className="design">
        <Design />
      </div>
    </div>
  );
}

export default Header;
