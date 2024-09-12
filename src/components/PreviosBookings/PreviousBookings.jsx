import React from 'react'
import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaArrowRightLong } from "react-icons/fa6";
import { useAuth } from '../AuthContext';
const PreviousBookings = () => {

  const [data,setData]= useState([]);
  const JwtToken= localStorage.getItem('userToken');
  const{flightCount,setFlightCount}= useAuth();
   const [loader,setLoader]= useState(false)
  useEffect(()=>{
    setLoader(true);
    const FetchData= async()=>{
      setLoader(true);
    
      const response =await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/booking/`,{
        method: 'GET',
        headers:{
          Authorization:`Bearer ${JwtToken}`,
          'projectID':'f104bi07c490'
        }

      })
      const responseJson= await response.json();
      setData(responseJson.data);
      setLoader(false);
    

  }

  
  
    FetchData();
    



  },[JwtToken])
 // const date= new Date(data.start_date);
  //const formattedDate = `${startDate.getDate()}-${startDate.getMonth() + 1}-${startDate.getFullYear()}`;
console.log("data",data);
  return (
    <>
    <div className=' container '>
    <div className=' flex flex-wrap justify-center px-48 m-12 gap-5 pt-5 items-center '>
 

       
    {data.length > 0 ? (
          data.map((item) => (
            
            
            <Card key={item._id}  >
              <Card.Header className=' flex flex-row justify-around gap-14'><span className=' font-medium capitalize'>{item.booking_type}:<span className=' font-normal pl-1'> {item.flight ? `${item.flight.flightID}` : item.hotel ? `${item.hotel.name}` : "No Data Available"}</span></span> <span className=' font-bold'> {new Date(item.start_date).toDateString()}</span></Card.Header>
              <Card.Body>
                <Card.Title className=' flex flex-row justify-between'><span className=' font-bold'>{item.flight?`${item.flight.source}`: item.hotel?<span className=' font-semibold text-lg'>Checkin</span>:"No data available"}</span>
                <FaArrowRightLong />
                <span className=' font-bold'>{item.flight?`${item.flight.destination}`:item.hotel?<span className=' font-semibold text-lg'>Checkout</span>:"No data available"}</span>
                </Card.Title>
                <Card.Text className=' flex flex-row justify-between'>
                  <span>{item.flight?`${item.flight.departureTime}`:item.hotel?<span>{new Date(item.start_date).toDateString()}</span>:""}</span> <span>{item.flight?`${item.flight.arrivalTime}`:item.hotel?<span>{new Date(item.end_date).toDateString()}</span>:""}</span>
                </Card.Text>
                <Card.Text className=' flex flex-row justify-between pt-4'>

                <span className=' font-bold'>{item.flight?`₹${item.flight.ticketPrice}`:""}</span> <span className=' font-bold text-green-500'>{item.status}</span>
                </Card.Text>
                
              </Card.Body>
            </Card>
            
          ))
        ) : (
          <p>No bookings available</p>
        )}
    
   
   
    </div>
    </div>
    </>
  )
}

export default PreviousBookings
