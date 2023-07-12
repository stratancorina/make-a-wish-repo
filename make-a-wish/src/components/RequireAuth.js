import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useFormContext from "../hooks/useFormContext";

const RequireAuth = ({allowedRoles}) => {
    const {auth } = useAuth();
    const location = useLocation();

    return (
        // auth?.username
        allowedRoles.includes(auth?.roles)
            ? <Outlet/>
            : auth?.username
                ? <Navigate to="/unauthorized" state={{from:location}} replace />
                : <Navigate to="/login" state={{from:location}} replace />
        );
}
export default RequireAuth;
