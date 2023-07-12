import React from "react";
import { FormProvider } from "../context/FormContext";
import Comanda from "./Comanda";
import { CartContextProvider } from "../context/CartContext";

export const FormComanda = () => {
  return (
    <FormProvider>
      <CartContextProvider>
        <Comanda />
      </CartContextProvider>
    </FormProvider>
  );
};
