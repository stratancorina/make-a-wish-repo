import "../Home.css";
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import calendar from "../images/icon/calendar.png";
import gift from "../images/icon/gift-box.png";
import people from "../images/icon/group.png";
import mail from "../images/icon/mail.png";
import location from "../images/icon/location.png";
import more from "../images/icon/more.png";
import arrow from "../images/icon/right-arrow.png";
import small_arrow from "../images/icon/right-arrow-small.png";
import arrow_down from "../images/icon/arrow-down-sign-to-navigate.png"
import one from "../images/float-img/1.png"
import two  from "../images/float-img/2.png"
import three from "../images/float-img/3.png"
import four from "../images/float-img/4.png"
import five from "../images/float-img/5.png"
import six from "../images/float-img/pink-tulips.png"
import conf from "../images/float-img/pink-conf.png"
import { ShowGift } from "../components/ShowGift";
import Slider from "../components/Slider.js";
// import { useEffect } from "react";


function Home() {

  // useEffect(() => {
  //   const handleMouseMove = (event) => {
  //     const confImages = document.querySelectorAll('.float-child');
  //     const cursorX = event.clientX;
  //     const cursorY = event.clientY;

  //     confImages.forEach((image) => {
  //       const offsetX = cursorX - image.parentElement.getBoundingClientRect().left;
  //       const offsetY = cursorY - image.parentElement.getBoundingClientRect().top;

  //       const moveX = offsetX * 0.03; // Modifică această valoare pentru a ajusta mișcarea pe orizontală
  //       const moveY = offsetY * 0.03; // Modifică această valoare pentru a ajusta mișcarea pe verticală

  //       image.style.transform = `translate(${moveX}px, ${moveY}px)`;
  //     });
  //   };

  //   document.addEventListener('mousemove', handleMouseMove);

  //   return () => {
  //     document.removeEventListener('mousemove', handleMouseMove);
  //   };
  // }, []);

    const scrollToSection = (sectionId) => {
      const section = document.querySelector(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    };


    useEffect(() => {
      const parallax = (e) => {
        document.querySelectorAll('.float-child').forEach((move) => {
          const moving_value = move.getAttribute('data-value');
          const x = (e.clientX * moving_value) / 250;
          const y = (e.clientY * moving_value) / 250;
          move.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
      };
  
      document.addEventListener('mousemove', parallax);
  
      return () => {
        document.removeEventListener('mousemove', parallax);
      };
    }, []);
  
    
  
  return (
    <div className="App">
      <div className="general-container">
        <div className=" container1" >
          <div className="box " >

            <img src={conf}alt="conf" className="float-child conf" data-value="5"></img>
            <img src={conf}alt="conf" className="float-child conf2" data-value="5"></img>
          </div>

          <div className="blur-box overlay-home">
            <h1>Make a Wish</h1>
            <p>- Un gest frumos pentru oameni frumoși -</p>
            <div className="wrapper-button">
            <button className="button-purple fancy" onClick={() => scrollToSection('#who-are-we')}>Află mai multe</button>
            
            <img alt="down-arrow" className="down-arrow" src={arrow_down}/>
            <img alt="down-arrow" className="down-arrow arr1" src={arrow_down}/>
            <img alt="down-arrow" className="down-arrow arr2" src={arrow_down}/>

            </div>
          </div>
        </div>
        <div className="container2">
          <div className="info-square people">
            <img src={people} alt="poople" />
            <div className="text-on-square">Pentru cine?</div>
          </div>

          <div className="purple-arrow">
            <img src={arrow} alt="arrow" />
          </div>

          <div className="info-square gift">
            <img src={gift} alt="gift" />
            <div className="text-on-square">Alege cadoul</div>
          </div>

          <div className="purple-arrow">
            <img src={arrow} alt="arrow" />
          </div>

          <div className="info-square calendar">
            <img src={calendar} alt="calendar" />
            <div className="text-on-square">Alege data si ora</div>
          </div>
          <div className="purple-arrow">
            <img src={arrow} alt="arrow" />
          </div>
          <div className="info-square mail">
            <img src={mail} alt="mail" />
            <div className="text-on-square">Mesaj de felicitare</div>
          </div>
          <div className="purple-arrow">
            <img src={arrow} alt="arrow" />
          </div>
          <div className="info-square location">
            <img src={location} alt="location" />
            <div className="text-on-square">Alege locatia</div>
          </div>
          <div className="purple-arrow">
            <img src={arrow} alt="arrow" />
          </div>
          <div className="info-square more">
            <img src={more} alt="more" />
            <div className="text-on-square">Servicii in pluis</div>
          </div>
        </div>
        <div className="container3" id="who-are-we">
          <div className="text-on-3">
            <p className="title3"> Despre noi </p>
            <p className="text-on3-1">
              In cazul în care nu puteți fi prezent personal pentru a oferi un
              cadou sau dacă doriți să surprindeți pe cineva cu un cadou special
              livrat direct la ușa lor, noi te ajutam cu mare drag.
            </p>
            <p className="text-on3-2">
              {" "}
              <b>Make a Wish</b> oferă o gamă largă de opțiuni pentru persoanele
              care doresc să își surprindă prietenii sau membrii familiei cu
              cadouri, flori sau alte produse.
            </p>
          </div>
        </div>
        <div className="container4">
          <div className="title">
            <div className="title1">
              Tot ce ai nevoie acum pe o singură platformă
            </div>
          </div>
          <div className="triangle-container">
            <div className="tr1-container">
              {" "}
              <div className="tr1"></div>
            </div>
            <div className="tr2-container">
              <div className="tr2"></div>
            </div>
          </div>
          <div className="section1">
            <div className="text-on-3 on-4">
              <p className="title3"> Cadouri unice</p>
              <p className="text-on3-1">
                In cazul în care nu puteți fi prezent personal pentru a oferi un
                cadou sau dacă doriți să surprindeți pe cineva cu un cadou
                special livrat direct la ușa lor, noi te ajutam cu mare drag.
              </p>
              <div className="comanda-template">
                <Link to="/comanda" className="comanda">
                  Comanda{" "}
                </Link>
                <img src={small_arrow} alt="small-arrow"></img>
              </div>
            </div>
            <div className="gift-3d">
              <ShowGift />
            </div>
          </div>
          <div className="section2-container">
            <div className="triangle-container tr-section2">
              <div className="tr1-container tr-white1 ">
                {" "}
                <div className="tr1"></div>
              </div>
              <div className="tr2-container tr-white2">
                <div className="tr2"></div>
              </div>
            </div>
            <div className="section2">
              <div className="slider-container">
                <Slider imagePath="flowers" />
              </div>
              <div className="text-on-3 on-4">
                <p className="title3"> Livrare de flori</p>
                <p className="text-on3-1">
                  Flori proaspete și rare pentru momente speciale. Fie că este
                  vorba despre un buchet impresionant de trandafiri, un
                  aranjament spectaculos de orhidei sau o compoziție unică de
                  flori rare, veți fi siguri că fiecare floare este atent
                  selectata și livrată în cel mai bun moment.
                </p>
                <div className="comanda-template">
                  <Link to="/comanda" className="comanda">
                    Comanda{" "}
                  </Link>
                  <img src={small_arrow} alt="small-arrow" className="small-arrow"></img>
                </div>
              </div>
            </div>
          </div>

          <div className="section3-container">
            <div className="triangle-container tr-section2">
              <div className="tr1-container">
                {" "}
                <div className="tr1"></div>
              </div>
              <div className="tr2-container">
                <div className="tr2"></div>
              </div>
            </div>
            <div className="section3">
              <div className="text-on-3 on-4">
                <p className="title3"> Tort personalizat</p>
                <p className="text-on3-1">
                  Nu există nimic mai valoros decât amintirile noastre, iar
                  momentele speciale merită să fie înregistrate și păstrate
                  pentru totdeauna.Oferim opțiunea de a face poze și
                  videoclipuri care vă vor ajuta să păstrați amintiri vii ale
                  momentelor de neuitat. Împărtășiți aceste momente unice și
                  emoționante cu cei dragi și cu prietenii dvs.{" "}
                </p>
                <div className="comanda-template">
                  <Link to="/comanda" className="comanda">
                    Comanda{" "}
                  </Link>
                  <img src={small_arrow} alt="small-arrow"></img>
                </div>
              </div>
              <div className="slider-container">
                <Slider imagePath="cakes" />
              </div>
            </div>
          </div>
          <div className="section3-container">
            <div className="triangle-container tr-section2">
              <div className="tr1-container tr-white1">
                {" "}
                <div className="tr1"></div>
              </div>
              <div className="tr2-container tr-white2">
                <div className="tr2"></div>
              </div>
            </div>
            <div className="section4">
              <div className="slider-container">
                <Slider imagePath="memories" />
              </div>
              <div className="text-on-3 on-4">
                <p className="title3"> Poze si video</p>
                <p className="text-on3-1">
                  La fiecare aniversare sau eveniment special, un tort delicios
                  este esențial. Descoperiți selecția noastră de torturi
                  perfecte pentru o surpriza completa. Alege un tort
                  personalizat și decorat cu multă creativitate și originalitate
                  pentru a fi o experiență vizuală și gustativă de neuitat.
                </p>
                <div className="comanda-template">
                  <Link to="/comanda" className="comanda">
                    Comanda{" "}
                  </Link>
                  <img src={small_arrow} alt="small-arrow"></img>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
