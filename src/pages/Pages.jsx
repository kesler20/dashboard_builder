import React from "react";
import Dashboard from "./Dashboard";
import { Route, Routes } from "react-router-dom";
import Searched from "./Searched";
const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/searched/:search" element={<Searched />} />
    </Routes>
  );
};

export default Pages;