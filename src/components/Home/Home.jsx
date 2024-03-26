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


import dayjs from 'dayjs';
//import {moment} from ''

  const Home = () => {

     const [wherefrom, setWherefrom]= useState("");
     const [whereTo, setwhereto]= useState("");
     const[ departureDate, setDeparturedate]=useState('Mon');
     const[travelers, setTravlers]= useState('');
     const [travelClass, setTravelclass]= useState('');
     const [offerData,setOfferData]=useState([]);
     const[loader, setloader]= useState(false)


     
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


    console.log(offerData)
    return (
      <div className=' container-xl my-5 flex  pt-24 flex-row justify-around'>
      <div className=' border-spacing-4 pt-8 pb-10 relative px-10 ml-14 box w-3/6 h-72 bg-gray-50'>

   

  <div className=' flex flex-row justify-center '>

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
  </div>
    
    <div className='flex flex-col mt-5 gap-3 items-center '>
   

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

    <Link to={`flightresult/${whereTo}/${wherefrom}/${departureDate}`} ><Button variant="danger" className=' bg-orange-500' >Search Flight</Button></Link>
    </div>
      


      </div>


      <div className=' craousel'>

        {loader?(<div><loader/></div>):(<div>


          <Carousel  className=' w-64 '>
          
     

        {Array.isArray(offerData)&&offerData.map((offer,index)=>(
           <Carousel.Item key={index} >

       
         <Card.Img variant="top"  className=" object-cover h-56 w-64" src={offer.skyBigFullImgUrl} />

         <Carousel.Caption>

          <p className=' text-black font-bold'>{offer.pTx}</p>
        </Carousel.Caption>
         
         
         </Carousel.Item>
        ))}
    
         </Carousel>
        </div>)}
       
      
      </div>

      
      </div>




    )
  }

  export default Home
