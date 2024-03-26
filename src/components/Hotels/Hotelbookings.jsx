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
import { useDates } from '../../Provider';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';


const Hotelbookings = () => {

  const { setDates } =  useDates()
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
 // const navigate = useNavigate();


  const [adultsCount, setAdultsCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const JwtToken=localStorage.getItem('userToken');
  const [location,setLocation]= useState("")
  const[loader, setloader]= useState(false)
  const [offerData,setOfferData]=useState([]);


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
 
  const handleCheckInChange = (date) => {
    setCheckInDate(date.format('MM/DD/YYYY'));
    setDates(date, checkOutDate);
  };

  const handleCheckOutChange = (date) => {
    setCheckOutDate(date.format('MM/DD/YYYY'));
    setDates(checkInDate, date);
  };
  useEffect(()=>{

      
    async function offer(){
      setloader(true)
           
      const data= await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/offers?filter={"type":"HOTELS"}`,{
          
      headers:{
        'projectID':'f104bi07c490'
      }

      })
         const jsondata= await data.json();

         setOfferData(jsondata.data.offers);
         setloader(false)

    }

    offer();

   },[])

 function Navigate(){
         
            if(!JwtToken){
              navigate('/Signin')
            }
            else{
              setDates(checkInDate, checkOutDate);
              navigate(`/Bookhotels/${location}`)
            }
 }

 console.log(checkInDate)
 console.log(checkOutDate)

 console.log(offerData)
  return (
    <div className=' container-xl my-5  '>
      
      <div className=' border-spacing-4 flex flex-row items-center justify-around pt-44'>
      <div className=' box w-3/6 h-72 bg-gray-50 flex flex-col items-center p-6 gap-1'>

        
        <Form.Control type="text" placeholder=" Search for the city"  className=' input w-11/12 h-10' value={location} onChange={(e)=>{setLocation(e.target.value)}}/>
        

          <div className='calendar flex flex-row'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
             <DemoContainer components={['DatePicker']}>
             <DatePicker label="Checkin"
             
             value={checkInDate}
             onChange={handleCheckInChange}
             inputFormat="MM/dd/yyyy" 
            // renderDay={(day, _value, DayComponentProps) => DayComponentProps.label}
             />
             </DemoContainer>
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
             <DemoContainer components={['DatePicker']}>
             <DatePicker label="Checkout"
              
              value={checkOutDate}
              onChange={handleCheckOutChange}
              inputFormat="MM/dd/yyyy"
             // renderDay={(day, _value, DayComponentProps) => DayComponentProps.label}
              />
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
          
    <Button variant="light" className=' bg-orange-500' onClick={Navigate} disabled={!checkInDate || !checkOutDate}>Search Hotel</Button>
         
      </div>

      <div className=' craousel w-96'>

        {loader?(<div><loader/></div>):(<div>


          <Carousel  className=' w-64 '>
          
     

        {Array.isArray(offerData)&&offerData.map((offer,index)=>(
           <Carousel.Item key={index} >

       
         <Card.Img variant="top"  className=" object-cover h-56 w-64" src={offer.heroUrl} />

         <Carousel.Caption>

          <p className=' text-black font-bold'>{offer.pTx}</p>
        </Carousel.Caption>
         
         
         </Carousel.Item>
        ))}
    
         </Carousel>
        </div>)}
       
      
      </div> 
           
      </div>

      

       
     

    </div>
  )
}

export default Hotelbookings
