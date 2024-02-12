import React from 'react'
import Form from 'react-bootstrap/Form';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState,useEffect } from 'react';
import "./Bookings.css"
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


const Hotelbookings = () => {
  const [adultsCount, setAdultsCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const JwtToken=localStorage.getItem('userToken');
  const [location,setLocation]= useState("")
  const incrementAdults = () => {
    setAdultsCount(adultsCount + 1);
  };

  const navigate=useNavigate();

  const decrementAdults = () => {
    if (adultsCount > 1) {
      setAdultsCount(adultsCount - 1);
    }
  };

  const incrementChildren = () => {
    setChildrenCount(childrenCount + 1);
  };

  const decrementChildren = () => {
    if (childrenCount > 0) {
      setChildrenCount(childrenCount - 1);
    }
  };
 
 function Navigate(){
         
            if(!JwtToken){
              navigate('/Signin')
            }
            else{
                
              navigate(`/Bookhotels/${location}`)
            }
 }

  return (
    <div className=' container-xl my-5'>
      <div className=' border-spacing-4 pt-8 pb-10 relative px-10'>
      <div className=' box w-3/6 h-72 bg-gray-50 flex flex-col items-center p-6 gap-1'>

        
        <Form.Control type="text" placeholder=" Search for the city"  className=' input w-11/12 h-10' value={location} onChange={(e)=>{setLocation(e.target.value)}}/>
        

          <div className='calendar flex flex-row'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
             <DemoContainer components={['DatePicker']}>
             <DatePicker label="Checkin" />
             </DemoContainer>
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
             <DemoContainer components={['DatePicker']}>
             <DatePicker label="Checkout" />
             </DemoContainer>
          </LocalizationProvider>
         
             </div> 
             <div className="guest-counter-container flex flex-row  gap-2">
      <div className="guest-counter-section">
        <label className="counter-label">
          Adults:
          <Button variant="outline-primary" className=' h-8 p-1 m-2 w-6' onClick={incrementAdults}>+</Button>
          <input type='text'  value={adultsCount} className=' w-6 p-1'/>
          
          {/* <span className="counter-value">{adultsCount}</span> */}
          <Button variant="outline-primary"  className='h-8 p-1 m-2 w-6' onClick={decrementAdults}>-</Button>
        </label>
      </div>

      <div className="guest-counter-section">
        <label className="counter-label">
          Children:
          <Button variant="outline-primary"  className=' h-8 p-1 m-2 w-6' onClick={incrementChildren}>+</Button>
          
           
          <input type='text'  value={childrenCount} className=' w-6 p-1'/>
          <Button variant="outline-primary"  className=' h-8 p-1 m-2 w-6' onClick={decrementChildren}>-</Button>
          
        </label>
      </div>
    </div>
          
    <Button variant="light" className=' bg-orange-500' onClick={Navigate}>Search Hotel</Button>
         
      </div>
      



      
      </div>
    </div>
  )
}

export default Hotelbookings
