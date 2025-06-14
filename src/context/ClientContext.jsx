import React, { createContext, useContext, useState } from 'react';

const ClientContext = createContext();

export const useClient = () => {
  return useContext(ClientContext);
};

export const ClientProvider = ({ children }) => {
  const [client, setClient] = useState(null);

  const value = {
    client,
    setClient,
  };

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  );
};
