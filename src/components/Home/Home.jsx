  import React, { useState } from 'react'
  import { Container } from 'react-bootstrap'
  import Row from 'react-bootstrap/Row';
  import Col from 'react-bootstrap/Col';
  import Box from '../Box/Box';
  import NavDropdown from 'react-bootstrap/NavDropdown';
  import { IoAddCircleOutline } from "react-icons/io5";
  import { IoRemoveCircleOutline } from "react-icons/io5";
  import Button from 'react-bootstrap/Button';
  import { useNavigate } from 'react-router-dom';
  import { Link } from 'react-router-dom';
  const Home = () => {

     const [wherefrom, setWherefrom]= useState("");
     const [whereTo, setwhereto]= useState("");
     const[ departureDate, setDeparturedate]=useState('Mon');
     const[travelers, setTravlers]= useState('');
     const [travelClass, setTravelclass]= useState('');
     //const navigate = useNavigate();

     
     
     
                
    return (
      <div className=' container-xl my-5'>
      <div className=' border-spacing-4 pt-8 pb-10 relative px-10 ml-14'>

      <NavDropdown
                id="nav-dropdown-dark-example"
                title="Dropdown"
                menuVariant="light"
                
              >
                <NavDropdown.Item href="#action/3.1" className=' flex flex-row justify-around gap-3'>Adult
                <div className=' flex gap-2'>
                  <button><IoAddCircleOutline/></button>
                  <span>1</span>
                  <button><IoRemoveCircleOutline /></button>
                </div>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2" className=' flex flex-row justify-around gap-3'>
                  Child
                  <div className=' flex gap-2'>
                  <button><IoAddCircleOutline/></button>
                  <span>1</span>
                  <button><IoRemoveCircleOutline /></button>
                </div>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3" className='  flex flex-row justify-around gap-3'>Infant
                <div className=' flex gap-2'>
                  <button><IoAddCircleOutline/></button>
                  <span>1</span>
                  <button><IoRemoveCircleOutline /></button>
                </div>
                </NavDropdown.Item>
          
             
              </NavDropdown>

  <div className=' flex flex-row mt-6'>
  <input list="departureFlight" className='border-2 px-2 py-1 rounded-md' style={{ width: '200px', marginRight: '10px' }}
      placeholder='where from?' onChange={(e)=>setWherefrom(e.target.value)}
      value={wherefrom}
  />
  <datalist id='departureFlight' className=' w-6 bg-white text-black'>
      <option>BLR</option>
      <option>BOM</option>
      <option>CCU</option>
      <option>DEL</option>
      <option>MAA</option>

  </datalist>

  <input list="destinationflight" className='border-2 px-2 py-1 rounded-md' style={{ width: '200px', marginRight: '10px' }}
  placeholder='where to?' onChange={(e)=>setwhereto(e.target.value)}
  value={whereTo}

  />
  <datalist id='destinationflight' className=' w-6 bg-white text-black'>
      <option>BLR</option>
      <option>BOM</option>
      <option>CCU</option>
      <option>DEL</option>
      <option>HYD</option>

  </datalist>
  </div>
    
    <div className='flex flex-row mt-5 gap-3'>
    <label htmlFor="departureDay">Departure Day:</label>
          <select
            className="form-control w-15 max-w-xs"
            id="departureDay"
            value={departureDate}
            onChange={(e) => setDeparturedate(e.target.value)}
          >
            <option value="Mon">Monday</option>
            <option value="Tue">Tuesday</option>
            <option value="Wed">Wednesday</option>
            <option value="Thu">Thursday</option>
            <option value="Fri">Friday</option>
            <option value="Sat">Saturday</option>
            <option value="Sun">Sunday</option>
            {/* Add other days as needed */}
          </select>

    <Link to={`flightresult/${whereTo}/${wherefrom}/${departureDate}`} ><Button variant="danger" className=' bg-orange-500' >Search Flight</Button></Link>
    </div>
      


      </div>
      </div>
    )
  }

  export default Home
