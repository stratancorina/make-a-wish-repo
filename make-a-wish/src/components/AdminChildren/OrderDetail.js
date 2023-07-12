import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosPrivate } from "../../api/axiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ReviewStars from "../ReviewStars";

const OrderDetail = ({ setIsOpen, order }) => {
  const { auth, setAuth } = useAuth();
  const [inAdmin, setInAdmin] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoOrd, setPhotoOrd] = useState([]);

  const [rating, setRating] = useState("5");
  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");

  const [orderRev, setOrderRev] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      id_order: order.id,
      rating: rating,
      review: review,
      username: auth.username,
    };

    console.log(formData)

    axios
      .post("http://localhost:3001/reviews", formData)
      .then((response) => {
        console.log(response.data);
        setMessage("Am inregistrat recenzia. Multumim mult!");
        setReview("");
      })
      .catch((error) => {
        console.error(error);
        // if(error.resp)
        if (error.response.status === 400) {
          setMessage(
            "Ai insert deja un review pentru aceasta comanda. Multumim!"
          );
          setReview("");
        } else {
          setMessage("Intampinam o eroare");
          setReview("");
        }
      });
  };

  const handlePhotoChange = (event) => {
    setSelectedPhoto(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", selectedPhoto);
    formData.append("order_id", order.id);
    formData.append("upload_date", new Date().toISOString().split("T")[0]);

    try {
      await axios.post("http://localhost:3001/order-photos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Photo uploaded successfully
      console.log("Photo uploaded");
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const id = order.id;
        const response = await axios.get(`http://localhost:3001/reviews/${id}`);
        const fetchedReview = response.data.review;
        setOrderRev(fetchedReview);
        console.log(response.data.review);
      } catch (error) {
        console.error(error);
        // Handle the error case
      }
    };

    fetchReview();
  }, []);

  useEffect(() => {
    const pathname = window.location.pathname;
    const parts = pathname.split("/").filter((part) => part !== "");
    if (parts[0] === "admin") {
      setInAdmin(true);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    if (order.status === "completed") {
      const getPhoto = async () => {
        try {
          const response = await axiosPrivate.get(
            `/photos_orders/${order.id}`,
            {
              signal: controller.signal,
            }
          );
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
    }
  }, []);

  return (
    <div>
      <div className="modal">
        <div className="overlay-popup "></div>
        <div
          className={`modal-content order-det ${
            order.status === "pending" ? "pending-class" : "completed-class"
          }`}
        >
<div className={`photo-and-rev-wrapper`}>

          <div  className= {` ${ order.status === "pending" ? "order-details-full" :"" } order-details` }>
            <div className="section-big">
              <div className="section chl1">
                <p className="section-title">Detalii Destinatar</p>
                <div className="section-child">
                  <p className="detail-label">Nume: </p>
                  <p>
                    {order.receiverFirstName} {order.receiverLastName}
                  </p>
                </div>
                <div className="section-child">
                  <p className="detail-label">Data nașterii: </p>
                  <p>
                    {new Date(order.receiverBirthdate).toLocaleDateString()}
                  </p>
                </div>
                <div className="section-child">
                  <p className="detail-label">Vârsta: </p>
                  <p>{order.receiverAge}</p>
                </div>
                <div className="section-child">
                  <p className="detail-label">Gen: </p>
                  <p>{order.receiverGender}</p>
                </div>
              </div>

              <div className="section chl2">
                <p className="section-title">Detalii Expeditor</p>
                <div className="section-child">
                  <p className="detail-label">Nume: </p>
                  <p>
                    {order.senderFirstName} {order.senderLastName}
                  </p>
                </div>
                <div className="section-child">
                  <p className="detail-label">Țară: </p>
                  <p>{order.senderCountry}</p>
                </div>
              </div>
            </div>

            <div className="section">
              <p className="section-title">Detalii comandă</p>
              <div className="section-child">
                <p className="detail-label">Motiv surpriză: </p>
                <p>{order.surpriseReason}</p>
              </div>
              <div className="section-child">
                <p className="detail-label">Anonim: </p>
                <p>{order.anonymous ? "1" : "0"}</p>
              </div>
              <div className="section-child">
                <p className="detail-label">Aromă tort: </p>
                <p>{order.cakeFlavour}</p>
              </div>
              <div className="section-child">
                <p className="detail-label">Greutate tort: </p>
                <p>{order.cakeKg} kg</p>
              </div>
            </div>

            <div className="section">
              <p className="section-title">Detalii livrare</p>
              <div className="section-child">
                <p className="detail-label">Data livrare: </p>
                <p>{new Date(order.deliveryDate).toLocaleDateString()}</p>
              </div>
              <div className="section-child">
                <p className="detail-label">Ora livrare: </p>
                <p>{order.deliveryTime}</p>
              </div>
              <div className="section-child">
                <p className="detail-label">Mesaj: </p>
                <p>{order.message}</p>
              </div>
              <div className="section-child">
                <p className="detail-label">Adresă livrare: </p>
                <p>{order.address}</p>
              </div>
              <div className="section-child">
                <p className="detail-label">Preț livrare: </p>
                <p>{order.deliveryPrice}</p>
              </div>
              <div className="section-child">
                <p className="detail-label">Preț total: </p>
                <p>{order.totalPrice}</p>
              </div>
              <div className="section-child">
                <p className="detail-label">Status: </p>
                <p>{order.status}</p>
              </div>
            </div>

            {order.status === "pending" ? (
              <>
                <form className="photo-question">
                  <div>Ai facut comanda? Incarca poza:</div>

                  <input type="file" onChange={handlePhotoChange} />
                </form>
                <div className="modal-actions">
                  <button
                    onClick={handleFormSubmit}
                    className="login-register-button"
                    type="submit"
                  >
                    Incarca poza si completeaza comanda
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="photo-order">Comanda completa</div>
              </>
            )}
          </div>
         
<div
            className={` ${
              order.status === "pending" ? "pending-photo" : "show-photo"
            }`}
          >
            {photoOrd?.map((item) => (
              <img
                key={item.id}
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




            </div> 
            <button className="close-modal" onClick={() => setIsOpen(false)}>
            x
          </button>

          {inAdmin ? (
            orderRev && (
              <div className="review">
                
           <div className="section-title rev-title"> Recenzie: </div>
                  <div className="rev-child">
                <div >  <p>{orderRev.text} </p></div>
               
               <div className="display-flex section-title"> Nota: <ReviewStars score={orderRev.grade} maxStars={5} />  </div>
               <div className = " display-flex section-title"> De la: <p>{orderRev.user} </p></div>
               <div>
                 {new Date(orderRev.date_review).toLocaleDateString()}{" "}
               </div>

                </div>

              </div>
            )
          ) : (
            <div className="leave-review">
              <div className="rev-title display-flex">
              <p className="rev-title">Adauga o recenzie</p>
              <button type="submit" onClick={handleSubmit}>
                  Trimite
                </button>
                </div>

              <form className="rev-child">
                <label for="rating">Nota:</label>
                <select
                  id="rating"
                  name="rating"
                  value={rating}
                  // onChange={(e) => setRating(e.target.value)}
                  onChange={(e) => setRating(e.target.value)}

                >
                  <option value="5">5 Stele</option>
                  <option value="4">4 Stele</option>
                  <option value="3">3 Stele</option>
                  <option value="2">2 Stele</option>
                  <option value="1">1 Stea</option>
                </select>

                <label for="review">Recenzie:</label>
                <textarea
                  id="review"
                  name="review"
                  rows="2"
                  cols="50"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                ></textarea>



                <div>{message}</div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
