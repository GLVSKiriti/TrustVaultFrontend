import React from "react";
import HomeApp from "./pages/HomeApp";
import { Route, Routes } from "react-router-dom";
import OtpSentForNom from "./pages/OtpSentForNom";
import VaultDataForNom from "./pages/VaultDataForNom";
import UserStatusCheck from "./pages/UserStatusCheck";
import GetAllVaults from "./pages/GetAllVaults";
import AddVault from "./pages/AddVault";

function App() {
  // return <HomeApp />;
  return (
    <Routes>
      <Route path="/" element={<HomeApp />} />
      <Route path="/user/statuscheck" element={<UserStatusCheck />} />
      <Route path="/getAllVaults" element={<GetAllVaults />} />
      <Route path="/addVault" element={<AddVault />} />
      <Route path="/nominee/otp" element={<OtpSentForNom />} />
      <Route path="/nominee/vault" element={<VaultDataForNom />} />
    </Routes>
  );
}

export default App;
