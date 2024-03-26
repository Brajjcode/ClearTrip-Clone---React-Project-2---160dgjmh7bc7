import "../styles/App.css";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Header from "./Header/Header";
import Home from "./Home/Home";
import SideHeader from "./Header/SideHeader";
import FlightResult from "./Result/FlightResult";
import Hotelbookings from "./Hotels/Hotelbookings";
import Signin from "./Signin.Signup/Signin";
import Signup from "./Signin.Signup/Signup";
import HotelResults from "./Result/HotelResults";
import HotelSinglepage from "./Result/HotelSinglepage";
import HotelCheckout from "./Checkoutpage/HotelCheckout";
import FlightCheckout from "./Checkoutpage/FlightCheckout";
import DatesProvider from "../Provider";
import Finalpayment from "./Finalpayment/Finalpayment";
export default function App() {
  return (
    <>
    <DatesProvider>
    <BrowserRouter>
    <Header/>
    
    
     
       
    <Routes>
      <Route path="/" element={<><SideHeader/><Home/> </>}/>
   
      <Route path="/flightresult/:whereto/:wherefrom/:departureday" element={<FlightResult/>}/>
      <Route path="/BookHotels" element={<><SideHeader/><Hotelbookings/></>}/>
      
      <Route path="/signin" element={<Signin/>}/>
    <Route path="/signup" element={<Signup/>}/>
   <Route path="/Bookhotels/:location" element={<HotelResults/>} />
   <Route path="/HotelSinglepage/:id" element={<HotelSinglepage/>}/> 
   <Route path="/HotelCheckoutPage/:id" element={<HotelCheckout/>}/>
   <Route path="/FlightCheckoutPage/:id"  element={<FlightCheckout/>}/>
   <Route path="/Finalpayment" element={<Finalpayment/>}/>
    </Routes>
  
    </BrowserRouter>
    </DatesProvider>
    </>
  )
}
