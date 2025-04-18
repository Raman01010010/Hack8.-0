import { User } from "../context/User"
import { useContext } from "react"


import React from "react"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, LinearProgress } from "@mui/material";
import { addClient, addUser } from "../api/api"
export default function Signup() {
  const [col, setCol] = React.useState('gray')
  const { newUser, setNewUser } = useContext(User)
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate();


  React.useEffect(() => {
    const delay = 500; // Adjust the delay as needed
    const timerId = setTimeout(() => {
      // Make the API call when the user stops typing
      const check = async () => {
        const t = await addUser(newUser

        )
        if (t.status == 200) {
          setCol('red')
        }
        if ((!t.data?.email)) {
          setCol('gray')
        }
        console.log(t.data)
      }
      check();
      console.log("ramanc")

    }, delay);

    return () => {
      // Cleanup the timer when the component unmounts or when searchQuery changes
      clearTimeout(timerId);
    };
  }, [newUser]);





  async function handleSubmit() {
    setLoading(true)
    const res = await addClient(newUser)
    console.log(res.response)
    setLoading(false)
    if (res.status == 201 || res.status == 202) {
      console.log("success")
      toast("Sending OTP to your email!");
      setTimeout(() => {
        navigate('/otp')
      }, 2000);

    } else {
      console.log(res.data)

      toast(res.response.data)
    }
  }
  async function handleChange(event) {
    setNewUser(old => {
      return ({
        ...old,
        [event.target.name]: event.target.value
      })
    })
    console.log(newUser)
    //   console.log(await addUser({
    //     "email":newUser.email
    // }
    // ))
    //   const t=await addUser({
    //     "email":newUser.email
    // }
    // )


  }
  return (<>
    <section className="text-gray-400 bg-[#D10363] body-font">
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
            Sign Up
          </h2>
          <div className="relative mb-4">
            <label htmlFor="full-name" className="leading-7 text-sm text-gray-400">
              Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="name"
              name="name"
              className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="full-name" className="leading-7 text-sm text-gray-400">
              Username
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="username"
              name="username"
              className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-400">
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              value={newUser.email}
              className={`w-full bg-${col}-600 bg-opacity-20  focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-400">
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              id="pwd"
              name="pwd"
              className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          {loading ?
            <button className="rounded">
              <Box sx={{ width: '100%', height: '100%' }}>
                <LinearProgress color="secondary" sx={{ height: '5vh' }} />
              </Box>
            </button> :
            <button onClick={handleSubmit} className="text-white bg-[#808836] border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
              Button
            </button>}


          <ToastContainer />
          <p className="text-l mt-3">
            Please wait while we let you in!!
          </p>
        </div>
      </div>
    </section>
  </>)
}