import React from 'react'
import { useState,useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AirIndia from '../Assets/AI.svg'
import Vistara from '../Assets/UK.svg'
import Indigo from '../Assets/6E.svg'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import { MdFlightTakeoff } from "react-icons/md";
import { MdFlightLand } from "react-icons/md";
//import Dropdownj from '../Dropdown/Dropdown';
import Dropdownjsx from '../Dropdown/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import { Checkbox } from '@mui/material';
import { FaPooStorm } from 'react-icons/fa';
import { useDates } from '../../Provider';
import { useAuth } from '../AuthContext';
import { FaArrowRightLong } from "react-icons/fa6";




const FlightResult = (props) => {
  const[sortOption,setoption]= useState('')
  const [filteredFlights, setFilteredFlights] = useState([]);
  const {whereto,wherefrom,departureday}=useParams();
  const[flightData,setFlightdata]=useState([]);
 // const[duration,setduration]=useState('')
  const[loader,setloader]= useState(false);
  const {landingDate,setlanding}= useDates();
  const{origin,setorigin,destination,setDestination}=useAuth();



  const [stopsFilter, setStopsFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);
  const [duration,setduration]= useState([]);
  const [priceRangeFilter, setPriceRangeFilter] = useState({ min: 2000, max: 2500 });
   console.log("source",whereto);
   console.log("destination",wherefrom)
   console.log("day",departureday)

   useEffect(() => {
    const searchFlight=async()=>{
    //  console.log("teddybear")
      setloader(true);
      try{
        
          // Build sorting parameters based on user selection
          let sortParams = {};
          switch (sortOption) {
            case 'Lowest':
              sortParams.price = 1;
              break;
            case 'highest':
              sortParams.price = -1;
              break;
            case 'EarliestDeparture':
              sortParams.timings = 1;
              break;
            case 'LatestDeparture':
              sortParams.timings = -1;
              break;
            // Add more cases for other sorting options if needed
            default:
              break;
          }
          let filterParams = {};
        if (stopsFilter.length > 0) filterParams.stops = stopsFilter;
        if (duration.length > 0) filterParams.duration = duration;
        filterParams.ticketPrice = { $gte: priceRangeFilter.min, $lte: priceRangeFilter.max };

        const queryString = `search={"source":"${whereto}","destination":"${wherefrom}"}&day=${departureday}&sort=${JSON.stringify(
          sortParams
        )}&filter=${JSON.stringify(filterParams)}`;

        console.log("params",JSON.stringify(sortParams))      
        const fetchData = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/flight?${queryString}`, {
          method: 'GET',
          headers: {
            'projectID': 'f104bi07c490',
          },
        });
        
      
      const data= await fetchData.json();
      console.log("data",data);
      
     
      setFlightdata(data);
     setloader(false)
      
      
    }
    catch(error){
      setloader(true);
      console.log(error)

    }



     }

 searchFlight();
}, [whereto,wherefrom,departureday,sortOption,stopsFilter,duration, priceRangeFilter]);

  function handlechange(options){
        setoption(options);
  }


  console.log(sortOption);
 
 console.log("flightdata",flightData.data);
 function handledurationFilter(name) {
  

  //setduration([value]);
  setduration((prevDuration) => {
    // If the name is already in the duration array, remove it; otherwise, add it
    if (prevDuration.includes(name)) {
      return prevDuration.filter((duration) => duration !== name);
    } else {
      return [...prevDuration, name];
    }
  });
}

function handleStopsFilter(value) {
  // Check if the value is already in the filter, remove it; otherwise, add it
 // setStopsFilter([value]);

 setStopsFilter((prevFilter)=>{

  if(prevFilter.includes(value)){
    return prevFilter.filter((filter)=>filter!==value);
  }
   else{
    return[...prevFilter,value]
   }
 })

}

function handlePriceRangeFilter(event) {
  // Update the price range filter based on the input range value
  setPriceRangeFilter({ ...priceRangeFilter, max: parseInt(event.target.value) });
}
  return (
    <>
     {loader ? (
      <div>Loading...</div>
    ) : ( 
      <div>
        <div className='  ml-3 mt-20 position-fixed z-10 '>
        <Dropdownjsx   name="Sort By Departure" item1="Earliest Departure" item2="Latest Departure" value1="Earliest Departure" value2="Latest Departure"  onselectoption={handlechange}  />
        </div>
      {/* <div className=' flex flex-row justify-center items-center gap-5 max-sm: flex-col'> */}
      <div className=' flex flex-col md:flex-row justify-center items-start gap-5 '>
              <div className='w-full md:w-1/4 mt-5'>
         {/* <Nav defaultActiveKey="/home" className="flex-column w-96 h-96 mt-5   "> */}
         <Nav defaultActiveKey="/home" className="flex-column w-full  ">
         <Accordion defaultActiveKey="0" className=' position-fixed top-40 left-4 w-72 ' >
      <Accordion.Item eventKey="0">
        <Accordion.Header>Stops</Accordion.Header>
        <Accordion.Body>
        <label>
            
            <Form.Check type="checkbox" checked={stopsFilter.includes("0")} name="0" label='0 stops' onChange={(e) => handleStopsFilter(e.target.name)} /> 
            <Form.Check type="checkbox" name="1" checked={stopsFilter.includes("1")} label="1 stops" onChange={(e) => handleStopsFilter(e.target.name)} /> 
            <Form.Check type="checkbox" name="2" checked={stopsFilter.includes("2")} label="2 stops" onChange={(e) => handleStopsFilter(e.target.name)} />
          
          </label>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Duration</Accordion.Header>
        <Accordion.Body>
        <label>
            
            <Form.Check name="1"  label="1hr" type="checkbox"  checked={duration.includes("1")} onChange={(e) => handledurationFilter(e.target.name) } /> 
            <Form.Check name="2" label="2hr"  type='checkbox'  checked={duration.includes("2")} onChange={(e) => handledurationFilter(e.target.name)} /> 
            <Form.Check  name='6' label="6hr" type="checkbox"  checked={duration.includes("6")} onChange={(e) => handledurationFilter(e.target.name)} /> 

         
          </label>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Price</Accordion.Header>
        <Accordion.Body>
        <label>
           <input type='range' min="2000" max="2500" value={priceRangeFilter.max} onChange={handlePriceRangeFilter}  /> {priceRangeFilter.min}-{priceRangeFilter.max}
          </label>
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>

         </Nav>
         </div>

        {/* <Dropdownjsx name="Sort By Price" item1="Lowest to higest" item2="Highest to Lowest" value1="Lowest" value2="highest" onselectoption={handlechange}/> */}

          
      <div className='flex items-center justify-center '>
   

         
        <div className='flex flex-col items-center justify-center gap-4 mt-20  mb-6'>
       <div className=' flex flex-row'>
        <input list="destinationflight" className='border-2 px-2 py-1 rounded-md' style={{ width: '200px', marginRight: '10px' }}
  placeholder='where from?'value={origin} onChange={()=>e.target.value} disabled
  
       
  />
  <div className=' pt-2 pr-3 '>
  <FaArrowRightLong />
  </div>
    <input list="destinationflight" className='border-2 px-2 py-1 rounded-md' style={{ width: '200px', marginRight: '10px' }}
  placeholder='where to?' value={destination} onChange={()=>e.target.value} disabled
  

  />
   <input list="destinationflight" className='border-2 px-2 py-1 rounded-md' style={{ width: '200px', marginRight: '10px' }}
  placeholder='Date' value={new Date(landingDate).toDateString()} onChange={()=>e.target.value} disabled
  

  />
  </div>

          
          {flightData.data && flightData.data.flights ? (
            flightData.data.flights.map((flight) => (
              <Card key={flight.flightID} className='border-2 rounded-xl shadow-lg shadow-slate-200'>
                <Card.Header>Enjoy Free Meal</Card.Header>
                <Card.Body className='flex flex-row items-center gap-10  '>
                  <Row className='flex flex-row'>
                    <Col xs={10} md={11}>
                      <Image src={AirIndia} square />
                    </Col>
                  </Row>
                <Card.Text>
                    <div className='flex flex-col font-light'>{flight.flightID}</div>
                  </Card.Text>
                  <div className='flex flex-row gap-3'>
                    <Card.Title>
                      <MdFlightTakeoff />
                      {flight.departureTime}
                    </Card.Title>
                    <div className=' flex flex-col'>
                      <span>duration:{flight.duration}hrs</span>
                      <span>stops:{flight.stops}</span>
                    </div>
                  </div>
                  <Card.Title>
                    <MdFlightLand />
                    {flight.arrivalTime}
                  </Card.Title>
                  <div>
             <Link to={`/FlightCheckoutPage/${flight._id}`}> <Button variant="primary" className='bg-blue-500'>
                      ₹{flight.ticketPrice}.00
                    </Button> </Link> 
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <div>No flights available</div>
          )}
        </div>
      </div>
      </div>
      </div>
    )}
  </>
  // <>
  //     {loader ? (
  //       <div>Loading...</div>
  //     ) : (
  // <div className='flex flex-col md:flex-row justify-center items-start gap-5 mt-5'>
  //         <div className='w-full md:w-1/4'>
  //           <div className='sticky top-20'>
  //             <Dropdownjsx
  //               name="Sort By Departure"
  //               item1="Earliest Departure"
  //               item2="Latest Departure"
  //               value1="Earliest Departure"
  //               value2="Latest Departure"
  //               onselectoption={handlechange}
  //             />
  //             <Nav defaultActiveKey="/home" className="flex-column w-full mt-5">
  //               <Accordion defaultActiveKey="0">
  //                 <Accordion.Item eventKey="0">
  //                   <Accordion.Header>Stops</Accordion.Header>
  //                   <Accordion.Body>
  //                     <Form.Check
  //                       type="checkbox"
  //                       checked={stopsFilter.includes("0")}
  //                       name="0"
  //                       label='0 stops'
  //                       onChange={(e) => handleStopsFilter(e.target.name)}
  //                     />
  //                     <Form.Check
  //                       type="checkbox"
  //                       name="1"
  //                       checked={stopsFilter.includes("1")}
  //                       label="1 stops"
  //                       onChange={(e) => handleStopsFilter(e.target.name)}
  //                     />
  //                   </Accordion.Body>
  //                 </Accordion.Item>
  //                 <Accordion.Item eventKey="1">
  //                   <Accordion.Header>Duration</Accordion.Header>
  //                   <Accordion.Body>
  //                     <Form.Check
  //                       name="1"
  //                       label="1hr"
  //                       type="checkbox"
  //                       checked={duration.includes("1")}
  //                       onChange={(e) => handledurationFilter(e.target.name)}
  //                     />
  //                     <Form.Check
  //                       name="2"
  //                       label="2hr"
  //                       type='checkbox'
  //                       checked={duration.includes("2")}
  //                       onChange={(e) => handledurationFilter(e.target.name)}
  //                     />
  //                     <Form.Check
  //                       name='6'
  //                       label="6hr"
  //                       type="checkbox"
  //                       checked={duration.includes("6")}
  //                       onChange={(e) => handledurationFilter(e.target.name)}
  //                     />
  //                   </Accordion.Body>
  //                 </Accordion.Item>
  //                 <Accordion.Item eventKey="2">
  //                   <Accordion.Header>Price</Accordion.Header>
  //                   <Accordion.Body>
  //                     <input
  //                       type='range'
  //                       min="2000"
  //                       max="2500"
  //                       value={priceRangeFilter.max}
  //                       onChange={handlePriceRangeFilter}
  //                     />
  //                     {priceRangeFilter.min}-{priceRangeFilter.max}
  //                   </Accordion.Body>
  //                 </Accordion.Item>
  //               </Accordion>
  //             </Nav>
  //           </div>
  //         </div>

  //         <div className='flex flex-col items-center w-full md:w-3/4'>
  //           <div className='flex flex-col items-center justify-center gap-4'>
  //             {flightData.data && flightData.data.flights ? (
  //               flightData.data.flights.map((flight) => (
  //                 <Card key={flight.flightID} className='w-full border-2 rounded-xl shadow-lg'>
  //                   <Card.Header>Enjoy Free Meal</Card.Header>
  //                   <Card.Body className='flex flex-col md:flex-row items-center gap-4'>
  //                     <Row className='flex flex-row items-center'>
  //                       <Col xs={4} md={2}>
  //                         <Image src={AirIndia} thumbnail />
  //                       </Col>
  //                       <Col xs={8} md={10}>
  //                         <Card.Text className='font-light'>{flight.flightID}</Card.Text>
  //                         <div className='flex flex-row gap-3'>
  //                           <Card.Title>
  //                             <MdFlightTakeoff />
  //                             {flight.departureTime}
  //                           </Card.Title>
  //                           <div className='flex flex-col'>
  //                             <span>duration: {flight.duration} hrs</span>
  //                             <span>stops: {flight.stops}</span>
  //                           </div>
  //                         </div>
  //                         <Card.Title>
  //                           <MdFlightLand />
  //                           {flight.arrivalTime}
  //                         </Card.Title>
  //                       </Col>
  //                     </Row>
  //                     <Link to={`/FlightCheckoutPage/${flight._id}`}>
  //                       <Button variant="primary" className='bg-blue-500'>
  //                         ₹{flight.ticketPrice}.00
  //                       </Button>
  //                     </Link>
  //                   </Card.Body>
  //                 </Card>
  //               ))
  //             ) : (
  //               <div>No flights available</div>
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </>
)
  
}

export default FlightResult;
