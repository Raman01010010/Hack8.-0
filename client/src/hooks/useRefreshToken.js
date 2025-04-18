import axios from '../api/axios';
import useAuth from './useAuth';
import { User } from '../context/User';
import React from 'react'

axios.defaults.withCredentials = true;
const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const {newUser,setNewUser}=React.useContext(User)
    //setAuth({"email":"nxcmx"})

    const refresh = async () => {
        const response = await axios.get('/refresh',{},{
            withCredentials: true
        }
        );
        setNewUser(prev => {
           // console.log(JSON.stringify(prev));
            //console.log(response.data.accessToken);
            return { ...prev,userid:response.data.userid, accessToken: response.data.accessToken,picture:response.data.picture,username:response.data.username,email:response.data.email }
        });
        console.log(newUser)
        console.log(response.data)
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
