import React from 'react'
import { Nav} from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
// import FlightIcon from '@mui/icons-material/Flight';
// import FoodBankIcon from '@mui/icons-material/FoodBank';

const SideHeader = () => {
 // max-w-xs max-h-max
  return (
    <div className=' mt-14'>
         <Nav defaultActiveKey="/home" className="flex-column position-fixed ">
      <Nav.Link href="/"> <Button variant="light" className=' w-40 text-xl text-black font-semibold '>Flights</Button></Nav.Link>
      <Nav.Link href='/BookHotels'><Button variant="light" className=' w-40 text-xl text-black font-semibold'> Hotels</Button></Nav.Link>
      <Nav.Link eventKey="link-2"><Button variant="light" className=' w-40 text-xl text-black font-semibold'>Offer</Button></Nav.Link>
      
    </Nav>
  
      
    </div>
  )
}

export default SideHeader
