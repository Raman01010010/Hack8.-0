import { User } from "../context/User"
import { useContext } from "react"
import React from "react"
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { addClient, addUser, getEmp, verifyUser } from "../api/api"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, CircularProgress, LinearProgress } from "@mui/material";

export default function Signin() {
  const [col, setCol] = React.useState('gray')
  const { newUser, setNewUser } = useContext(User)
  const [login, setLogin] = React.useState({ "email": "", "pwd": "" })
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [loading,setLoading]=React.useState(false)


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


  var at;
  const axiosPrivate = useAxiosPrivate()
  async function hand() {
    const res = await axiosPrivate.get(`/employees`
    )
    console.log(res)
    at = res?.data?.accessToken;
    console.log(at)
    



  }
 
  async function handleSubmit() {
    setLoading(true)
    const res = await verifyUser(login)
    console.log(res)
   
    if (res.status == 200 || res.status == 201 || res.status == 202) {
      await toast("Login Successful! Redirecting to Dashboard!");
      setTimeout(() => {

        console.log(res)
        const accessToken = res?.data?.accessToken;
        const roles = res?.data?.roles;
        setNewUser({ "email": login.email,"userid":login.userid, "pwd": login.pwd, roles, accessToken: res?.data?.accessToken, picture: res?.data?.picture, username: res?.data?.username, email: res?.data?.email });

        navigate('/choose')
        setLoading(false)
      }, 3000)
    } else {
      toast("Unauthorised Access! Please check your credentials!");
      setLoading(false)
    }

  }

  async function handleChange(event) {
    setLogin(old => {
      return ({
        ...old,
        [event.target.name]: event.target.value
      })
    })
    console.log(login)
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
<div className="min-h-screen bg-purple-600">
      <section className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-3xl text-white">
              Create Account Now
            </h1>
            <p className="leading-relaxed mt-4">
              Join Us Today
            </p>
          </div>
          <div className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0" style={{ height: '60vh' }}>
            <h2 className="text-white text-lg font-medium title-font mb-5">
              Sign In
            </h2>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-400">
                Email
              </label>
              <input
                onChange={handleChange}
                type="email"
                id="email"
                name="email"
                value={login.email}
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
            {loading ? (
              <button className="rounded">
                <Box sx={{ width: '100%', height: '20px' }}>
                  <LinearProgress color="secondary" sx={{ height: '5vh' }} />
                </Box>
              </button>
            ) : (
              <button onClick={handleSubmit} className="text-white bg-[#808836] border-0  focus:outline-none hover:bg-green-600 rounded text-lg">
                Sign In
              </button>
            )}
            <ToastContainer />
            <p className="text-m mt-3">
              Please Wait! while we get you in. Thanks for having patience!
            </p>
          </div>
        </div>
      </section>
    </div>
  </>)
}