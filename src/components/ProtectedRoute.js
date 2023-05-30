import React from "react";

import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export const ProtectedRoute =({children}) =>{
    
    const {isAuthenticated} = useAuth0();

    if(!isAuthenticated){
        return <Navigate to='/'/>;
    }

    return children;
}