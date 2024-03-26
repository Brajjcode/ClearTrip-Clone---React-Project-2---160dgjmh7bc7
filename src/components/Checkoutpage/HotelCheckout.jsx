import React from 'react'
import Box from '../Box/Box'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import Image from 'react-bootstrap/Image';
import { IoIosStar } from "react-icons/io";
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useDates } from '../../Provider';
import { Link } from 'react-router-dom';



const HotelCheckout = () => {

const {id}= useParams();
const[Hoteldata,SethotelData]=useState([]);
const tax= 508;
const [total,setTotal]= useState(0)
const otherCharges=100;
const JwtToken= localStorage.getItem('userToken')
const [formCompleted, setFormCompleted] = useState(false);
const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
  //  const [formCompleted, setFormCompleted] = useState(false);
  const { checkInDate, checkOutDate } = useDates();



useEffect(()=>{

  async function getHoteldata(){

    const FetchData= await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/hotel/${id}`,{


       headers:{
                Authrization:`Bearer ${JwtToken}`,
                'projectID':'f104bi07c490'
       }
    })

    const jsonData= await FetchData.json();
    SethotelData(jsonData.data);


  }
       
  getHoteldata();

},[id,JwtToken])



useEffect(()=>{
            
  setTotal(Math.floor(Hoteldata.avgCostPerNight)+tax+otherCharges)

},[Hoteldata.avgCostPerNight])
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
  alert("ticket booked")
}

setValidated(true);
setShowAlert(false);
  setValidated(true);
};


console.log("checkindate",(checkInDate))
console.log("checkindate",(checkOutDate))


console.log(Hoteldata);

  return (
    <>
        
    <Box>
    <Container className=' pt-28 ml-8'>
    <h1 className=' font-semibold font-serif'> Review your itinerary</h1>

        <div className=' flex flex-row justify-around '>
        
      
        <div className=' flex flex-row mt-6'>
          <div className=' w-6/12] h-72 border-box'  style={{ boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'}}>
                  
          <div className='  flex flex-row gap-14 h-12'>
         <span className=' font-bold text-lg  '>{Hoteldata.name}-{Hoteldata.location}</span>   

         <img src={Hoteldata.images} className=' h-40 w-44 object-cover' />
          </div>
          <div className=' flex flex-row pb-40 items-center gap-1'>
            <span className=' font-serif'>Rating:</span>
          {Array.from({ length: Hoteldata.rating }, (_, index) => (
                        <IoIosStar key={index} className='text-green-500' />
                    ))}

          </div>
            <div className=' flex flex-row gap-4'>
          <p className=' font-serif '>Check-in Date: {checkInDate}</p>
      <p className=' font-serif '>Check-out Date: {checkOutDate}</p>
      </div>
          </div>

        </div>
      
        <div className=' w-60 h-72 border-box ' style={{ boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'}}>
            <div className=' flex flex-row justify-around'>
            <span className=' font-semibold' > Base Price:</span> <span className=' pr-2'>₹{Math.floor(Hoteldata.avgCostPerNight)}</span>
            
               
          
            </div>
            <div className=' flex flex-row justify-around'>
            <span className=' font-semibold' > Tax:</span> <span>₹{tax}</span>
            

          
            </div>
            <div className=' flex flex-row justify-around'>
            <span className=' font-semibold' > Other charges:</span> <span className=' pr-6'>₹{otherCharges}</span>
            

          
            </div>



             <div className=' pt-44 flex flex-row  justify-evenly '>
           <span className=' font-semibold'>Total:</span>   <span className=' font-normal pr-5'> ₹{total}</span>

       <Link to={"/Finalpayment"}> <Button variant="danger " className=' bg-orange-700 mb-7' onClick={handleSubmit} disabled={!formCompleted}>Book</Button></Link> 
             </div>
          </div>
         
            
           
        </div>

      
        <div className=' mt-9 w-7/12'>
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
      {/* {showAlert && <div className="alert alert-danger mt-3" role="alert">Please fill in all the details.</div>} */}
    </Accordion>
    </div>
      

    </Container>
    </Box>
    </>
  )
}

export default HotelCheckout;
