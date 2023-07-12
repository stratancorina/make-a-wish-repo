import React, { useContext } from "react";
import "../Pages.css";
import calendar from "../images/icon/calendar.png";
import gift from "../images/icon/gift-box.png";
import people from "../images/icon/group.png";
import mail from "../images/icon/mail.png";
import location from "../images/icon/location.png";
import more from "../images/icon/more.png";
import useFormContext from "../hooks/useFormContext";

const DotsNav = () => {

const {page, setPage} = useFormContext()
const changePage = (newPage) => setPage(newPage);

  return (
    <div className="dotsnav-container">
      <div className="line-dots"></div>
      <div className="dots-container">
        <div>
          <button 
          className={`circle-logo-container ${page === 0 ? "active" : ""}`}
          onClick={() => changePage(0)}>
            <img src={people} alt="People" />
            <p className="circle-number">1</p>
          </button>
        </div>
        <div>
          <button
            // className="circle-logo-container"
           className={`circle-logo-container ${page === 1 ? "active" : ""}`}

            onClick={() => changePage(1)}
          >
            <img src={gift} alt="Cadou" />
            <p className="circle-number">2</p>

          </button>
        </div>
        <div>
          <button
            // as={Link}
            // className="circle-logo-container"
          className={`circle-logo-container ${page === 2 ? "active" : ""}`}

            onClick={() => changePage(2)}
          >
            <img src={calendar} alt="Calendar" />
            <p className="circle-number">3</p>

          </button>
        </div>
        <div>
          <button
            // as={Link
            // className="circle-logo-container"
          className={`circle-logo-container ${page === 3 ? "active" : ""}`}

            onClick={() => changePage(3)}
          >
            <img src={mail} alt="Mesaj" />
            <p className="circle-number">4</p>

          </button>
        </div>
        <div>
          <button
            // as={Link}
            // className="circle-logo-container"
          className={`circle-logo-container ${page === 4 ? "active" : ""}`}

            onClick={() => changePage(4)}
          >
            <img src={location} alt="Cadou" />
            <p className="circle-number">5</p>

          </button>
        </div>
        <div>
          <button
            // as={Link}
            // className="circle-logo-container"
          className={`circle-logo-container ${page === 5 ? "active" : ""}`}

            onClick={() => changePage(5)}
          >
            <img src={more} alt="MaiMult" />
            <p className="circle-number">6</p>

          </button>
        </div> 
      </div>
    </div>
  );
};

export default DotsNav;
