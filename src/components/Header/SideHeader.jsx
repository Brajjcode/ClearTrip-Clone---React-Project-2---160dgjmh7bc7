import React from 'react'
import { Nav} from 'react-bootstrap'
import Button from 'react-bootstrap/Button';


// const SideHeader = () => {
//  // max-w-xs max-h-max
//   return (
//     <>
//     {/* <div className=' mt-14  '>

//          <Nav defaultActiveKey="/home" className="flex-col position-fixed h-full w-64  hidden sm:flex lg:flex  ">

//       <Nav.Link  href="/"> <Button variant="light" className=' w-40 text-xl text-black font-semibold flex items-center justify-center rounded-lg p-2 text-base font-normal dark:text-white dark:hover:bg-gray-700 hover:bg-orange-500 bg-orange-400 text-white '>Flights</Button></Nav.Link>
//       <Nav.Link href='/BookHotels'><Button variant="light" className=' w-40 text-xl text-black font-semibold flex items-center justify-center rounded-lg p-2 text-base font-normal dark:text-white dark:hover:bg-gray-700 hover:bg-orange-500 bg-orange-400 text-white'> Hotels</Button></Nav.Link>

      
//     </Nav>
  
      
//     </div>
//    */}
   


//     </>

//   )
// }

const SideHeader = () => {
 

  return (
    <div className='mt-14'>
      <Nav defaultActiveKey="/home" className=' h-full w-64 flex-col max-sm:flex-row w-full h-10 absolute md:fixed ' style={{ left: '0' }}>
        <Nav.Link href="/">
          <Button variant="light" className='w-40 text-xl text-black font-semibold flex items-center justify-center rounded-lg p-2 text-base font-normal dark:text-white dark:hover:bg-gray-700 hover:bg-orange-500 bg-orange-400 text-white'>Flights</Button>
        </Nav.Link>
        <Nav.Link href='/BookHotels'>
          <Button variant="light" className='w-40 text-xl text-black font-semibold flex items-center justify-center rounded-lg p-2 text-base font-normal dark:text-white dark:hover:bg-gray-700 hover:bg-orange-500 bg-orange-400 text-white'>Hotels</Button>
        </Nav.Link>
        
      </Nav>
    </div>
  )
}




export default SideHeader
