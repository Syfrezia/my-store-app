import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [finalFee, setFinalFee] = useState(0);

  const updateFinalFee = (newFee) => {
    setFinalFee(newFee);
  };

  return (
    <CheckoutContext.Provider value={{ finalFee, updateFinalFee }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  return useContext(CheckoutContext);
};
