import React,{useEffect,useState} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';



const Footer=()=>{
    
    return(
        <>
        <Navbar expand="lg" className="bg-body-tertiary h-16 " bg='light'>
      <Container>
        <Navbar.Brand href="#home" className=' font-sans text-2xl text-orange-500 font-bold pl-10'>Cleartrip</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">About us</Nav.Link>
            <Nav.Link href="#link">Careers</Nav.Link>
            <Nav.Link href="#link">FAQS</Nav.Link>
            <Nav.Link href="#link">Support</Nav.Link>
            <Nav.Link href="#link">Collection</Nav.Link>
            <Nav.Link href="#link">Gift Cards</Nav.Link>



            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


        </>
    )
     
    

}

export default Footer;