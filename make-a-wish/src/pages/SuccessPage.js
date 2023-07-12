import React from "react";
import ShowGift from "../components/ShowGift";
import { Link } from "react-router-dom";
import "../Background.css"

function SuccessPage() {
  return (
    <div className="container-1 success-container background">


        <div className="elements">
            <div className="square sq1"></div>
            <div className="square sq2"></div>
            <div className="square sq3"></div>
        </div> 

      <div className="form-container succes-page">
        <div className="gift-success">
          <ShowGift />
        </div>
        <div>
        <div className="success-title">Comanda a fost inregistrata cu succes!</div>

        </div>


        <div className="success-details">
          
          Pentru a verifica statusul ei, acceseaza pagina{" "}
          <Link to="/myprofile"> profilului tau</Link>.
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
