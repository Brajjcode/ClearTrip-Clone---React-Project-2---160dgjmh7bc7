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
import Alert from 'react-bootstrap/Alert';
import banner from '../Assets/desktop_flights_bsb_travelMax.webp'
import Footer from '../../Footer/Footer';


import dayjs from 'dayjs';
import { useDates } from '../../Provider';
import { useAuth } from '../AuthContext';
//import {moment} from ''


  const Home = () => {

     const [wherefrom, setWherefrom]= useState("");
     const [whereTo, setwhereto]= useState("");
     const[ departureDate, setDeparturedate]=useState('');
     //const [landingDate, setLandingDate] = useState(null); 
     const[travelers, setTravlers]= useState('');
     const [travelClass, setTravelclass]= useState('');
     const [offerData,setOfferData]=useState([]);
     const[loader, setloader]= useState(false);
     const [buttonText,SetButtonText]= useState("Economy");
     const JwtToken=localStorage.getItem('userToken');
    // const[]
   
    //  const [endDate,setEndDate]= useState('');
    // const {setDates}= useDates();
    const {landingDate,setlanding}= useDates();
    //const{flightCount,setFlightCount}= useAuth();
    const {isLoggedIn,setIsLoggedIn,alert,setShowAlert,flightCount,setFlightCount,origin,setorigin,destination,setDestination,travellingDate,SetTravellingdate}= useAuth();
    const [showAlert, setLocalShowAlert] = useState(false);
    const[alertLocation,setalertLocation]=useState(false)
    const [adultsCount, setAdultsCount] = useState(1);

    setTimeout(()=>{
      if(alertLocation){
        setalertLocation(false)
      }
    },2000)
 
    
     const navigate= useNavigate();
     console.log("departuredate",departureDate)

     const incrementAdults = () => {
      setAdultsCount(adultsCount + 1);
      setFlightCount(adultsCount+1);
    };
    const decrementAdults = () => {
      if (adultsCount > 1) {
        setAdultsCount(adultsCount - 1);
        setFlightCount(adultsCount-1);
      }
    };
                

     const getDaysOfWeek=(dateString)=>{
      setlanding(dateString);
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

    //  const handleAlertClose = () => {
      
    // };

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
    // useEffect(() => {
    //   if (showAlert) {
    //     const timer = setTimeout(() => {
    //       setLocalShowAlert(false);
    //     }, 3000);
  
    //     return () => {
    //       clearTimeout(timer);
    //     };
    //   }
    // }, [showAlert]);
    const handleAlertClose = () => {
      setLocalShowAlert(false);
      //setShowAlert(false);
    };

    useEffect(() => { 
     const alertFlag = localStorage.getItem('showAlert');
      if (alertFlag === 'true') {
          setLocalShowAlert(true);
          localStorage.removeItem('showAlert'); 
      }
  }, []);

  const airportMap = {
    'BLR': 'Kempegowda International Airport, Bangalore',
    'BOM': 'Chatrapati Shivaji Airport, Mumbai',
    'DEL': 'Indira Gandhi International Airport, New Delhi',
    'CCU': 'Netaji Subhas Chandra Bose International Airport,Kolkata',
    'MAA': 'Madras International Meenambakkam Airport, Chennai'
  };
  console.log(landingDate,"landingdate");

   const handleInputChange=(e)=>{
    const inputValue= e.target.value;

    const selectedKey= Object.keys(airportMap).find(
      key=>airportMap[key]== inputValue
    );



    if(selectedKey){
      setWherefrom(selectedKey);

    }
    else{
      setWherefrom(inputValue);
    }
    setorigin(e.target.value)
   }

   const handleInputChangeWhereto=(e)=>{
    const Value= e.target.value;
    
    

    const selectedKey= Object.keys(airportMap).find(
      key=>airportMap[key]== Value
    );

    const finalValue = selectedKey || Value;
    if (wherefrom === finalValue) {
         setalertLocation(true)
      
    }
     
    if(wherefrom!==finalValue)
    {
    setwhereto(finalValue);
    }
   setDestination(e.target.value);
  
   }

    return (
      <div className='container'>
      <div className='flex-col max-sm:flex-col max-sm:gap-4 gap-12 justify-between px-48 max-sm:px-12 mt-10 bg-white items-center ml-5 '>
      {showAlert && (
        <div className=' flex items-center justify-center z-50 absolute '>
            <div role="alert" class="fade  bg-slate-100 alert alert-primary alert-dismissible show w-96 h-16"  dismissible>
            <button type="button" class="btn-close" aria-label="Close alert" onClick={handleAlertClose}>X</button>
            <div class="alert-heading h4">Logged in Sucessfully</div>
       </div> 
       </div>

      )}
      {
        alertLocation &&(
          <Alert key="danger" variant="danger" dismissible className=' flex justify-between w-96'> 
               <span>Origin and Destination cannot be same!</span>
        </Alert>
        )
      }
      <div className=' flex flex-row max-sm:flex-col max-sm:gap-4 gap-12 justify-center px-48 max-sm:px-12 mt-10 bg-white  ml-5'>
       <div className=" max-sm: mt-12">
      
       <h1 className=' text-3xl font-semibold mt-2 max-sm: ml-20'>Search Flights</h1>
       <h1 class="font-semibold mt-2 text-stone-600 max-sm: ml-20">Enjoy hassle free bookings with Cleartrip</h1>
      
      {/* <div className=' border-spacing-4 pt-8 pb-10 relative px-10 ml-14 box w-3/6 h-72 bg-gray-50'> */}
      <div className='booking-card flex flex-col px-4 py-4 border-2 rounded-xl shadow-lg shadow-slate-200 my-6 relative mx-auto max-sm: w-auto p-10 '> 
      
        
      <div className=' count mb-6 m-auto flex flex-row items-center justify-center gap-7'>
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

    <div className="guest-counter-section flex flex-col items-center">
    <label className="counter-label">Number of Person:</label>
    <div className="counter-controls flex flex-row items-center">
      <Button variant="outline-primary" className=" bg-blue-500 text-white" onClick={incrementAdults}>+</Button>
      <input type="text" value={adultsCount} className="w-8 p-1 text-center" readOnly />
      <Button variant="outline-primary" className=" bg-blue-500 text-white" onClick={decrementAdults}>-</Button>
    </div>
  </div>

      </div>
        
   

  <section className=' flex flex-col items-end mt-6 '>
    <div className='where flex justify-start gap-4 items-center border rounded-md mb-4 px-4 py-2  '> 
    <MdFlightTakeoff/>
     
  <input list="departureFlight" className='border-2 px-2 py-1 rounded-md' style={{ width: '200px', marginRight: '10px' }}
      placeholder='where from?' onChange={handleInputChange}
      value={airportMap[wherefrom] || wherefrom}
  />
  <datalist id='departureFlight' className=' w-6 bg-white text-black'>
      {Object.keys(airportMap).map((key)=>(
        <option key={key} value={airportMap[key]}/>
      ))}

  </datalist>

  <input list="destinationflight" className='border-2 px-2 py-1 rounded-md' style={{ width: '200px', marginRight: '10px' }}
  placeholder='where to?' onChange={handleInputChangeWhereto}
  value={airportMap[whereTo]||whereTo}

  />
  <datalist id='destinationflight' className=' w-6 bg-white text-black'>
  {Object.keys(airportMap).map((key)=>(
        <option key={key} value={airportMap[key]}/>
      ))}

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

     
          </div>
    <Button variant="danger" className=' bg-orange-500' onClick={Navigate} disabled={!departureDate || !whereTo || !wherefrom}>Search Flight</Button>
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

      <div className='flex flex-col items-start gap-4 mb-3 '>
  <h1 className='text-2xl font-bold mt-4 sm:mt-4  max-sm:my-6 pl-14 '>
    Card Offers
  </h1>
  </div>
      
         <div className=' flex flex-col items-center gap-4'>
     
      <div className=' flex flex-wrap gap-2 justify-center items-center'>
         <img src={Flight1} className=' w-80'/>
         <img src={Flight2} className=' w-80 '/>
         <img src={Flight3} className=' w-80'/>
         <img src={Flight4} className=' w-80 '/>
         <img src={Flight1} className=' w-80'/>
         <img src={Flight2} className=' w-80'/>
      </div>

     
      
       
       
        <div style={{ width: '89%' }}>
          <img src={banner} className='w-full' />
        </div>
      <h1 className=' text-2xl font-bold my-4 sm:mt-4  max-sm:my-6 pl-2 left-8'>Why book on Cleartrip?</h1>
      {/* <div className=' flex flex-wrap gap-2 justify-center items-center'>

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
          </div> */}
          <div style={ {width: '89%'}}>
           <p>
            On Cleartrip.com, you can turn all your plans into trips. From flight ticket bookings, and booking hotels online to airport, rental and outstation cab booking, with Cleartrip, no travel dream is far enough. Fly to your favourite destinations with the best flight offers across various airline options like IndiGo, Air India, SpiceJet, Go First, AirAsia, Vistara, etc. Make the most of your holiday plans by relaxing, rejuvenating and enjoying amazing leisure experiences at our vast range of hotels. From affordable and budget-friendly hotels to the best 5-star properties, book your stay on Cleartrip with unmissable offers. Be it for business travel or pleasure, you can now get the best deals on flights and hotels. So, where to?
           </p>
           </div>

           <div className=' pt-4' style={ {width: '89%'}}>
            <div className=' font-bold' >
               Booking flights & hotels online with Cleartrip
            </div>
            <p>
            From queries to itineraries, for all things travel, there is Cleartrip. Checking your flight updates and PNR status is easy with our simple, intuitive app and booking site. Booking online hotels gets seamless with a range of choices and the greatest hotel deals.
            </p>
            <p className=' pt-4'>
            Here’s why booking flights and hotels with Cleartrip is your Clear Advantage:
            </p>
              
            < div className=' pt-3'>
            <span className=' font-semibold'>
            ClearChoice Max:
            </span>
               <span>
               Free cancellation or rescheduling for domestic (up to 24 hrs before departure) & international flights (up to 72 hrs before departure).
               </span>
            </div>
            < div className=' pt-3'>
            <span className=' font-semibold'>
            ClearChoice Plus:
            </span>
               <span>
               Free date change or airline change up to 12 hrs (up to 24 hours for Air India*& Vistara*) before departure.
               </span>
            </div>
            < div className=' pt-3'>
            <span className=' font-semibold'>
            Easy hotel cancellation:
            </span>
               <span>
               Cancel your hotel stay easily. Zero fees on hotel cancellations up to 24 hours before check-in on 20k+ hotels.
               </span>
            </div>
            < div className=' pt-3'>
            <span className=' font-semibold'>
            Instant refund initiation: 
            </span>
               <span>
               Cancel your hotel stay easily. Zero fees on hotel cancellations up to 24 hours before check-in on 20k+ hotels.All refunds on flight and hotel cancellations are initiated instantly.
               </span>
            </div>
            < div className=' pt-3'>
            <span className=' font-semibold'>
            Medi-cancel refund:
            </span>
               <span>
               Cancel your domestic flight booking easily on valid medical grounds and get up to ₹3500 against airline cancellation charges per passenger per segment.
               </span>
            </div>
            < div className=' pt-3'>
            <span className=' font-semibold'>
            International travel insurance: 
            </span>
               <span>
               Get stress-free coverage against a vast range of uncertainties for all international destinations at only ₹89 per user per day.
               </span>
            </div>

           </div>
           <div className=' pt-8'style={ {width: '89%'}} >
            <h3 className=' font-semibold'>
            What are the benefits of booking flights online with Cleartrip?
            </h3>

            <p className=' pt-2'>
            Get the best flight fares with exciting flight offers on your air ticket when you book with Cleartrip. Unmissable sales and deals like Travel Max Sale, Big Travel Sale, Cleartrip Tatkaal, etc. offer never-seen-before discounts that help you book flights at affordable rates. Best flight discounts await you when you book with bank cards like ICICI, Bank of Baroda, HDFC, Axis, Kotak etc.

            </p>

           </div>


      

      </div>
     
          
      </div>

      

    
<Footer/>


      </div>


    )
  }

  export default Home
