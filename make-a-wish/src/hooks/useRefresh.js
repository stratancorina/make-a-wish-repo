import React from 'react'
import useAuth from './useAuth'
import axios from 'axios';

const useRefresh =() => {
    const {setAuth} = useAuth();

    const refresh = async () => {
        const response = await axios.get('http://localhost:3001/refresh',{
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return {
                ...prev, accessToken:response.data.accessToken
            }
        });
        return response.data.accessToken;
    }
  return refresh;
}

export default useRefresh