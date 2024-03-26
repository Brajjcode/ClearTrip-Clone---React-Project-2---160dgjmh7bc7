import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../Assets/1662522326.Cleartrip-New-Logo.jpg'
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';

import Box from "../Box/Box"
import { Link } from 'react-router-dom';



const Header = () => {

 // const [logintext,setLogintext]= useState("Logout")
  //const [shouldLogout, setShouldLogout] = useState(false);
 // const navigate= useNavigate()
// const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userToken'));
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [logintext,setLogintext]= useState("Login");
//const [token, setToken]= useState(null)
//const token=localStorage.getItem('userToken');

  
  const logout=()=>{
    localStorage.removeItem('userToken')
  //  setLogintext("Login");
  //setToken(null)
   setIsLoggedIn(false);
    alert("Logged out successfully")
   }



   useEffect(()=>{
    //setToken(localStorage.getItem('userToken'))
    const token = localStorage.getItem('userToken');
    // if(token){
    //   setIsLoggedIn(true)
    //   setLogintext("Login")
    // }
    // else{
    //   setIsLoggedIn(false)
    //  // setLogintext("Logout")
    // }
     
    setIsLoggedIn(token?true:false)
  //  setIsLoggedIn(!!token);

   },[isLoggedIn])
    
  
   

  return (
    <div >
        
        <Navbar bg="light" data-bs-theme="light" className=' fixed-top' >
      <Container>
 <Link to={'/'}  ><Navbar.Brand href="#" className=' font-sans text-2xl text-orange-500 font-bold pl-10'>Cleartrip</Navbar.Brand></Link>     
        <Navbar.Collapse className="justify-content-end">

    {/* <Button variant="primary" className=' bg-blue-600' onClick={()=>shouldLogout? logout():undefined}>{!shouldLogout?(
      <Link to="/signin">Login</Link>
    ):(logintext)}</Button>{' '} */}


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
