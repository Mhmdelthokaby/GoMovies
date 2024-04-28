import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


const Login = ({saveUserData}) => {

  const[error,SetError]= useState("")
  const[loading,setLoading] = useState(false)
  const navigate = useNavigate();

  let validate = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        'Password must start with an uppercase letter, contain at least one lowercase letter, one number, and be at least 8 characters long'
      )
      .required('Password is required')
  });
  

  let formik = useFormik({
    initialValues:{
      email:"",
      password:""
    },validationSchema:validate,
    onSubmit:sendLoginData
    
  })

  async function sendLoginData(values){
    setLoading(true)
    
    try{
        let {data} = await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signin",values)
        setLoading(false)
        if(data.message=="success"){
          localStorage.setItem("userToken" ,data.token)
          saveUserData()
          navigate("/home")
        }
      }
    catch(e)
    {
      setLoading(false)
      console.log("Error========");
      console.log(e);
      SetError(e.response.data.errors.msg)
    }
    

  }




  return (
    <>
      <div className='container text-white my-5 w-75'>
        <div className="row vstack gap-4">
          <h2 className='h1'>Login</h2>
          <form onSubmit={formik.handleSubmit} className='vstack gap-4'>
            {error? <div className='alert alert-danger'>
                          {error}
              </div> :""}
            <div className="">
              <label htmlFor="email" className="form-label">Email:</label>
              <input className='form-control border-danger bg-dark text-white' type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.errors.email && formik.touched.email ? <div className='alert alert-danger p-2 my-2'>{formik.errors.email}</div> :""}

            </div>
            <div className="">
              <label htmlFor="password" className="form-label">Password:</label>
              <input className='form-control border-danger bg-dark text-white' type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.errors.password && formik.touched.password ? <div className='alert alert-danger p-2 my-2'>{formik.errors.password}</div> :""}

            </div>
            
            
            <button type="submit" className="btn bg-danger w-25">{loading?<i className='fas fa-spinner fa-spin'></i> : "Login" }</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
