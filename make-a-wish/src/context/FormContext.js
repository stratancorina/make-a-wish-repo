import { createContext, useState } from "react";
import useAuth from "../hooks/useAuth";
const FormContext = createContext({});

export const FormProvider = ({ children }) => {
  const { auth } = useAuth();

//   console.log("in formContext", auth.username);

  const title = {
    0: "FormInfo",
    1: "Alege cadoul dorit",
    2: "Alege data livrarii si ora",
    3: "Mesajul de felicitare",
    4: "Locatia",
    5: "Mai multe",
  };

  const [page, setPage] = useState(0);

  const [data, setData] = useState({
    username: auth.username,
    receiverFirstName: "",
    receiverLastName: "",
    receiverBirthdate: "",
    receiverAge: "",
    receiverGender: "male",
    senderFirstName: "",
    senderLastName: "",
    senderCountry: "",
    surpriseReason: "",
    anonymous: false,
    cart: "",
    cakeFlavour: "",
    cakeKg: 1,
    deliveryDate: "",
    deliveryTime: "",
    message: "",
    address: "",
    deliveryPrice: 100,
    deliveryTypeId: 0,
    totalPrice: "",
  });

  const disablePrev = page === 0;

  const disableNext = page === Object.keys(title).length - 1;

  const prevHide = page === 0 && "remove-button";

  const nextHide = page === Object.keys(title).length - 1 && "remove-button";
  const submitHide = page !== Object.keys(title).length - 1 && "remove-button";

  const validatePage1 = () => {
    const {
      receiverFirstName,
      receiverLastName,
      receiverBirthdate,
      receiverAge,
      senderFirstName,
      senderLastName,
      senderCountry,
      surpriseReason,
    } = data;

    return (
      receiverFirstName !== "" &&
      receiverLastName !== "" &&
      receiverBirthdate !== "" &&
      receiverAge !== "" &&
      senderFirstName !== "" &&
      senderLastName !== "" &&
      senderCountry !== "" &&
      surpriseReason !== "" 
    );
  };

//   const validatePage2 = () => {

//     return cartItems !== "";
//   };

  const validatePage3 = () => {
    const { deliveryDate, deliveryTime } = data;

    return deliveryDate !== "" && deliveryTime !== "";
  };
  const validatePage5 = () => {
    const { address } = data;

    return address !== "";
  };

  const disableNextButton = () => {
    switch (page) {
      case 0:
        return !validatePage1();
    //   case 1:
        // return !validatePage2();
      case 2:
        return !validatePage3();
      case 4:
        return !validatePage5();
      default:
        return false;
    }
  };

  // const submitHide = page !== Object.keys(title).length -1 && "remove-button"

  const handleChange = (e) => {
    const type = e.target.type;
    const name = e.target.name;
    const birthdate = new Date(data.receiverBirthdate);
    const today = new Date(data.deliveryDate);

    let age = Math.floor((today - birthdate) / (365.25 * 24 * 60 * 60 * 1000));

    const birthdateMonth = birthdate.getMonth();
    const birthdateDate = birthdate.getDate();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();

    if (
      birthdateMonth === todayMonth &&
      birthdateDate === todayDate &&
      birthdate.getFullYear() !== today.getFullYear()
    ) {
      age += 1;
    }
    const value = type === "checkbox" ? e.target.checked : e.target.value;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
      receiverAge: age,
    }));
  };
  const { ...requiredInputs } = data;

  const canSubmit =
  Object.keys(requiredInputs)
    .filter((key) => key !== "message" && key !== "cakeFlavour" && key !=="cakeKg" && key !== "anonymous" && key !== "deliveryTypeId")
    .every((key) => !!requiredInputs[key]) &&
  page === Object.keys(title).length - 1;

  return (
    <FormContext.Provider
      value={{
        title,
        page,
        setPage,
        data,
        setData,
        canSubmit,
        handleChange,
        disableNext,
        disableNextButton,
        disablePrev,
        prevHide,
        nextHide,
        submitHide,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
