import React from "react";
import "../Pages.css";

const ImageCard = ({item})=> {
  return (
    <div className="gallery-photo" key={item.idphotos}>
      <img
        src={`data:image/jpeg;base64,${btoa(
          new Uint8Array(item.image.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        )}`}
        alt={item.title}
      />      
      <button>Vezi Poza </button>
    </div>
  );
}

export default ImageCard;
