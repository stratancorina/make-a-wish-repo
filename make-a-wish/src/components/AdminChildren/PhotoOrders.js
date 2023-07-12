import axios from "axios";
import React, { useEffect , useState} from "react";
// imoprt axios
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { axiosPrivate } from "../../api/axiosPrivate";

function PhotoOrders() {
  const [photos, setPhotos] = useState([]);

//   useEffect(() => {
//     axios
//       .all([axios.get("http://localhost:3001/photos_orders")])
//       .then((responseArr) => {
//         setPhotos(responseArr[1].data);
//       })
//       .catch((error) => console.error(error));
//   }, []);

  
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProd = async () => {
      try {
        const response = await axiosPrivate.get("/photos_orders", {
          signal: controller.signal,
        });
        isMounted && setPhotos(response.data);

      } catch (err) {
        console.error(err);
      }
    };

    getProd();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);


  return (
<div className="">
          <h1 className="personal-info-title in-admin">Poze Comenzi</h1>
          <div className="admin-photos">
          {photos?.map((item) => (
        <div className="admin-photo-container ">
          <img 
          src={`data:image/jpeg;base64,${btoa(
            new Uint8Array(item.image.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          )}`}
          alt={item.title}
          className="admin-photo"
        />
          </div>
        
      ))}
          </div>

    </div>
  );
}

export default PhotoOrders;
