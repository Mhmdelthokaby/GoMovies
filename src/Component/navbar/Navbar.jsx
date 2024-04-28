import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import AppStyle from '../../App.module.css'


const Navbar = ({userData ,logOut}) => {


  let location = useLocation()

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-transparent p-3 z-3 ">
  <div className="container-fluid py-1" >
    <Link className="navbar-brand " to="/" ><h3 className="text-white"><span className="text-danger fs-1 fw-bold">Go</span>Movies</h3></Link>
    <button class="navbar-toggler tex-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="text-white"><i class="fa-solid fa-bars"></i></span>
    </button>
    <div class="collapse navbar-collapse z-3" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              {userData? <><li className="nav-item">
                <Link className={location.pathname==="/" ? "nav-link text-danger fs-5 fw-bold border-bottom border-danger" :"nav-link text-white fs-5"} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={location.pathname==="/movies" ? "nav-link text-danger fs-5 fw-bold border-bottom border-danger" :"nav-link text-white fs-5"} to='movies'>Movies</Link>
              </li>

              <li className="nav-item">
                <Link className={location.pathname==="/Tvshow" ? "nav-link text-danger fs-5 fw-bold border-bottom border-danger" :"nav-link text-white fs-5"} to='Tvshow'>Tvshow</Link>
              </li>
              <li className="nav-item">
                <Link className={location.pathname==="/people" ? "nav-link text-danger fs-5 fw-bold border-bottom border-danger" :"nav-link text-white fs-5"} to='people'>People</Link>
              </li></> :""}



              {userData? <li className="nav-item">
                <button onClick={logOut}  className="text-white fs-5 btn btn-danger"  >Logout</button>
              </li> : <>
              <li className="nav-item">
                <Link className={location.pathname==="/register" ? "nav-link text-danger fs-5 fw-bold border-bottom border-danger" :"nav-link text-white fs-5"} to='register'>Register</Link>
              </li>

              <li className="nav-item">
                <Link className={location.pathname==="/login" ? "nav-link text-danger fs-5 fw-bold border-bottom border-danger" :"nav-link text-white fs-5"} to='login'>Login</Link>
              </li>
              </>}

              


              
        
      </ul>
      
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar
