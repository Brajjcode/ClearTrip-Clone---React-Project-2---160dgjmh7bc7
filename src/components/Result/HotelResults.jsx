import React from 'react'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaStar } from "react-icons/fa";
import Carousel from 'react-bootstrap/Carousel';
import Dropdownjsx from '../Dropdown/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

const HotelResults = () => {
    const[data,setData]= useState([]);
    const[sortoption,setoption]= useState('');
    const[price,setprice]=useState(0);
    const[ratingFilter,setRatingsFilter]= useState([]);

    const {location}= useParams();
    const JwtToken= localStorage.getItem('userToken');
    
    useEffect(()=>{
       

        const FetchData=async()=>{
          let filterParams={};
          if(ratingFilter.length>0) filterParams.rating=ratingFilter

          const queryString=`&filter=${JSON.stringify(filterParams)}`

            const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${location}"}&sort={"avgCostPerNight":${price}}${queryString}`,{

                  method: 'GET',
                  headers:{
                    Authorization: `Bearer ${JwtToken}`,
                    'projectID':'f104bi07c490'

                  }

            },)

             const responsejson= await response.json();

             setData(responsejson.data);
        }

        FetchData();
       
        console.log(data)
    },[JwtToken,price,ratingFilter])

    // console.log(location)

      
     console.log(JwtToken)
 //   console.log(ratings);

    function handlechangePrice(option){

      setprice(option);
      
    }
   // console.log(price);

    // function handlechangeRatings(option){
    //   setRatings(option)

    // }

  function handleRatingFilter(value){

    //setRatingsFilter([value]);

    setRatingsFilter((prevFilter)=>{
      if(prevFilter.includes(value)){
        return prevFilter.filter((filter)=>filter!==value);
      }

      else{
        return[...prevFilter,value]
      }
    })

  }

 
  return (
    <>

    <div className=' container'>
    <div className=' ml-3 mt-14 position-fixed'>
      <Dropdownjsx name="Sort By price" value1='1' item1="Lowest to Highest" value2='-1' item2="Highest To Lowest" onselectoption={handlechangePrice} className='top-fixed'/>
      {/* <Dropdownjsx name="Sort By Ratings" value1='1' item1="Lowest to Highest" value2='-1' item2="Highest To Lowest" onselectoption={handlechangeRatings}/> */}
      </div>  

<div className=' flex flex-row items-center justify-center gap-1 '>
          {/* Accordian start */}
          <div >
          <Nav defaultActiveKey="/home" className="flex-column w-96 h-96 mt-5   ">
         <Accordion defaultActiveKey="0" className=' position-fixed top-48 left-4 w-72 ' >
      <Accordion.Item eventKey="0">
        <Accordion.Header>Ratings</Accordion.Header>
        <Accordion.Body>
        <label>
        <Form.Check type="checkbox" checked={ratingFilter.includes("3.5")} name="3.5" label="3.5" onChange={(e) => handleRatingFilter(e.target.name)} /> 
            <Form.Check type="checkbox" checked={ratingFilter.includes("4")} name="4" label="4" onChange={(e) => handleRatingFilter(e.target.name)} /> 
            <Form.Check type="checkbox"checked={ratingFilter.includes("4.5")} name="4.5" label="4.5" onChange={(e) => handleRatingFilter(e.target.name)} /> 
            <Form.Check type="checkbox"checked={ratingFilter.includes("5")} name="5" label="5" onChange={(e) => handleRatingFilter(e.target.name)} /> 
  
          
          </label>
        </Accordion.Body>
      </Accordion.Item>
     
      </Accordion>

         </Nav>
         </div>



<div>

          {/* Accordian ends */}
          

      <h1 className=' text-lg font-serif font-medium p-5 text-center'>Results for {location} hotels </h1>


   <div className=' flex items-center justify-center flex-wrap gap-2'>
    {data && data.hotels && Array.isArray(data.hotels) && data.hotels.map((hotel)=>(
          <Card style={{
            width: 280, // Set a fixed width
            height: '100%', // Set a fixed height to make all cards the same height
            margin: 2,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }} key={hotel._id} >
                <Carousel>
                <Carousel.Item>
                <Card.Img style={{
          objectFit: 'cover',
          width: 300, // Make sure the image takes 100% width within the card
          height: 200 , // Set a fixed height for the image within the card
          margin: 'auto',
          display: 'block',
        }} variant="top" src={hotel.images[0]} className=' ' />
                </Carousel.Item>
                <Carousel.Item>
                <Card.Img style={{
          objectFit: 'cover',
          width: 300, // Make sure the image takes 100% width within the card
          height: 200 , // Set a fixed height for the image within the card
          margin: 'auto',
          display: 'block',
        }} variant="top" src={hotel.images[1]} className=' ' />
                </Carousel.Item>
                <Carousel.Item>
                <Card.Img style={{
          objectFit: 'cover',
          width: 300, // Make sure the image takes 100% width within the card
          height: 200 , // Set a fixed height for the image within the card
          margin: 'auto',
          display: 'block',
        }} variant="top" src={hotel.images[2]} className=' ' />
                </Carousel.Item>
               
                </Carousel>

       
     <Link to={`/HotelSinglepage/${hotel._id}`}  >  <Card.Body>
            <div className=' flex justify-around'>
            <Card.Title className=' text-sm font-semibold'>{hotel.name} <br/> <span>{hotel.location}</span> </Card.Title>
            <div className=' text-sm font-semibold flex flex-row text-center'><FaStar/>{hotel.rating}/5</div>
            </div>
            <Card.Text>
               
            </Card.Text>
   
            <div className=' text-sm font-black'>₹{hotel.avgCostPerNight.toFixed(2)}</div>
            {/* <Button variant="primary" className=' bg-orange-700'> </Button> */}
          </Card.Body></Link> 
        </Card>
    ))

    }
   </div>
        
   </div>
   </div>
    </div>
    </>
  )
}

export default HotelResults
