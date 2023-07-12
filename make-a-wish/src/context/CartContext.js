import React, { createContext, useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useFormContext from '../hooks/useFormContext';

export const ShopContext = createContext(null);

export const CartContextProvider = (props) => {
  const { data , setData } = useFormContext();
  const [productsInvetory, setProductsInvetory] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProd = async () => {
      try {
        const response = await axiosPrivate.get("/products", {
          signal: controller.signal,
        });
        isMounted && setProductsInvetory(response.data);
        console.log("productsinvertory", response.data.length);
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

  const getDefaultCart = () => {
    let cart = {};
    if (productsInvetory.length > 0) {
      for (let i = 0; i < productsInvetory.length; i++) {
        const itemId = productsInvetory[i].id;
        cart[itemId] = 0;
      }
    }
    return cart;
  };
  
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const updatedItems = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
  
      Object.keys(updatedItems).forEach((key) => {
        if (updatedItems[key] === 0) {
          delete updatedItems[key];
        }
      });
  
      return updatedItems;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedItems = { ...prev, [itemId]: prev[itemId] - 1 };
      return updatedItems;
    });
  }

  const getTotalPrice = () => {
    let total = 0;
  
    for (const itemId in cartItems) {
      const quantity = cartItems[itemId];
  
      if (quantity > 0) {
        const itemInfo = productsInvetory.find((product) => product.id === parseInt(itemId));
  
        if (itemInfo) {
          total += quantity * itemInfo.price;
        }
      }
    }
  
    return total;
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    productsInvetory,
    getTotalPrice
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
