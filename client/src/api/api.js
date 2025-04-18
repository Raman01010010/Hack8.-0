import axios, { axiosPrivate } from "./axios"
export const addUser=async (data)=>{
    try{
        return (await axios.post(`/check`,data))

    }catch(error){
        console.log("Error add",error.response)
        return error
    }
}
export const addClient=async (data)=>{
    try{
        return await axios.post(`/user/register`,data)

    }catch(error){
        console.log("Error add",error.response)
        return error
    }
}

export const verifyOtp=async (data)=>{
    try{
        return await axios.post(`/user/otp`,data)

    }catch(error){
        console.log("Error add",error.response)
        return error
    }
}
export const verifyUser=async (data)=>{
    try{
        return await axios.post(`/auth`,data)

    }catch(error){
        console.log("Error add",error.response)
        return error
    }
}


const data={"user":"walt1","pwd":"sbhdahsfbds"};

export const getA=async (
)=>{
    try{
        return await axiosPrivate.post(`/auth`,data)
    }catch(error){
        console.log(error)
        return error
    }
}
export const getR=async (
    )=>{
        try{
            return await axiosPrivate.get(`/refresh`)
        }catch(error){
            console.log(error)
            return error
        }
    }

    
