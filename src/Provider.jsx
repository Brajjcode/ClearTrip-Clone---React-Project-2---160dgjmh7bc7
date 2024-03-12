import React, { createContext, useState, useContext } from 'react';

const DatesContext = createContext();

export const useDates = () => {
  return useContext(DatesContext);
};

export const DatesProvider = ({ children }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [validDates, setValidDates] = useState(false);

  const setDates = (checkIn, checkOut) => {
    setCheckInDate(checkIn);
    setCheckOutDate(checkOut);
    setValidDates(!!checkIn && !!checkOut);
  };

  return (
    <DatesContext.Provider value={{ checkInDate, checkOutDate, setDates, validDates }}>
      {children}
    </DatesContext.Provider>
  );
};

export default DatesProvider;
