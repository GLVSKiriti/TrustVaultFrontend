import React from "react";
import HomeApp from "./pages/HomeApp";
import { Route, Routes } from "react-router-dom";
import OtpSentForNom from "./pages/OtpSentForNom";
import VaultDataForNom from "./pages/VaultDataForNom";
import UserStatusCheck from "./pages/UserStatusCheck";
import GetAllVaults from "./pages/GetAllVaults";
import AddVault from "./pages/AddVault";
import DisplayVault from "./pages/DisplayVault";
import { DisResProvider } from "./components/displayvaultcomp/DisResContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <DisResProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomeApp />} />
        <Route path="/user/statuscheck" element={<UserStatusCheck />} />
        <Route path="/getAllVaults" element={<GetAllVaults />} />
        <Route path="/displayVault" element={<DisplayVault />} />
        <Route path="/addVault" element={<AddVault />} />
        <Route path="/nominee/otp" element={<OtpSentForNom />} />
        <Route path="/nominee/vault" element={<VaultDataForNom />} />
      </Routes>
    </DisResProvider>
  );
}

export default App;
