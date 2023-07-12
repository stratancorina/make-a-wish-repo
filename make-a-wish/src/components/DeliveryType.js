import React, { useState, useEffect } from "react";

import axios from "axios";
import { Grid } from "react-loader-spinner";

const DeliveryType = ({ onDeliverySelect })=> {
  const [deliveries, setDeliveries] = useState(null);
  const [isChecked, setIsChecked] = useState(0);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/deliverytype`);
        setDeliveries(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrder();
  }, []);

  const handleDeliverySelect = (deliveryId, price) => {
    setIsChecked(deliveryId);
    onDeliverySelect(price, deliveryId);
    // deliveryType(deliveryId);
  };

  return (
    <div className="delivery-type gifts-container">
      {deliveries?.length > 0 ? (
        deliveries.map((delivery) => (
            <div className={`delivery-box ${isChecked === delivery.id ? 'selected' : ''}`} key={delivery.id}>
            <div className="delivey-img-wrapper ">
                
              <img
                src={process.env.PUBLIC_URL + `/images/deliveryImg/${delivery.id}.jpg`}
                alt={delivery.id}
              />
              </div>
              <div className="delivery-description ">
              <p>{delivery.name}</p>

              </div>
              <div
              className="prod-price"
                onClick={() => {
                handleDeliverySelect(delivery.id, delivery.price);
              }}
              >

                <p>Selecteaza </p>
                {(delivery.id != 0) && <p>{delivery.price} lei</p>}
                

              </div>
          </div>
        ))
      ) : (
        <div>
          <Grid
            height="60"
            width="60"
            color="var(--pink)"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
    </div>
  );
};

export default DeliveryType;
