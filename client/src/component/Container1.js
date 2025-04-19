import Home from "./Home2";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from "./Signin";
import Signup from "./Signup";
import AboutUs from "./AboutUs";
import Otp from "./Otp";
import Persist from "./Persist";
import Welcome from "./Welcome";
import InvestorSignUp from "./InvestorSignUp";
import InvestorLogin from "./InvestorLogin";
import ChatBot from "./ChatBot";
import A1 from "./A1";

export default function Container1(){
    return(<>
    <Persist/>
       <A1> </A1>
          <Routes>

          <Route path="/welcome" element={<><Welcome/></>} />
          <Route path="/investorSignup" element={<><InvestorSignUp/></>} />
          <Route path="/investor-login" element={<><InvestorLogin/></>} />
           

          <Route path="/" element={<><Welcome/></>} />
          <Route path="/signin" element={<><Signin/></>} />
          <Route path="/signup" element={<><Signup/></>} />
          <Route path="/otp" element={<><Otp/></>} />
          <Route path="/home2" element={<><Home/></>} />
          <Route path="/about" element={<><AboutUs/></>} />
          <Route path="/chat" element={<><ChatBot/></>} />
         
    </Routes>

    </>)
}