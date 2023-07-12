import React from 'react'
import backgroundImage from "../images/54.jpg";
import "../Background.css"
import notfound from '../images/svg/404.svg';
import { useHistory } from 'react-router-dom';

function Page404() {

  // const history = useHistory();
  return (
      <div className="container-1 success-container background">


      <div class="elements">
          <div class="square sq1"></div>
          <div class="square sq2"></div>
          <div class="square sq3"></div>
      </div> 
      <div className="above-background contact-page ">
      <div>
        <img src={notfound} alt="unauthorized"></img>
      <p style={{color:'var(--purple)'}}>Nu am gasit asa pagina. Ne cerem scuze.</p>
    </div>
  </div>
  </div>
  )
}

export default Page404