import React, { useEffect, useState, useRef, useContext } from "react";
import Axios from "axios";
import "../LoginPage.css";
// import backgroundImage from "../images/54.jpg";
import "../Background.css"
import jwt_decode from "jwt-decode"

import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
// import AuthContext from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";
// import AuthContext from "../context/AuthProvider";
// import {useAuth} from "../components/auth";

function LoginPage() {

  const {setAuth} = useAuth();

  const navigate = useNavigate();
  
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [showInfo, setShowInfo] = useState(false);

  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  Axios.defaults.withCredentials = true;

  const login = async (e) => {
    e.preventDefault();
    console.log(username, password);

    try {
      const response = await Axios.post(
        "http://localhost:3001/auth",
        JSON.stringify({
          username,
          password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // console.log(response?.data);
      const accessToken = response?.data?.accessToken;
      const decodedToken = jwt_decode(accessToken);

      // console.log("role in login", decodedToken.UserInfo.role)

      const roles = decodedToken.UserInfo.role;
      setAuth({username, password, roles, accessToken});

      setUsername("");
      setPassword("");
      navigate(from , {replace:true});

    } catch (err) {
      if (!err.response) {
          setErrMsg("Serverul nu raspunde")
      } else if (err.response?.status == 400) {
        setErrMsg("Lipsete numele de utilizator sau parola")
      } else if (err.response?.status == 401){
        setErrMsg("Neautorizat");
      } else {
        setErrMsg("Logare esuata");
      }

      errRef.current.focus();
    }
  };

 useEffect(() => {
    if (from === "/comanda") {
      setShowInfo(true);
      const timer = setTimeout(() => {
        setShowInfo(false);
      }, 3000); // 3000 milliseconds = 3 seconds

      return () => {
        clearTimeout(timer);
      };
    }
  }, [from]);

  const userAuthenticated = () => {
    Axios.get("http://localhost:3001/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="page-container background">
      
      <div className="elements">
            <div className="square sq1"></div>
            <div className="square sq2"></div>
            <div className="square sq3"></div>
        </div> 
        
      <div className="above-background login-page">
        <h1>Bine ai venit!</h1>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        {showInfo && (
        <p className={`info-from insert-animation `} >Pentru a accesa aceasta pagina avem nevoie sa te loghezi</p>
      )}

        <form className="login-form" onSubmit={login}>
          <div className="login-result">
            {loginStatus && (
              <button onClick={userAuthenticated}>
                {" "}
                Check if Authenticated
              </button>
            )}
          </div>
          <label htmlFor="username ">
            <p>Nume de utilizator:</p>
            <input
              type="text"
              id="username"
              value={username}
              ref={userRef}
              autoComplete="off"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
          </label>
          <label htmlFor="password ">
            <p>Parola:</p>
            <input
              type="password"
              id="password"
              value={password}
              autoComplete="off"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </label>
          <Link className="forgot-password" to="/forgot-password">Ai uitat parola? </Link>
          <button type="submit" className="login-register-button">
            Login
          </button>
          <div className="register-suggestion">
            Nu ai un cont?
            <Link className="register-link" to="/register">
              {" "}
              Inregistreaza-te
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
