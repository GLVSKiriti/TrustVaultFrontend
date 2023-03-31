import React from "react";
import HomeApp from "./pages/HomeApp";
import { Route, Routes } from "react-router-dom";
import OtpSentForNom from "./pages/OtpSentForNom";

function App() {
  // return <HomeApp />;
  return (
    <Routes>
      <Route path="/" element={<HomeApp />} />
      <Route path="/nominee/otp" element={<OtpSentForNom />} />
    </Routes>
  );
}

export default App;
