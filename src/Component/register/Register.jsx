import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const Register = () => {

  const[error,SetError]= useState("")
  const[loading,setLoading] = useState(false)
  let navigate = useNavigate()

  let validate = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .max(15, 'Name cannot be longer than 15 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        'Password must start with an uppercase letter, contain at least one lowercase letter, one number, and be at least 8 characters long'
      )
      .required('Password is required'),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
    phone: Yup.string()
      .matches(/^[0-9]{11}$/, 'Invalid phone number') // assuming 10 digit phone number
      .required('Phone number is required')
  });
  

  let formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },validationSchema:validate,
    onSubmit:sendRegisterData
    
  })

  async function sendRegisterData(values){
    setLoading(true)
    
    try{
        let {data} = await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signup",values)
        setLoading(false)
        if(data.message=="success"){
          localStorage.setItem("userToken" ,data.token)
          navigate("/login")
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



  // mohamedemad3313@gmail.com
  // StrongPass123

  return (
    <>
      <div className='container text-white my-5 w-75'>
        <div className="row vstack gap-4">
          <h2 className='h1'>Register Now</h2>
          <form onSubmit={formik.handleSubmit} className='vstack gap-4'>
            {error? <div className='alert alert-danger'>
                          {error}
              </div> :""}
            <div className="">
              <label htmlFor="name" className="form-label">Name:</label>
              <input className='form-control border-danger bg-dark text-white' type="text" name="name" id="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.errors.name && formik.touched.name ? <div className='alert alert-danger p-2 my-2'>{formik.errors.name}</div> :""}
            </div>
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
            <div className="">
              <label htmlFor="rePassword" className="form-label">Confirm Password:</label>
              <input className='form-control border-danger bg-dark text-white' type="password" name="rePassword" id="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger p-2 my-2'>{formik.errors.rePassword}</div> :""}

            </div>
            <div className="">
              <label htmlFor="phone" className="form-label">Phone:</label>
              <input className='form-control border-danger bg-dark text-white' type="text" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger p-2 my-2'>{formik.errors.phone}</div> :""}

            </div>
            <button type="submit" className="btn bg-danger w-25">{loading?<i className='fas fa-spinner fa-spin'></i> : "Register" }</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
