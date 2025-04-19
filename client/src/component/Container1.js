import Home from "./Home2";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from "./Signin";
import Signup from "./Signup";
import AboutUs from "./AboutUs";
import Otp from "./Otp";
import Persist from "./Persist";
import ChatBot from "./ChatBot";
import StartupNetWorthCalculator from "./Calculate_worth";
import FundingRiskCalculator from "./Calculate_risk";

export default function Container1(){
    return(<>
    <Persist/>
          <Routes>
            
          <Route path="/" element={<><Home/></>} />
          <Route path="/signin" element={<><Signin/></>} />
          <Route path="/signup" element={<><Signup/></>} />
          <Route path="/otp" element={<><Otp/></>} />
          <Route path="/home2" element={<><Home/></>} />
          <Route path="/about" element={<><AboutUs/></>} />
          <Route path="/chat" element={<><ChatBot/></>} />
          <Route path="/calculate_worth" element={<><StartupNetWorthCalculator /></>} />
          <Route path="/calculate_risk" element={<><FundingRiskCalculator /></>} />
         
    </Routes>

    </>)
}