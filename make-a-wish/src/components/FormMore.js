import React, { useContext, useEffect, useState } from "react";
import DotsNav from "./DotsNav";
import "../Pages.css";
import useFormContext from "../hooks/useFormContext";
import { ShopContext } from '../context/CartContext'
import DeliveryType from "./DeliveryType";


const FormMore = () => {
  const { data, setData } = useFormContext();
  const {productsInvetory, cartItems, getTotalPrice} = useContext(ShopContext);

  const totalAmount = getTotalPrice();

  // var finalPrice = totalAmount + data.deliveryPrice;
  // console.log(finalPrice);
  
  const [selectedDeliveryPrice, setSelectedDeliveryPrice] = useState(0);
  
  const handleDeliverySelect = (price, id) => {
    setSelectedDeliveryPrice(price);

    // let final = data.totalPrice + price
    setData((prevData) => ({
      ...prevData,
      deliveryTypeId: id,
    }));
  };

  useEffect(() => {
    const filteredCartItems = Object.keys(cartItems)
      .filter((itemId) => cartItems[itemId] > 0)
      .reduce((filtered, itemId) => {
        filtered[itemId] = cartItems[itemId];
        return filtered;
      }, {});

      const deliveryPrice = parseInt(selectedDeliveryPrice) || 0; // Default to 0 if no delivery is selected
      const totalPrice = getTotalPrice() +  data.deliveryPrice + deliveryPrice;
  
      setData((prevData) => ({
        ...prevData,
        cart: { ...filteredCartItems },
        totalPrice: totalPrice,
      }));

  }, [cartItems , selectedDeliveryPrice]);

  return (
    <div className="personal-form">
      <div className="forms"></div>
      <div className="inherit-width purple">
        <h2 className="form-title">Rezumat surpriza</h2>
        <div className="big-field-title">
          1. Detalii destinatar si expeditor:
        </div>
        <div className="people-summary">
          <div className="semi-info">
            <span className="field-title">Nume si prenume destinatar</span>
            <div className="field-info">
              {data.receiverFirstName} {data.receiverLastName}
            </div>
          </div>
          <div className="semi-info">
            <span className="field-title">Data nasterii</span>
            <div className="field-info">{data.receiverBirthdate}</div>
            {data.receiverAge? ( 
            <div className="field-info">{data.receiverAge}</div>

            ):(
              <>
              </>
            )}

          </div>
          <div className="semi-info">
            <span className="field-title">Gen</span>
            <div className="field-info">{data.receiverGender}</div>
          </div>

          <div className="semi-info">
            <span className="field-title">Nume si prenume expeditor</span>
            <div className="field-info">
              {data.senderFirstName} {data.senderLastName}
            </div>
          </div>
          <div className="semi-info">
            <span className="field-title">Tara in care se afla:</span>
            <div className="field-info">{data.senderCountry}</div>
          </div>
          <div className="semi-info">
          <span className="field-title">Surpriza anonima:</span>
          {data.anonymous === true ? (
            <div className="field-info"> Da</div>
          ): (
            <div className="field-info"> Nu</div>

          )
          }
            
          </div>
        </div>
        <div className="semi-info">
          <span className="field-title">Motivul surprizei:</span>
          <div className="field-info reason">{data.surpriseReason}</div>
        </div>
      </div>
      <div className="display-space-between">
        <div className="chosen-gifts">
          <div className="big-field-title">2. Cadourile alese:</div>

          {productsInvetory
          .filter((product) => cartItems[product.id] >= 1)
          .map((product) => 
          <div className="gift-info" key={product.id}>
            <span>{product.name} x {cartItems[product.id]}</span>
            <span>{product.price} lei</span>
          </div>
           )}

           <div className="gift-info" style={{fontWeight:"bold"}}>
            <span>Total </span>
            <span>{totalAmount} lei</span>
            </div>
          

        </div>

        <div className="chosen-gifts">
          <div className="big-field-title">3. Data si ora livrarii:</div>
          <div className="gift-info">
            <span>Data</span>
            <span>{data.deliveryDate}</span>
          </div>
          <div className="gift-info">
            <span>Ora</span>
            <span>{data.deliveryTime}</span>
          </div>
        </div>
      </div>

      <div className="big-field-title">
          4. Mesajul de felicitare:
        </div>
        <div className="field-info message">
              {data.message}
            </div>

            <div className="big-field-title margin-top-summary">
          5. Adresa si costul de livrare:
        </div>

        <div className="display-space-between purple ">
          <span>{data.address}</span>
          <span>{data.deliveryPrice} lei</span>
            </div>


            <div className="big-field-title margin-top-summary">
          6. Alege tipul de livrare (optional):  
          
        </div>
        <DeliveryType onDeliverySelect={handleDeliverySelect}/>
        {/* {selectedDeliveryPrice !== null && (
        <p>Selected delivery price: {selectedDeliveryPrice} lei</p>
      )} */}
        <div className="totalPrice">Preț Total: {data.totalPrice} lei</div> 

    </div>
  );
};

export default FormMore;
