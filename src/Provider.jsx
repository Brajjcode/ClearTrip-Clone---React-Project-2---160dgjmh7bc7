  import React, { createContext, useState, useContext } from 'react';

  const DatesContext = createContext();

  export const useDates = () => {
    return useContext(DatesContext);
  };


  export const DatesProvider = ({ children }) => {
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);

    const [validDates, setValidDates] = useState(false);
    const [landingDate, setLandingDate] = useState(null); 



    const setDates = (checkIn, checkOut) => {
      setCheckInDate(checkIn);
      setCheckOutDate(checkOut);
      //setLandingDate(landing);
      setValidDates(!!checkIn && !!checkOut);
    };

    const setlanding=(landing)=>{
      setLandingDate(landing)
    }

    return (
      <DatesContext.Provider value={{ checkInDate, checkOutDate, setDates, validDates,landingDate,setlanding }}>
        {children}
      </DatesContext.Provider>
    );
  };

  export default DatesProvider;
