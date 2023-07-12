import React, {useState, useEffect} from "react";
import axios from "axios";
import { axiosPrivate } from "../api/axiosPrivate";

function OrderPhotoResult({setIsOpen, order}) {
const [photoOrd, setPhotoOrd] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
    
        const getPhoto = async () => {
            try {
              const response = await axiosPrivate.get(`/photos_orders/${order.id}`, {
                signal: controller.signal,
              });
              isMounted && setPhotoOrd(response.data);
      
            } catch (err) {
              console.error(err);
            }
          };
    
        getPhoto();
        return () => {
          isMounted = false;
          controller.abort();
        };
      }, []);
    


  return (
    <div>
    <div className="modal">
      <div className="overlay-popup "></div>
      <div className="modal-content">

      {photoOrd?.map((item) => (
        <img 
        className="img-result"
          src={`data:image/jpeg;base64,${btoa(
            new Uint8Array(item.image.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          )}`}
          alt={item.title}
        />
      ))}
        </div>

        <button className="close-modal" onClick={() => setIsOpen(false)}>
          x
        </button>
      </div>
    </div>
  )
}

export default OrderPhotoResult
