import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./Navbar";
import Login from "./pages/LoginPage";
import Pachete from "./pages/Pachete";

import RegisterPage from "./pages/Register";
import Gallery from "./pages/Gallery";
import Layout from "./components/Layout";

import MyProfile from "./pages/MyProfile";
import { FormComanda } from "./pages/FormComanda";
import PersistLogin from "./components/PersistLogin";
import Contact from "./pages/Contact";
import RequireAuth from "./components/RequireAuth";
import SuccessPage from "./pages/SuccessPage";
import Admin from "./pages/Admin";
import Unathorized from "./pages/Unauthorized";
import NotFound from "./pages/Page404";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPassword from "./pages/ResetPasswordPage";
import Page404 from "./pages/Page404";

const ROLES = {
  User: "user",
  Admin: "admin",
};

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="galerie" element={<Gallery />} />
          <Route path="pachete" element={<Pachete />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="unauthorized" element={<Unathorized />} />
          <Route path="404" element={<NotFound />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />}/>
          <Route path="/reset-password/:id/:token" element={<ResetPassword/>}/>
        </Route>
        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />} >
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/comanda" element={<FormComanda />} />
          <Route path="/success" element={<SuccessPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
