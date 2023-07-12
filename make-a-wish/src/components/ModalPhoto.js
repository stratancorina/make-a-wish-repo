import small_arrow from "../images/icon/right-arrow-small.png";
import "./ModalPhoto.css";
// import small_arrow from "../images/icon/right-arrow-small.png";
import "./ModalPhoto.css";
import { useState } from "react";

const ModalPhoto = ({ clickedImg, setClickedImg, currentArray, description, setDescription }) => {

  const [currentIndex, setCurrentIndex] = useState(null);

  const handleClick = (e) => {
    if (e.target.classList.contains("dismiss-button")) {
      setClickedImg(null);
    }
  };

  const handelRotationRight = () => {
    const totalLength = currentArray.length;
    if (currentIndex + 1 >= totalLength) {
      setCurrentIndex(0);
      const newPhoto = currentArray[0].image.data;
      setClickedImg(
        `data:image/jpeg;base64,${btoa(
          new Uint8Array(newPhoto).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        )}`
      );
      if(currentArray == "photos") {
        setDescription(currentArray[0].title)
      } else {
        setDescription(currentArray[0].name)
      }
      return;
    }
    const newIndex = currentIndex + 1;
    const newUrl = currentArray.filter((item) => {
      return currentArray.indexOf(item) === newIndex;
    });
    const newItem = newUrl[0].image.data;
    setClickedImg(
      `data:image/jpeg;base64,${btoa(
        new Uint8Array(newItem).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      )}`
    );
    // console.log(currentArray[newIndex].title)
    if(currentArray == "photos") {
        setDescription(currentArray[newIndex].title)
      } else {
        setDescription(currentArray[newIndex].name)
      }
    setCurrentIndex(newIndex);
  };

  const handelRotationLeft = () => {
    const totalLength = currentArray.length;
    if (currentIndex === 0) {
      setCurrentIndex(totalLength - 1);
      const newPhoto = currentArray[totalLength - 1].image.data;
      setClickedImg(
        `data:image/jpeg;base64,${btoa(
          new Uint8Array(newPhoto).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        )}`
      );
      return;
    }
    const newIndex = currentIndex - 1;
    const newUrl = currentArray.filter((item) => {
      return currentArray.indexOf(item) === newIndex;
    });
    const newItem = newUrl[0].image.data;
    setClickedImg(
      `data:image/jpeg;base64,${btoa(
        new Uint8Array(newItem).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      )}`
    );
    setCurrentIndex(newIndex);
  };


  
    return (
      <>
        <div className="overlay dismiss">
          <img className="modal-photo-gallery-img" src={clickedImg} alt="bigger pic" />
          {/* <div>{description}</div> */}
          <span className="dismiss-button" onClick={handleClick}>
X
          </span>
          <div onClick={handelRotationLeft} className="overlay-arrows_left">
              <img classNAme="arrow-modal-photo prev" src={small_arrow} alt= {"small arrow "}></img>
          </div>
          <div onClick={handelRotationRight} className="overlay-arrows_right">
          <img classNAme="arrow-modal-photo" src={small_arrow} alt= {"small arrow "}></img>
          </div>
        </div>
      </>
    );
  };
  
  export default ModalPhoto;