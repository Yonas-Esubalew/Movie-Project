import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useSelector } from 'react-redux'
const AdminRouters = () => {

    const {userInfo} = useSelector((state)=> state.auth)
  return userInfo && userInfo.isAdmin ? (
    <Outlet/>
  ): (
    <Navigate to={"/login"} replace />
  )
}

export default AdminRouters