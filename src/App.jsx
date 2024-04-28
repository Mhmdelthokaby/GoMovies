import React, { useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Component/layout/Layout';
import Home from './Component/home/Home';
import NotFound from './Component/notfound/NotFound';
import Login from './Component/login/Login';
import Register from './Component/register/Register';
import People from './Component/people/People';
import Movies from './Component/movies/Movies';
import TvShow from './Component/tvshow/TvShow';
import { jwtDecode } from 'jwt-decode';
import Protect from './Component/protect/Protect';
import MediaDetails from './Component/mediaDetails/MediaDetails';
import LoadingPage from './Component/loadingpage/LoadingPage/LoadingPage';

export default function App() {

  useEffect(()=>{
    if(localStorage.getItem('userToken')!==null){
      saveUserData()
    }
  },[])
  const[userData,setUserData] = useState(null)

  function saveUserData(){
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken)
    setUserData(decodedToken)

    console.log(userData);
  }


  const routers = createBrowserRouter([
    {path:"",element:<Layout setUserData={setUserData} userData={userData}/>,children:[
      {path:'/',element:<Home/>},
      {path:"home",element:<Home/>},
      {path:"login",element:<Login saveUserData={saveUserData}/>},
      {path:"register",element:<Register/>},
      {path:"details/:id/:mediatype",element:<Protect><MediaDetails/></Protect>},
      {path:"people",element:<Protect><People/></Protect> },
      {path:"movies",element:<Protect><Movies/></Protect>},
      {path:"tvshow",element:<Protect><TvShow/></Protect>},
      {path:"*",element:<NotFound/>}
      
    ]},
    {path:"*",element:<NotFound/>}
  ])
  
  return (
    <>
      <RouterProvider router={routers}></RouterProvider>
      
    </>
  )
}
