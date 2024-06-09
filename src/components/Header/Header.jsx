import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../Assets/1662522326.Cleartrip-New-Logo.jpg'
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';

import Box from "../Box/Box"
import { Link } from 'react-router-dom';

import { useAuth } from '../AuthContext';

const Header = () => {

 
// const [isLoggedIn, setIsLoggedIn] = useState(false);
const { isLoggedIn, logout } = useAuth();

const token = localStorage.getItem('userToken');

  
  // const logout=()=>{
  //   localStorage.removeItem('userToken')
 
  //  setIsLoggedIn(false);
  //   alert("Logged out successfully")
  //  }

  //  useEffect(() => {
  //   const checkToken = () => {
  //     const token = localStorage.getItem('userToken');
  //     setIsLoggedIn(!!token);
  //   };

  //   checkToken(); // Initial check

  //   // Listen for storage changes
  //   window.addEventListener('storage', checkToken);

  //   // Cleanup the event listener
  //   return () => {
  //     window.removeEventListener('storage', checkToken);
  //   };
  // }, []); 
   
  console.log("token",token)

  return (
    <div >
        
        <Navbar bg="light" data-bs-theme="light" className=' fixed-top' >
      <Container>
 <Link to={'/'}  ><Navbar.Brand href="#" className=' font-sans text-2xl text-orange-500 font-bold pl-10'>Cleartrip</Navbar.Brand></Link>     
        <Navbar.Collapse className="justify-content-end">



{isLoggedIn ? (
            <Button variant="primary" onClick={logout} className=' bg-blue-600'>
              Logout
            </Button>
          ) : (
            <Link to="/signin">
              <Button variant="primary" className=' bg-blue-600'>Login</Button>
            </Link>
          )}
   
        </Navbar.Collapse>
      </Container>
    </Navbar>
   
   
    
    </div>
  )
}

export default Header
