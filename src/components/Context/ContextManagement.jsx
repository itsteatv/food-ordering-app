import React, { useState, useContext, createContext } from "react";
const AppContext = createContext();

function AppProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = function () {
    setIsModalOpen(true);
  };

  const closeModal = function () {
    setIsModalOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        openModal,
        closeModal,
        isModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useGlobalContext = function () {
  return useContext(AppContext);
}

export {AppContext, AppProvider};
