import LandingPage from "../views/LandingPage/LandingPage";
import { Routes, Route } from "react-router-dom";
import Login from "../views/Login/Login";
import Home from "../views/Home/Home";
import Error from "../views/Error/Error";

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/inicio-sesion" element={<Login />} />
      <Route path="/inicio" element={<Home />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default RoutesApp;
