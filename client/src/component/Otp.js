import { User } from "../context/User"
import { useContext } from "react"
import React from "react"
import { useNavigate } from 'react-router-dom';
import { addClient, addUser, verifyOtp } from "../api/api"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, LinearProgress } from "@mui/material";
export default function Otp(){
  const [col,setCol]=React.useState('gray')
  const {newUser,setNewUser}=useContext(User)
const [otp1,setOtp]=React.useState({"otp5":"","email":newUser.email})
const [loading,setLoading]=React.useState(false)
const navigate=useNavigate()
  async function handleSubmit(){
setLoading(true)
   const res= await verifyOtp(otp1)
   console.log(res.response)
    setLoading(false)
   if(res?.status===200){
    console.log("success")
    toast("OTP Verified! Accoun Created Successfully! Please Sign In");
    setTimeout(() => {navigate('../signin')}, 2000);

}
else{
  console.log(res.data)
  toast(res.response.data)

}
  }
  async function  handleChange(event){
    console.log(newUser)
    setOtp(old=>{
      return({
        ...old,
        "email":newUser.email,
        [event.target.name]:event.target.value
      })
    })
    console.log(otp1)
  //   console.log(await addUser({
  //     "email":newUser.email
  // }
  // ))
//   const t=await addUser({
//     "email":newUser.email
// }
// )


  }
    return(<>
    <section className="text-gray-400 bg-gray-900 body-font">
  <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
    <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
      <h1 className="title-font font-medium text-3xl text-white">
       Create Account Now
      </h1>
      <p className="leading-relaxed mt-4">
        Join Us Today
      </p>
    </div>
    <div className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
      <h2 className="text-white text-lg font-medium title-font mb-5">
        Complete Verification
      </h2>
      <div className="relative mb-4">
        <label htmlFor="full-name" className="leading-7 text-sm text-gray-400">
          Enter One Time Password
        </label>
        <input
        onChange={handleChange}
          type="text"
          id="otp"
          name="otp5"
          className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
   
{loading?
      <button className="rounded">
            <Box sx={{ width: '100%', height: '100%' }}>
              <LinearProgress color="secondary" sx={{ height: '5vh' }} />
            </Box>
          </button>:
      <button onClick={handleSubmit}className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
        Verify
      </button>}
      <ToastContainer />
      <p className="text-l text-white mt-3">
      Please check your email for the OTP!
      Check spam folder if not found in inbox.
      </p>
    </div>
  </div>
</section>
</>)
}