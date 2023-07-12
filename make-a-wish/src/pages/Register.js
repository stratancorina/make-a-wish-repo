import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from './api/axios';
import Axios from "axios";
import "../LoginPage.css";
import backgroundImage from "../images/54.jpg";
import "../Background.css";
import { useNavigate, useLocation } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const RegisterPage = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pass, setPass] = useState("");
  const [validPass, setValidPwd] = useState(false);
  const [passFocus, setPassFocus] = useState(false);

  const [matchPass, setMatchPass] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pass));
    setValidMatch(pass === matchPass);
  }, [pass, matchPass]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pass, matchPass]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pass);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await Axios.post(
        "http://localhost:3001/register",
        JSON.stringify({ username: user, password: pass, email: email }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("user created");

      console.log(response?.data);
      // console.log(response?.accessToken);
      navigate("/login");
      console.log(JSON.stringify(response));
      setSuccess(true);
      setUser("");
      setEmail("");
      setPass("");
      setMatchPass("");
    } catch (err) {
      errRef.current.focus();
      console.log("error");
      console.log(err);
    }
  };

  return (
    <>
      <div className="page-container background">
        <div class="elements">
          <div class="square sq1"></div>
          <div class="square sq2"></div>
          <div class="square sq3"></div>
        </div>
        <div className=" above-background login-page">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Înregistrare</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="username " className="label-register">
              Nume de utilizator:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !user ? "hide" : "invalid"}
              />
            </label>
            <div className="pos-relativ">
              <input
                className="input-username"
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName
                    ? "instructions i-username"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Intre 4 si 24 de caractere.Trebuie sa inceapa cu o litera.
              </p>
            </div>

            <label htmlFor="email" className="label-register">
              Adresa de email:
              <FontAwesomeIcon
                icon={faCheck}
                className={validEmail ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validEmail || !email ? "hide" : "invalid"}
              />
            </label>
            <div className="pos-relativ">
              <input
                className="input-pass"
                type="email"
                id="email"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  emailFocus && email && !validEmail
                    ? "instructions i-username"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Introduce o adresa de email valida
              </p>
            </div>

            <label htmlFor="password" className="label-register">
              Parola:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPass ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPass || !pass ? "hide" : "invalid"}
              />
            </label>
            <div className="pos-relativ">
              <input
                className="input-pass"
                type="password"
                id="password"
                onChange={(e) => setPass(e.target.value)}
                value={pass}
                required
                aria-invalid={validPass ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPassFocus(true)}
                onBlur={() => setPassFocus(false)}
              />
              <p
                id="pwdnote"
                className={
                  passFocus && !validPass ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Intre 8 si 24 de caractere. Trebuie să includă litere mari și
                mici, un număr și un caracter special.
              </p>
            </div>
            <label htmlFor="confirm_pwd" className="label-register">
              Confirma Parola:
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && matchPass ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !matchPass ? "hide" : "invalid"}
              />
            </label>
            <div className="pos-relativ">
              <input
                className="input-matchpass"
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPass(e.target.value)}
                value={matchPass}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Trebuie să se potrivească cu parola de mai sus.
              </p>
            </div>
            <button
              disabled={!validName || !validPass || !validMatch ? true : false}
              className="login-register-button"
            >
              Inregistreaza-te
            </button>
            <div className="register-suggestion">
              <p>Ai deja un cont?</p>
              <a href="/login">Logheaza-te</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
