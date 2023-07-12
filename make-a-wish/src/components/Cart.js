import React, { useContext } from "react";
import { ShopContext } from "../context/CartContext";
import Product from "./Product";
import cartwhite from "../images/icon/shopping-cart-white.png"


export const Cart = (props) => {
  const { cartItems, getTotalPrice} = useContext(ShopContext);
  const prods = props.objectProp;
  // console.log(Object.keys(cartItems).length)
  const totalAmount = getTotalPrice();


  const totalItemsSelected = Object.values(cartItems).reduce(
    (total, count) => total + count,
    0
  );

  console.log(cartItems);
  
  return (
    <>
    {totalItemsSelected > 0 && (
    <div className="cart">
      <div className="inherit-width cakes ">
        <div className="line-form"></div>
        <div className="cart-title big-field-title">
          <span className="cart-title">
          <img src={cartwhite} alt="cart-icon" className="cart-icon"></img>
          <div className="">Produse Selectate </div>
          </span>

          <div className=""> Total {totalAmount} lei </div>
        </div>

      </div>
      <div className="cart-container">
        {prods
          .filter((product) => cartItems[product.id] >= 1)
          .map((product) => (
            <Product product={product} key={product.id} cart ={true}/>
          ))}
      </div>
    </div>
    
    )}
    </>
    
  );
};
