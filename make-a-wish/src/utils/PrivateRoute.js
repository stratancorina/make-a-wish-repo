import { Outlet, Navigate } from 'react-router-dom'
import React from 'react'

function PrivateRoute() {
    let auth={'token':false}
  return (
    auth.token ? <Outlet/> : <Navigate to="/"/>
  )
}

export default PrivateRoute