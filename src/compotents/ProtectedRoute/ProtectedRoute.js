import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, ...props  }) => {
  return (
    props.isloggedin ? <Component {...props} /> : <Navigate to="/"/>
    
)}

export default ProtectedRouteElement;