import React, { useCallback, useState, useContext } from "react";
import "../Pages.css";
import { useNavigate } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import useFormContext from "../hooks/useFormContext";
import { ShopContext } from "../context/CartContext";

const Product = ({ product, onClick , cart}) => {
  const { data, handleChange, setData } = useFormContext();
  const{ addToCart, cartItems, removeFromCart } = useContext(ShopContext);

  const [isOpen, setIsOpen] = useState(false);

  const cartItemAmount = cartItems[product.id]

  const openPopup = () => {
    setIsOpen(true);
  };
  const id = product.id;
  const navigate = useNavigate();
  const showdetails = () => {
    // console.log("details");
    navigate(`/comanda/gift/${id}`, {
      state: {
        item: product,
      },
    });
  };

  return (
    <>
    {!cart ? (
        <div className="prod-wrapper">
        <div onClick={onClick} className="prod-container">
          <div className="prod-image-container">
            <img
              src={`data:image/jpeg;base64,${btoa(
                new Uint8Array(product.image.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              )}`}
              alt={product.id}
            />
          </div>
  
          <div className="prod-description">
            <p>{product.name}</p>
            <p>{product.description}</p>
          </div>
        </div>
        <div onClick={()=> addToCart(product.id)} className="prod-price">
          <p>Selectează {cartItemAmount>0 && <>({cartItemAmount})</>}</p>
          <p>{product.price} lei</p>
        </div>
      </div>
    ) :(
        <div className="prod-cart-wrapper">
        <div onClick={onClick} className="prod-cart-container">
            <div className="display-flex">
            <div className="prod-image-container">
            <img
              src={`data:image/jpeg;base64,${btoa(
                new Uint8Array(product.image.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              )}`}
              alt={product.id}
            />
          </div>
  
          <div className="prod-description-cart">
            <span>
            <p>{product.name}</p>
            <p>{product.price} lei</p>
            </span>
           
            <p>{product.description}</p>
          </div>
            </div>
          
          <div onClick={()=> removeFromCart(product.id)} className="prod-price-cart">
          <p>Elimina {cartItemAmount>0 && <>({cartItemAmount})</>}</p>
        </div>
        </div>

      </div>
    )
    }
    </>
  );
};

export default Product;
