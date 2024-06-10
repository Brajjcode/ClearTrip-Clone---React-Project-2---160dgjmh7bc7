import React from 'react'
import Box from '../Box/Box'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { BsArrowRight } from "react-icons/bs";
import { BsRecordFill } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import airIndia from "./../Assets/AI.svg"
import indigo from "./../Assets/UK.svg"
import Vistara from "./../Assets/UK.svg"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
//import InputGroup from 'react-bootstrap/InputGroup';
import { Navigate } from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import { useDates } from '../../Provider';

const FlightCheckout = () => {

    const {id}= useParams();

    const[Flightdata,setData]=useState([]);
    const [airport,setAirport]= useState('')
    const [flightImage,setFlightImage]= useState('')
    const JwtToken= localStorage.getItem('userToken')
    const tax= 508;
    const otherCharges=100;
    const [total,setTotal]= useState(0)
    const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [formCompleted, setFormCompleted] = useState(false);
    const { checkInDate, checkOutDate } = useDates();
   // const [landingDate, setLandingDate] = useState(null); 
   const {landingDate} = useDates();
    
     const[loader,setloader]= useState(true)
     const navigate= useNavigate();
  //  const airport=["Kempegowda International Airport, Bangalore, Terminal 2","Chatrapati Shivaji Airport, Mumbai, Terminal 2","Indira Gandhi International Airport","Netaji Subhas Chandra Bose International Airport","Madras International Meenambakkam Airport"];
//    const flightImages=[airIndia,indigo,Vistara]
const airportMap = {
  'BLR': 'Kempegowda International Airport, Bangalore',
  'BOM': 'Chatrapati Shivaji Airport, Mumbai',
  'DEL': 'Indira Gandhi International Airport',
  'CCU': 'Netaji Subhas Chandra Bose International Airport',
  'MAA': 'Madras International Meenambakkam Airport'
};


    useEffect(()=>{

        async function  getFlightdata(){

         // setloader(true)

            const Fetchdata= await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/flight/${id}`,{

            headers:{
                Authorization: `Bearer ${JwtToken}`,
                'projectID':'f104bi07c490'
              }
            })

            const jsonData= await Fetchdata.json();
            setData(jsonData.data);
            setloader(false)
            

        }

        getFlightdata();
        
       
      
      
        console.log("Flightdata",Flightdata.ticketPrice)
        
            
   // setTotal(Flightdata.ticketPrice +tax + otherCharges);
    },[id,JwtToken])


    useEffect(()=>{
            
      setTotal(Flightdata.ticketPrice+tax+otherCharges)

    },[Flightdata.ticketPrice])

    const handleFormChange = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity()) {
        setFormCompleted(true);
      } else {
        setFormCompleted(false);
      }
    };
    
    
    

      const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          setShowAlert(true);
        }
        else {
          // Form is valid, navigate to the checkout page
          //history.push("/checkout"); // Assuming you have defined 'history' using useHistory()
        //  Navigate('/')
        navigate('/Finalpayment')
       
      }

    setValidated(true);
    setShowAlert(false);
        setValidated(true);

      };

    

    
    const getSourceName = (code) => {
      return airportMap[code] || code;
    };

    const getDestinationName = (code) => {
      return airportMap[code] || code;
    };
  

   console.log("landingdate",landingDate);



  return (

    <>
  {loader?(<div className=' flex items-center justify-center pt-44'><Spinner ></Spinner></div>):
   ( <Box>
    <Container className=' pt-28 ml-8'>

        <div className=' ml-28'>
        <h1 className=' font-semibold font-serif'> Review your itinerary</h1>

        <div className=' flex flex-row mt-6 justify-around'>
         <div className='w-36 h-64 ' >
            <span className=' font-normal text-xl flex flex-row gap-2 items-center'> {Flightdata.source} <BsArrowRight /> {Flightdata.destination}
 </span> 

         <div className=' pt-7 ml-4 ' >
          <span className=' flex flex-row gap-2 h-8 '>
        
         <span className='  font-semibold text-lg '>
         {Flightdata.departureTime}
         </span>
         <span className=' w-9'>
         {getSourceName(Flightdata?.source)}

         </span>
         </span>
         <div>
         <BsThreeDotsVertical />
         <BsThreeDotsVertical />
         <BsThreeDotsVertical />
         <BsThreeDotsVertical />
         <BsThreeDotsVertical />
         <BsThreeDotsVertical />
         <BsThreeDotsVertical />
         <BsThreeDotsVertical />
         <BsThreeDotsVertical />
         <BsThreeDotsVertical />
         <BsThreeDotsVertical />
         </div>

         <span className=' flex flex-row gap-2 ' >
         <BsRecordFill />
         <span className=' font-semibold text-lg'>
          {Flightdata.arrivalTime}
         </span>
        <span>
        {getDestinationName(Flightdata?.destination)}
         </span>
         </span>
       </div>

         </div>
          
          <div className=' w-60 h-72 border-box' style={{ boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'}}>
            <div className=' flex flex-row justify-around'>
            <span className=' font-semibold' > Base Price:</span> <span className=' pr-2'>₹{Flightdata.ticketPrice}</span>
            
               
          
            </div>
            <div className=' flex flex-row justify-around'>
            <span className=' font-semibold' > Tax:</span> <span>₹{tax}</span>
            

          
            </div>
            <div className=' flex flex-row justify-around'>
            <span className=' font-semibold' > Other charges:</span> <span className=' pr-6'>₹{otherCharges}</span>
            

          
            </div>



             <div className=' pt-44 flex flex-row  justify-evenly '>
           <span className=' font-semibold'>Total:</span>   <span className=' font-normal pr-5'> ₹{total}</span>
     <Button variant="danger " className=' bg-orange-700 mb-7' onClick={handleSubmit} disabled={!formCompleted}>Book</Button>
             </div>
          </div>

        
        </div>
    
        </div>


        
      <div className=' pt-20 w-7/12'>
        <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Enter user details</Accordion.Header>
        <Accordion.Body>
        <Form noValidate validated={validated} >
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
         //   defaultValue="Mark"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
          //  defaultValue="Otto"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" placeholder="State" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" placeholder="Zip" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>

    </Form>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="1">
        <Accordion.Header>Payment Details</Accordion.Header>
        <Accordion.Body>
        <Form noValidate validated={validated}  onChange={handleFormChange}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Cardnumber</Form.Label>
          <Form.Control
            required
            type="Card number"
            placeholder="9780743112"
            //defaultValue="Mark"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Name"
           // defaultValue="Otto"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        
      </Row>
      <Row className="mb-3">
        
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>MM/YY</Form.Label>
          <Form.Control type="month" placeholder="MM/YY" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Month
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>CVV</Form.Label>
          <Form.Control type="text" placeholder="Zip" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      {/* <Button type="submit"  className=' bg-blue-700' disabled={!formCompleted}>Submit</Button> */}
    </Form>
      
        </Accordion.Body>
      </Accordion.Item>
      {showAlert && <div className="alert alert-danger mt-3" role="alert">Please fill in all the details.</div>}
    </Accordion>
    </div>


    </Container>
    </Box>
)}
    </>
  
  )
}

export default FlightCheckout
