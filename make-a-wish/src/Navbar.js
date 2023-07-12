import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo-pink.png";
import "./Navbar.css";
import useAuth from "../src/hooks/useAuth";
import instagram from "./images/icon/instagram.png"
import facebook from "./images/icon/facebook.png"
import instagramp from "./images/icon/instagram-prpl.png"
import facebookp from "./images/icon/facebook-prpl.png"
import user from "./images/icon/account.png"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DarkMode from "./components/DarkMode";

function Navbar() {
    const {auth, setAuth } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const navigate = useNavigate();

    const hangleLogout = () =>{
      setAuth({});
      navigate('/');
  }
  const [isOpenn, setIsOpenn] = useState(false);

  const toggleNavbar = () => {
    setIsOpenn(!isOpenn);
  };


  return (
    <nav className="navbar">

    <div className={`burger ${isOpenn ? 'active' : ''}`} onClick={toggleNavbar}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>


      <ul className={`nav-links ${isOpenn ? 'active' : ''}`}>
        <Link to="/">
          <img src={logo} className="logo" alt="logo" />
        </Link>
        <li>
          <Link to="/comanda">Comandă</Link>
        </li>
        <p>|</p>
        <li>
          <a href="/galerie">Galerie</a>
        </li>
        <p>|</p>
        <li>
          <Link to="/pachete">Pachete</Link>
        </li>
        <p>|</p>
        <li>
          <a href="/contact">Contact</a>
        </li>
        <li>
          
        </li>
        <div className="social-on-mobile">
        <li className="">
          <a href="https://www.instagram.com/surprize.calarasi/"><img className="social-logo" alt="instagram-icon" src={instagram}/></a>
        </li>
        <li className="">
          <a href="https://www.facebook.com/surprize.calarasi"><img className="social-logo" alt="facebook-icon" src={facebook}/></a>
        </li>
        <li>
        <svg fill="#ffffff" className="social-logo roller" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" ></g><g id="SVGRepo_iconCarrier"><path d="M416 128V32c0-17.67-14.33-32-32-32H32C14.33 0 0 14.33 0 32v96c0 17.67 14.33 32 32 32h352c17.67 0 32-14.33 32-32zm32-64v128c0 17.67-14.33 32-32 32H256c-35.35 0-64 28.65-64 64v32c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32V352c0-17.67-14.33-32-32-32v-32h160c53.02 0 96-42.98 96-96v-64c0-35.35-28.65-64-64-64z"></path></g></svg>
        </li>
        </div>

      </ul>
      <ul className={`nav-links ${isOpenn ? 'active' : ''}`}>
        <li>
          <DarkMode/>
        </li>
        <li className="social-wrapper mobile-social">
          <a href="https://www.instagram.com/surprize.calarasi/"><img className="social-logo" alt="instagram-icon" src={instagram}/><img className="social-logo prpl" alt="instagram-icon" src={instagramp}/></a>
        </li>
        <li className="social-wrapper mobile-social">
          <a href="https://www.facebook.com/surprize.calarasi"><img className="social-logo" alt="facebook-icon" src={facebook}/><img className="social-logo prpl" alt="instagram-icon" src={facebookp}/></a>
        </li>

        {!auth.username ? (
          <li className="button-white nav-log">
            <Link className="pink-text" to="/login">
              Login
            </Link>
          </li>
         ) : (
          <>
          <li className="loggedin nav-log">

              <button className=" button-white pink-text profile-wrapper loggedin"  onClick={toggleDropdown}>
                <img alt="user-icon" className="social-logo" src={user}></img>
                <span className="username">{auth.username}</span>
                   
              </button>
              {isOpen && (
              <div className={`dropdown-loggedin ${isOpen ? 'show' : ''}`}>
                <Link to="/myprofile" className="dropdown-child"  onClick={toggleDropdown}>Comenzile mele</Link>
                <button onClick={() => {hangleLogout(); toggleDropdown();}} className="dropdown-child btn-logout">Deconectare</button>
              </div>
               )}

          </li>

          </>
        )} 
        {auth.username == "korina1" && <li className=" nav-log"><Link to="/admin">A</Link></li>}
      </ul>
      {!auth.username ? (
        <div className="nav-log-show">
          <li className="button-white ">
            <Link className="pink-text" to="/login">
              Login
            </Link>
          </li>
        </div>

         ) : (
          <div className = "nav-log-show">
          <li className="loggedin">

              <button className=" button-white pink-text profile-wrapper loggedin"  onClick={toggleDropdown}>
                <img alt="user-icon" className="social-logo" src={user}></img>
                <span className="username">{auth.username}</span>
                   
              </button>
              {isOpen && (
              <div className={`dropdown-loggedin ${isOpen ? 'show' : ''}`}>
                <Link to="/myprofile" className="dropdown-child"  onClick={toggleDropdown}>Comenzile mele</Link>
                <button onClick={() => {hangleLogout(); toggleDropdown();}} className="dropdown-child btn-logout">Deconectare</button>
              </div>
               )}

          </li>
          <li>
          </li>
          {auth.username == "korina1" && <li className=" nav-log-show"><Link to="/admin">A</Link></li>}

          </div>
        )} 
    </nav>
  );
}

export default Navbar;
