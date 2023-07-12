import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider  = ({children}) => {
    const [auth, setAuth] = useState({role:[]});
    console.log(auth);
    console.log(auth.role);

    return (
        <AuthContext.Provider value = {{auth, setAuth}}>
        {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;