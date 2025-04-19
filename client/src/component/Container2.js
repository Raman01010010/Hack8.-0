import Home from "./Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from "./Signin";
import ChatBot from "./ChatBot";
import Dashboard from "./Dashboard";
import Img_to_txt from "./Img_to_txt";
import Investor from "./Investor";
import UploadDocument from "./UploadDocument";
import Img from "./Img";
import My from "./My";
import ChooseUser from "./ChooseUser";
import ShowBids from "./ShowBids";

export default function Container1() {
    return (<>
        {/* <Dashboard/> */}
        <Routes>
            <Route path="/t" element={<><Home /></>} />
             
            <Route path="/choose" element={<><ChooseUser/></>} /> 
            <Route path="/my-bids" element={<><ShowBids/></>} /> 
            <Route path="/dashboard" element={<><Dashboard /></>} />


            <Route path="/upload_documents" element={<><UploadDocument/></>} />
            <Route path ="/img" element={<><Img_to_txt/></>}></Route>
            <Route path ="/investor" element={<><Investor/></>}></Route>
            <Route path ="/details" element={<><Investor/></>}></Route>           
             <Route path="/chat" element={<><ChatBot/></>} />
            <Route path ="/img1/:startupid" element={<><Img/></>}></Route>
            <Route path ="/my" element={<><My/></>}></Route>           
             <Route path="/chat" element={<><ChatBot/></>} />
                     <Route path="/chat" element={<><ChatBot/></>} />
        </Routes>
    </>)
}