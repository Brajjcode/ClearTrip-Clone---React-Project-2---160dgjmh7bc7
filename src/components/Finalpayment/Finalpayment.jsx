import React, { useEffect } from 'react';
import gif from "../Assets/success.gif"
import Image from 'react-bootstrap/Image'
import { useNavigate } from 'react-router-dom';

const Finalpayment = () => {

  const navigate= useNavigate();

  useEffect(()=>{

    const timer= setTimeout(()=>{
      navigate('/')
    },5000)

    return ()=> clearTimeout(timer);

  },[navigate])


  
  return (
    <div className=' flex items-center justify-center pt-20'>
      <Image src={gif} fluid />
    </div>
  )
}

export default Finalpayment
