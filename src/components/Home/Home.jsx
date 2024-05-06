  import React, { useState,useEffect } from 'react'
  import { Container } from 'react-bootstrap'
  import Row from 'react-bootstrap/Row';
  import Col from 'react-bootstrap/Col';
  import Box from '../Box/Box';
  import NavDropdown from 'react-bootstrap/NavDropdown';
  import { IoAddCircleOutline } from "react-icons/io5";
  import { IoRemoveCircleOutline } from "react-icons/io5";
  import Button from 'react-bootstrap/Button';
  import { useNavigate } from 'react-router-dom';
  import { Link } from 'react-router-dom';
  import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import offer1 from "../Assets/CTINT_RR_FLIGHTS_29052023.webp";
import offer2 from "../Assets/GiftCards_RR_12072023.webp";
import offer3 from "../Assets/RR_CTTHAI_F_2012.webp";
import offer4 from "../Assets/RR_DOTW_Ayodhya_F_1501.webp";
import offer5 from "../Assets/RR_DOTW_Mauritius_F_1501.webp";
import offer6 from "../Assets/RR_TatkaalDeals_F_1101.webp"
import Dropdown from 'react-bootstrap/Dropdown';
import { MdFlightTakeoff } from "react-icons/md";
import { MdFlightLand } from "react-icons/md";
import Flight1 from "../Assets/Flight1.webp";
import Flight2 from "../Assets/Flight2.webp";
import Flight3 from "../Assets/Flight3.webp";
import Flight4 from "../Assets/Flight4.webp";
import { Navigate } from 'react-router-dom';



import dayjs from 'dayjs';
import { useDates } from '../../Provider';
//import {moment} from ''

  const Home = () => {

     const [wherefrom, setWherefrom]= useState("");
     const [whereTo, setwhereto]= useState("");
     const[ departureDate, setDeparturedate]=useState('Mon');
     const [landingDate, setLandingDate] = useState(null); 
     const[travelers, setTravlers]= useState('');
     const [travelClass, setTravelclass]= useState('');
     const [offerData,setOfferData]=useState([]);
     const[loader, setloader]= useState(false);
     const [buttonText,SetButtonText]= useState("Economy");
     const JwtToken=localStorage.getItem('userToken');
    //  const [endDate,setEndDate]= useState('');
    // const {setDates}= useDates();
    const {setlanding}= useDates();

    
     const navigate= useNavigate();
     console.log("departuredate",departureDate)
     
                

     const getDaysOfWeek=(dateString)=>{
      const date= new Date(dateString);
      const days=['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      return days[date.getDay()];

     }

     useEffect(()=>{

      
      async function offer(){
        setloader(true)
             
        const data= await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/offers?filter={"type":"FLIGHTS"}`,{
            
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

    // console.log(currentDate)
         function handleLandingDate(date){
          //  setLandingDate(date.format('YYYY-MM-DD'));
          //  setlanding(landingDate);
          const formattedDate = date.format('YYYY-MM-DD');
  setLandingDate(formattedDate);  // Update local state
  setlanding(formattedDate); 
         }

   console.log("landingdate",landingDate);
    
    console.log(offerData)
    const handleSelect = (eventKey) => {
      SetButtonText(eventKey);
    }

    console.log(offerData);

    function Navigate(){
         if(!JwtToken){
          navigate('/Signin')

         }
         else{
          navigate(`flightresult/${whereTo}/${wherefrom}/${departureDate}`)
         }
    }

    return (
      <div className=''>
      {/* <h1 className=' flex justify-center items-center font-bold'> Book your flight</h1> */}
      {/* <div className=' container-xl my-5 flex  pt-24 flex-row justify-around'> */}

      <div className='flex-col max-sm:flex-col max-sm:gap-4 gap-12 justify-between px-48 max-sm:px-12 mt-10 bg-white items-center ml-5 '>

      <div className=' flex flex-row max-sm:flex-col max-sm:gap-4 gap-12 justify-center px-48 max-sm:px-12 mt-10 bg-white  ml-5'>
       <div className=" max-sm: mt-12">

       <h1 className=' text-3xl font-semibold mt-2 max-sm:ml-14'>Search Flights</h1>
       <h1 class="font-semibold mt-2 text-stone-600 max-sm:ml-12">Enjoy hassle free bookings with Cleartrip</h1>
      
      {/* <div className=' border-spacing-4 pt-8 pb-10 relative px-10 ml-14 box w-3/6 h-72 bg-gray-50'> */}
      <div className='booking-card flex flex-col px-4 py-4 border-2 rounded-xl shadow-lg shadow-slate-200 my-6 relative '> 
        
      <div className=' count mb-6 m-auto'>
      <Dropdown onSelect={handleSelect} className=' bg-green-600'>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        1 person, {buttonText}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="Business Class">Business Class</Dropdown.Item>
        <Dropdown.Item eventKey="First Class">First Class</Dropdown.Item>
        <Dropdown.Item eventKey="Premium Economy">Premium Economy</Dropdown.Item>
        <Dropdown.Item eventKey="Economy">Economy</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

      </div>
        
   

  <section className=' flex flex-col items-end mt-6 '>
    <div className='where flex justify-start gap-4 items-center border rounded-md mb-4 px-4 py-2  '> 
    <MdFlightTakeoff/>
     
  <input list="departureFlight" className='border-2 px-2 py-1 rounded-md' style={{ width: '200px', marginRight: '10px' }}
      placeholder='where from?' onChange={(e)=>setWherefrom(e.target.value)}
      value={wherefrom}
  />
  <datalist id='departureFlight' className=' w-6 bg-white text-black'>
      <option>BLR</option>
      <option>BOM</option>
      <option>CCU</option>
      <option>DEL</option>
      <option>MAA</option>

  </datalist>

  <input list="destinationflight" className='border-2 px-2 py-1 rounded-md' style={{ width: '200px', marginRight: '10px' }}
  placeholder='where to?' onChange={(e)=>setwhereto(e.target.value)}
  value={whereTo}

  />
  <datalist id='destinationflight' className=' w-6 bg-white text-black'>
      <option>BLR</option>
      <option>BOM</option>
      <option>CCU</option>
      <option>DEL</option>
      <option>HYD</option>

  </datalist>
  
<MdFlightLand/>
  </div>
  </section>

    <div className='flex flex-col  gap-3 items-center '>
   
<div className=' flex flex-row gap-2'>
       <LocalizationProvider dateAdapter={AdapterDayjs}>
             <DemoContainer components={['DatePicker']}>
             <DatePicker label="Departure"
              
              value={departureDate}
              onChange={(date)=> setDeparturedate(getDaysOfWeek(date))}
              inputFormat="MM/dd/yyyy"
              disablePast
 
              />
             </DemoContainer>
          </LocalizationProvider>

          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
             <DemoContainer components={['DatePicker']}>
             <DatePicker label="Landing"
              
              value={landingDate}
              onChange={(date)=>handleLandingDate(date)}
              inputFormat="MM/dd/yyyy"
              disablePast
 
              />
             </DemoContainer>
          </LocalizationProvider> */}
          </div>
    <Button variant="danger" className=' bg-orange-500' onClick={Navigate} disabled={!departureDate || !whereTo || !wherefrom} >Search Flight</Button>
    </div>
      


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
      </div>

      </div>
      <div >
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

  export default Home
