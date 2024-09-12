import React from 'react'
import { Nav} from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useState ,useEffect} from 'react';
import { Link ,useLocation } from 'react-router-dom';



const SideHeader = () => {

  const[Active,SetActive]= useState(``);
  const location = useLocation();
  const handleButtonClick=(buttonName)=>{
  SetActive(buttonName);


  }
  useEffect(() => {
    if (location.pathname === '/') {
      SetActive('Flights');
    } else if (location.pathname === '/BookHotels') {
      SetActive('Hotels');
    } else if (location.pathname === '/PreviousBookings') {
      SetActive('PreviousBookings');
    }
  }, [location.pathname]);

  
 

  return (
    <Container>
    <div className=' mt-16'>
     
      <Nav defaultActiveKey="/home" className=' h-full w-40 flex-col max-sm:flex-row  h-10 absolute md:fixed ml-10 gap-3 ' style={{ left: '0' }}>
        
      <Link to='/'><Button variant="light" className={`w-40 text-xl text-black font-semibold flex items-center justify-center rounded-lg p-2 text-base font-normal ${Active==='Flights'? ' bg-blue-300 text-white': ' bg-orange-500 text-black'}`} onClick={()=>handleButtonClick('Flights')}>Flights</Button></Link>
      
          
      <Link to='/BookHotels'>   <Button variant="light" className={`w-40 text-xl text-black font-semibold flex items-center justify-center rounded-lg p-2 text-base font-normal ${Active==='Hotels'? ' bg-blue-300 text-white': ' bg-orange-500 text-black'}`  } onClick={()=>handleButtonClick('Hotels')} >Hotels</Button></Link>
          

          
         
      <Link to='/PreviousBookings'>  <Button variant="light" className={`w-40 text-xl text-black font-semibold flex items-center justify-center rounded-lg p-2 text-base font-normal ${Active==='PreviousBookings'? ' bg-blue-300 text-white': ' bg-orange-500 text-bla'}`  } onClick={()=>handleButtonClick('PreviousBookings')} >History</Button> </Link>
         

        
      </Nav>
    </div>
    </Container>
  )
}




export default SideHeader
