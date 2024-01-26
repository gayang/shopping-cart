import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Root = () => {
  return (
    <div className="outer-container">
      <NavBar />
      <div className="data-container">
        <Outlet />
      </div>
    </div>
  );
};
export default Root;
