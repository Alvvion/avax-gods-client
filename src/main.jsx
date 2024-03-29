import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, CreateBattle, JoinBattle, Battle, Battleground } from "./pages";
import "./index.css";
import { GlobalContextProvider } from "./context";
import { OnboardModal } from "./components";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GlobalContextProvider>
      <OnboardModal />
      <Routes>
        <Route path="/create-battle" element={<CreateBattle />} />
        <Route path="/join-battle" element={<JoinBattle />} />
        <Route path="/battleground" element={<Battleground />} />
        <Route path="/battle/:battleName" element={<Battle />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </GlobalContextProvider>
  </BrowserRouter>
);
