import React from 'react'
import { useState,useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { HiStar } from "react-icons/hi";
import Carousel from 'react-bootstrap/Carousel';
import { BiBadgeCheck } from "react-icons/bi";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
const HotelSinglepage = () => {
    const [data,setData]= useState([]);
    const [loading, setLoading] = useState(true);
  const {id} = useParams();
  const JwtToken= localStorage.getItem('userToken')
    useEffect(()=>{
        const fetchData=async()=>{
            setLoading(true)
       const response= await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/hotel/${id}`,{
         
              method: 'GET',

              headers:{
                Authorization: `Bearer ${JwtToken}`,
                'projectID':'f104bi07c490'
              }


       })

       const responseJson= await response.json();
       setData(responseJson.data);
       setLoading(false)

        }
        fetchData()
    },[id,JwtToken])

    console.log(data);

  return (
    < div className=' mt-5  p-5'>
<Container>
     {loading ? (
      <div>Loading...</div>
    ) : (
      <>
      <div className=' flex justify-around items-center'>
      <div className='left '>
        <h1 className=' font-bold text-black text-2xl '>
          {data.name}, {data.location}  
        </h1>
        <div className=' flex flex- gap-2'>
         <h2 className=' text-lg text-slate-700 text-bold' color='#808080' >{data.rating}/5</h2>
        <div className=' flex flex-row'>
         {Array.from({ length: data.rating }, (_, index) => (
    <HiStar key={index} className=' text-green-600' />
  ))}
  </div>
         </div>
      
       
          <div className=' Amenities m-8 h-60 w-72 shadow-md   ' >
            <h1 className=' font-bold text-xl'>Amenities</h1>
            <div className=' flex flex-wrap gap-2 '>
            {Array.isArray(data.amenities)&&data.amenities.map((amenity,index)=>(
              
              <div key={index} className=' flex font-serif w-1/3 pt-4'><span className=' text-green-500'><BiBadgeCheck/></span>{amenity}</div>
             
            ))}
            </div>
          </div>
        
      </div>

      <div className=' Right'>
      <Carousel style={{ width: '600px', height: '408px' }}>
          {Array.isArray(data.images)&& data.images.map((image,index)=>(
           
              <Carousel.Item key={index}>
                <img src={image} className=' object-cover w-full h-96 ' />
              </Carousel.Item>
           
          ))}
           </Carousel>

      </div>
     
      </div>

      <div className=' flex flex-wrap justify-center items-center gap-2'>
           {Array.isArray(data.rooms)&& data.rooms.map((room)=>(
             <Card border="light" style={{ width: '18rem' }}>
             <Card.Header className=' font-bold'>Room with {room.bedDetail}</Card.Header>
             <Card.Body >
              <div className=' flex flex-col' >
              <span className=' font-light'>Breakfast and lunch/dinner</span>
              
              <span className=' font-light'>Cancellation charges apply</span> 
              </div>
   
                   <div className=' pt-5 font-semibold'>₹{room.costDetails.baseCost}+<span className=' text-sm font-thin'>₹{room.costDetails.taxesAndFees} tax/night</span></div>
              

        <Link to={`/HotelCheckoutPage/${id}/${room._id}`} >  <Button variant="danger" className=' bg-red-500'>Book</Button></Link> 

             </Card.Body>
           </Card>
           ))}
      </div>
      </>

    )} 

  
</Container>
  </div>
  )

}

export default HotelSinglepage;
