import React, { useState } from 'react'
import Style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ProgressBar } from  'react-loader-spinner'
function Register() {
  let [error,setError]=useState(null);
  let [isLoading,setisLoading]=useState(false);
  let phoneRegex = /^01[0-2,5]{1}[0-9]{8}$/
  let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  let navigate = useNavigate();
  async function submitRegister(values){
    setisLoading(true);
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
    .catch((err)=>{
      setisLoading(false);
      setError(err.response.data.message)
    } )
   if(data.message === 'success'){
    setisLoading(false);
    navigate('/Login'); //I will navigate to the login page
   }
  }
  const validateScheme = Yup.object({
    name:Yup.string().min(3,'Name min length is 3').max(15 ,'Name max length is 15').required('Name is required'),
    email:Yup.string().email('emil is nvalid').required('emil is required'),
    phone:Yup.string().matches(phoneRegex,'phone is nvalid').required('phone is required'),
    password:Yup.string().matches(passwordRegex,'password start with uppercase').required('password is required'),
    rePassword:Yup.string().oneOf([Yup.ref('password')],'password and repassword dont match').required('rePassword is required'),

  })

  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:'',
    },validationSchema:validateScheme,
    onSubmit:submitRegister
  })
  return<>
  
  <div className="w-75 p-4 mx-auto">
    {error?<div className='alert alert-danger'>{error}</div>:''}
  
    <h2 className='fw-bold border-bottom pb-2'>Register</h2>
    
    <form className='mt-4' onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Name :</label>
      <input id="name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} className='form-control my-2' name='name' type='text'/>
       {formik.errors.name && formik.touched.name?<div className="alert alert-danger py-1">{formik.errors.name}</div>:''}
       
      <label htmlFor="email">Email :</label>
      <input id="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='form-control my-2' name='email' type='email'/>
      {formik.errors.email && formik.touched.email?<div className="alert alert-danger py-1">{formik.errors.email}</div>:''}

      <label htmlFor="phone">Phone :</label>
      <input id="phone" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} className='form-control my-2' name='phone' type='tel'/>
      {formik.errors.phone && formik.touched.phone?<div className="alert alert-danger py-1">{formik.errors.phone}</div>:''}
      
      <label htmlFor="password">Password :</label>
      <input id="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className='form-control my-2' name='password' type='password'/>
      {formik.errors.password && formik.touched.password?<div className="alert alert-danger py-1">{formik.errors.password}</div>:''}

      <label htmlFor="rePassword">rePassword :</label>
      <input id="rePassword" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} className='form-control my-2' name='rePassword' type='password'/>
      {formik.errors.rePassword && formik.touched.rePassword?<div className="alert alert-danger py-1">{formik.errors.rePassword}</div>:''}
       {isLoading?<button type='button' className='btn bg-main text-white border border-black mt-3'>
       <ProgressBar
  height="25"
  width="65"
  ariaLabel="progress-bar-loading"
  wrapperStyle={{}}
  wrapperClass="progress-bar-wrapper"
  borderColor = '#eff1ed'
  barColor = '#ffffff'
/>
        
        </button>: <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main cursor-pointer text-white border border-black mt-3'>Register</button>}
       
     
    

    </form>

  </div>


  </>
}

export default Register