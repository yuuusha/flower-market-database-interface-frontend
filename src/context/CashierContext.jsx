import React, { createContext, useContext, useState } from 'react';

const CashierContext = createContext();

export const useCashier = () => {
  return useContext(CashierContext);
};

export const CashierProvider = ({ children }) => {
  const [cashier, setCashier] = useState(null);

  const value = {
    cashier,
    setCashier,
  };

  return (
    <CashierContext.Provider value={value}>
      {children}
    </CashierContext.Provider>
  );
};
