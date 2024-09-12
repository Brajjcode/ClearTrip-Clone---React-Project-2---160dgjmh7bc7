import React, { useEffect } from 'react';
import gif from "../Assets/success.gif"
import Image from 'react-bootstrap/Image'
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const Finalpayment = () => {

  const navigate= useNavigate();

  useEffect(()=>{

    const timer= setTimeout(()=>{
      navigate('/')
    },7000)

    return ()=> clearTimeout(timer);

  },[navigate])


  
  return (
    <div className=' flex flex-col items-center justify-center pt-20'>
      <Alert variant='success' >
        Your Booking was successful!
      </Alert>
      <Image src={gif} fluid />
    </div>
  )
}

export default Finalpayment
