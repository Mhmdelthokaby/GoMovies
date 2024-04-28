import React from 'react'
import Navbar from './../navbar/Navbar';
import Home from '../home/Home';
import Footer from '../footer/Footer';
import { Outlet, useNavigate } from 'react-router-dom';

const Layout = ({userData ,setUserData}) => {

  let navigate = useNavigate()
  
  function logOut(){
    localStorage.removeItem('userToken')
    setUserData(null)
    navigate('/login')
  }

  return (
    <div>
      <Navbar logOut={logOut} userData={userData}/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout
