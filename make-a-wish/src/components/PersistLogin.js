import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefresh from "../hooks/useRefresh";
import useAuth from "../hooks/useAuth";

const PersistLogin = () =>  {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefresh();
    const {auth} = useAuth();

    useEffect(()=> {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } 
            catch(err) {
                console.log(err);

            }
            finally {
                setIsLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)

    }, [isLoading])

  return (
    <>
    {isLoading 
        ?<p>Loading...</p> 
        : <Outlet/>
    }
    </>
  )
}

export default PersistLogin