import Home from "./Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from "./Signin";

import Dashboard from "./Dashboard";
import Img_to_txt from "./Img_to_txt";
import Investor from "./Investor";
import UploadDocument from "./UploadDocument";

export default function Container1() {
    return (<>
        {/* <Dashboard/> */}
        <Routes>
          
            <Route path="/t" element={<><Home /></>} />
          
            <Route path="/dashboard" element={<><Dashboard /></>} />
            <Route path="/upload_documents" element={<><UploadDocument/></>} />
            <Route path ="/img" element={<><Img_to_txt/></>}></Route>
            <Route path ="/investor" element={<><Investor/></>}></Route>
            <Route path ="/details" element={<><Investor/></>}></Route>
        </Routes>
    </>)
}