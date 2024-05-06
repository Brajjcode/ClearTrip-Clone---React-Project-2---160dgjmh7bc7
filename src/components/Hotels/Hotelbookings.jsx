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
import offer1 from "../Assets/CTINT_RR_FLIGHTS_29052023.webp";
import offer2 from "../Assets/GiftCards_RR_12072023.webp";
import offer3 from "../Assets/RR_CTTHAI_F_2012.webp";
import offer4 from "../Assets/RR_DOTW_Ayodhya_F_1501.webp";
import offer5 from "../Assets/RR_DOTW_Mauritius_F_1501.webp";
import offer6 from "../Assets/RR_TatkaalDeals_F_1101.webp"
import Flight1 from "../Assets/Flight1.webp";
import Flight2 from "../Assets/Flight2.webp";
import Flight3 from "../Assets/Flight3.webp";
import Flight4 from "../Assets/Flight4.webp";
import Hotel2 from "../Assets/Hotel2.webp";
import Hotel5 from "../Assets/Hotel5.webp";


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
    setCheckInDate(date.format('YYYY-MM-DD'));
    setDates(date, checkInDate);
  };


  const handleCheckOutChange = (date) => {
    setCheckOutDate(date.format('YYYY-MM-DD'));
    setDates(checkOutDate, date);
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


      
      <div className=' flex-col max-sm:flex-col max-sm:gap-4 gap-12 justify-between px-48 max-sm:px-2 mt-10 bg-white items-center ml-5'>

    <div className='  flex flex-row max-sm:flex-col max-sm:gap-4 gap-12 justify-center px-48 max-sm:px-12 mt-10 bg-white  ml-5'>
     <div className=' max-sm: mt-12'>
     <h1 className=' text-3xl font-semibold mt-2 max-sm:ml-20'>Search Hotels</h1>
       <h1 class="font-semibold mt-2 text-stone-600 max-sm: ml-12">Enjoy hassle free bookings with Cleartrip</h1>
    

      <div className=' booking-card flex flex-col px-4 py-4 border-2 rounded-xl shadow-lg shadow-slate-200 my-6 relative'>


        
        <Form.Control type="text" placeholder=" Search for the city"  className=' input w-11/12 h-10' value={location} onChange={(e)=>{setLocation(e.target.value)}}/>
        

          <div className='calendar flex flex-row gap-3'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
             <DemoContainer components={['DatePicker']}>
             <DatePicker label="Checkin"
             
             value={checkInDate}
             onChange={handleCheckInChange}
             inputFormat="MM/dd/yyyy" 
             disablePast
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
              disablePast
             // renderDay={(day, _value, DayComponentProps) => DayComponentProps.label}
              />
             </DemoContainer>
          </LocalizationProvider>
          
          
             </div> 
             
             <div className="guest-counter-container flex flex-row gap-2">
  <div className="guest-counter-section flex flex-col items-center">
    <label className="counter-label">Adults:</label>
    <div className="counter-controls flex flex-row items-center">
      <Button variant="outline-primary" className=" bg-blue-500 text-white" onClick={incrementAdults}>+</Button>
      <input type="text" value={adultsCount} className="w-8 p-1 text-center" readOnly />
      <Button variant="outline-primary" className=" bg-blue-500 text-white" onClick={decrementAdults}>-</Button>
    </div>
  </div>

  <div className="guest-counter-section flex flex-col items-center">
    <label className="counter-label">Children:</label>
    <div className="counter-controls flex flex-row items-center">
      <Button variant="outline-primary" className=" bg-blue-500 text-white" onClick={incrementChildren}>+</Button>
      <input type="text" value={childrenCount} className="w-8 p-1 text-center" readOnly />
      <Button variant="outline-primary" className=" bg-blue-500 text-white" onClick={decrementChildren}>-</Button>
    </div>
  </div>
</div>

          
    <Button variant="light" className=' bg-orange-500' onClick={Navigate} disabled={!checkInDate || !checkOutDate}>Search Hotel</Button>
         
      </div>
      </div>


      <div className=' craousel flex flex-col gap-4 max-sm:hidden mt-4 '>

       


<Carousel  className=' w-80 h-72 max-sm:hidden card border-stone-400 shadow-xl   '>

 <Carousel.Item >

<Card.Img variant="top"  className=" object-cover  w-80 h-72" src={offer1} />    

</Carousel.Item>
<Carousel.Item >

<Card.Img variant="top"  className=" object-cover  w-80 h-72" src={offer2} />    

</Carousel.Item>
<Carousel.Item >

<Card.Img variant="top"  className=" object-cover  w-80 h-72" src={offer3} />    

</Carousel.Item>
<Carousel.Item >

<Card.Img variant="top"  className=" object-cover  w-80 h-72" src={offer4} />    

</Carousel.Item>
<Carousel.Item >

<Card.Img variant="top"  className=" object-cover w-80 h-72" src={offer5} />    

</Carousel.Item>
<Carousel.Item >

<Card.Img variant="top"  className=" object-cover w-80 h-72" src={offer6} />    

</Carousel.Item>


</Carousel>

<h1 className=' text-xl font-semibold mt-6'> More Offers</h1>

<div className=' card border-stone-400 shadow-xl p-5'>
<div>
<h1>Sorry, no more offer as of now.</h1>
<h1>Come back later</h1>
</div>
</div>


</div>

</div>
<div className=''>
      <h1 className=' text-2xl font-bold my-4 sm:mt-4 border-l-4 max-sm:my-6 border-orange-500 pl-2 mr-96">'> Card Offers</h1>
      <div className=' flex flex-wrap gap-2 justify-center items-center'>
         <img src={Flight1} className=' w-60'/>
         <img src={Flight2} className=' w-60 '/>
         <img src={Flight3} className=' w-60'/>
         <img src={Flight4} className=' w-60 '/>
         <img src={Hotel2} className=' w-60 '/>
         <img src={Hotel5} className=' w-60 '/>
      </div>

      </div>
      <div>
      <h1 className=' text-2xl font-bold my-4 sm:mt-4 border-l-4 max-sm:my-6 border-orange-500 pl-2 mr-96">'> Cleartrip Offers</h1>
      <div className=' flex flex-wrap gap-2 justify-center items-center'>

          {Array.isArray(offerData) && offerData.slice(0, 9).map((offer)=>(
            <Card style={{
              width: 280, // Set a fixed width
              height: '100%', // Set a fixed height to make all cards the same height
              margin: 2,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
            key={offer._id}
            >
              <Card.Img style={
                {
                  objectFit: 'cover',
                  width: 300, // Make sure the image takes 100% width within the card
                  height: 200 , // Set a fixed height for the image within the card
                  margin: 'auto',
                  display: 'block',
                }
              } variant="top " src={offer.heroUrl} />
            <Card.Body>
            <div className=' flex justify-around'>
            <Card.Title className=' text-sm font-semibold'>{offer.pT1} <br/> <span>{offer.pTx}</span> </Card.Title>
            
            </div>
            </Card.Body>
            </Card>
            

          ))}
          </div>
      </div>




 
           
      </div>

      

       
     

    </div>
  )
}

export default Hotelbookings;
