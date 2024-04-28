import React from 'react'
import './LoadingPage.css'
const LoadingPage = () => {
  return (
    <>
       <div className='d-flex justify-content-center align-items-center vh-100'>
       <div class="loader">
              <div class="loader-square"></div>
              <div class="loader-square"></div>
              <div class="loader-square"></div>
              <div class="loader-square"></div>
              <div class="loader-square"></div>
              <div class="loader-square"></div>
              <div class="loader-square"></div>
       </div>
       </div>
    </>
  )
}

export default LoadingPage