import React from 'react'

import { Navigate } from 'react-router-dom';


const ProtectRoute = ({ children, isLogged }) => {


    if(!isLogged) {
        return <Navigate to={"/login"} />
    }

    return children;
}

export default ProtectRoute;