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
import { Authprovider } from "./AuthContext";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import PreviosBookings from "./PreviosBookings/PreviousBookings"
//import ProtectedRoute from "./Protectedroute/ProtectedRoute";
//import ProtectedRoute from "./Protectedroute/ProtectedRoute";
export default function App() {
  const PrivateRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();
  
    if (!isLoggedIn) {
      return <Navigate to="/signin" replace />;
    }
  
    return children;
  };

  const LoginRoute=({children})=>{
    const {isLoggedIn}= useAuth();
    if(isLoggedIn){
      return <Navigate to="/" replace/>
    }

    return children;
  };
  return (
    <>
    <Authprovider>
    <DatesProvider>
    <BrowserRouter>
    <Header/>
         
    {/* <Routes>
      <Route path="/" element={<><SideHeader/><Home/> </>}/>
   
      <Route path="/flightresult/:whereto/:wherefrom/:departureday" element={<FlightResult/>}/>
      <Route path="/BookHotels" element={<><SideHeader/><Hotelbookings/></>}/>
      
      <Route path="/signin" element={<Signin/>}/>
    <Route path="/signup" element={<Signup/>}/>
   <Route path="/Bookhotels/:location" element={<HotelResults/>} />
   <Route path="/HotelSinglepage/:id" element={<HotelSinglepage/>}/> 
   <Route path="/HotelCheckoutPage/:id/:roomID" element={<HotelCheckout/>}/>
   <Route path="/FlightCheckoutPage/:id"  element={<FlightCheckout/>}/>
   <Route path="/Finalpayment" element={<Finalpayment/>}/>
    </Routes> */}
      <Routes>
      <Route
            path="/"
            element={
              <>
                <SideHeader />
                <Home />
              </>
            }
          />
          <Route
            path="/flightresult/:whereto/:wherefrom/:departureday"
            element={<PrivateRoute><FlightResult /></PrivateRoute>}
          />
          <Route
            path="/BookHotels"
            element={
              <>
                <SideHeader />
                <Hotelbookings />
              </>
            }
          />

          <Route path="/signin" element={<LoginRoute><Signin /></LoginRoute>} />
          <Route path="/signup" element={<LoginRoute><Signup /></LoginRoute>} />
          <Route path="/PreviousBookings" element={<><PrivateRoute>
            <SideHeader/>
            <PreviosBookings/>
            </PrivateRoute></>}/>
          <Route path="/Bookhotels/:location" element={<PrivateRoute><HotelResults /></PrivateRoute>} />
          <Route path="/HotelSinglepage/:id" element={<PrivateRoute><HotelSinglepage /></PrivateRoute>} />
          <Route path="/HotelCheckoutPage/:id/:roomID" element={<PrivateRoute><HotelCheckout /></PrivateRoute>} />
          <Route path="/FlightCheckoutPage/:id" element={<PrivateRoute><FlightCheckout /></PrivateRoute>} />
          <Route path="/Finalpayment" element={<PrivateRoute><Finalpayment /></PrivateRoute>} />
        </Routes>
  
    </BrowserRouter>
    </DatesProvider>
    </Authprovider>
    </>
  )
}
