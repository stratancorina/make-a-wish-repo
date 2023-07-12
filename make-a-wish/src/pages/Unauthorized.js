import React from 'react'
import backgroundImage from "../images/54.jpg";
import "../Background.css"
import unauthorized from '../images/svg/unauthorized.svg';


function Unathorized() {
  return (
      <div className="container-1 success-container background">


      <div class="elements">
          <div class="square sq1"></div>
          <div class="square sq2"></div>
          <div class="square sq3"></div>
      </div> 
      <div className="above-background contact-page ">
      <div>
        <img src={unauthorized} alt="unauthorized"></img>
      <h1>Neautorizat</h1>
      <p>Din pacate nu ai acces la aceasta pagina.</p>
    </div>
  </div>
  </div>
  )
}

export default Unathorized