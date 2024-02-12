import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../Assets/1662522326.Cleartrip-New-Logo.jpg'
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';


import Box from "../Box/Box"
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div >
        
        <Navbar bg="light" data-bs-theme="light" className=' fixed-top' >
      <Container>
 <Link to={'/'}  ><Navbar.Brand href="#" className=' font-sans text-2xl text-orange-500 font-bold pl-10'>Cleartrip</Navbar.Brand></Link>     
        <Navbar.Collapse className="justify-content-end">
   <Link to={'/signin'}> <Button variant="primary" className=' bg-blue-600'>Login/Logout</Button>{' '}</Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   
   
    
    </div>
  )
}

export default Header
