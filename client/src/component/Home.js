import { useContext } from "react"
import { User } from "../context/User"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
export default function Home(){
    const axiosPrivate=useAxiosPrivate()
    const {newUser}=useContext(User)
    console.log(newUser)
    return<>
    <section className="text-gray-400 bg-gray-900 body-font">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
        Welcome to 
        <br className="hidden lg:inline-block" />
WEBSTER
      </h1>
      <p className="mb-8 leading-relaxed">
       
      </p>
      <div className="flex justify-center">
        <button className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">
          SIGNIN
        </button>
        <button className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">
          SIGNUP
        </button>
      </div>
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <img
        className="object-cover object-center rounded"
        alt="hero"
        src="https://dummyimage.com/720x600"
      />
    </div>
  </div>
</section>

    Home</>
}