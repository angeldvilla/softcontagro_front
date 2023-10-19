import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../views/Login/Login";
import Home from "../views/Home/Home";

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/inicio" element={<Home />} />
    </Routes>
  );
};

export default RoutesApp;
