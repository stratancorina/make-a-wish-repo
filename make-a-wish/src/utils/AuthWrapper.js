import React from 'react'
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
    const [user, setUser ] = useState({name: "", isAuthenticated: false})
    return (
        <AuthContext.Provider value={{user}}>
        </AuthContext.Provider>
    )
}