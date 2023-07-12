import React from "react";
import "./Slider.css";
import arrow from "../images/icon/right-arrow-small.png";

export default function BtnSlider({ direction, moveSlide }) {
  // console.log(direction, moveSlide);
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      <img src={direction === "next" ? arrow : arrow}  alt="small-arrow"/>
    </button>
  );
}