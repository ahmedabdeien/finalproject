import React, { useContext,useState } from 'react'
import Style from './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ProgressBar } from  'react-loader-spinner'
import { UserContext } from '../../Context/UserContext'


function Login() {
  let {setUserToken , setUserData } = useContext(UserContext);
  let [error,setError]=useState(null);
  let [isLoading,setisLoading]=useState(false);
  let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  let navigate = useNavigate();
  async function submitLogin(values){
    setisLoading(true);
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
    .catch((err)=>{
      setisLoading(false);
      setError(err.response.data.message)
    } )
   if(data.message === 'success'){
    setisLoading(false);
    localStorage.setItem('userToken', data.token)
    setUserToken(data.token)
    setUserData(data.user)
    navigate('/'); //I will navigate to the home page
   }
  }
  const validateScheme = Yup.object({
    email:Yup.string().email('emil is nvalid').required('emil is required'),
    password:Yup.string().matches(passwordRegex,'password start with uppercase').required('password is required'),
   

  })

  let formik = useFormik({
    initialValues:{
      email:'',
      password:'',
    },validationSchema:validateScheme,
    onSubmit:submitLogin
  })
  return<>
  
  <div className="w-75 p-4 mx-auto">
    {error?<div className='alert alert-danger'>{error}</div>:''}
  
    <h2 className='fw-bold border-bottom pb-2'>Login</h2>
    
    <form className='mt-4' onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email :</label>
      <input id="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='form-control my-2' name='email' type='email'/>
      {formik.errors.email && formik.touched.email?<div className="alert alert-danger py-1">{formik.errors.email}</div>:''}
      
      <label htmlFor="password">Password :</label>
      <input id="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className='form-control my-2' name='password' type='password'/>
      {formik.errors.password && formik.touched.password?<div className="alert alert-danger py-1">{formik.errors.password}</div>:''}

       {isLoading?<button type='button' className='btn bg-main text-white border border-black mt-3'>
       <ProgressBar
  height="25"
  width="65"
  ariaLabel="progress-bar-loading"
  wrapperStyle={{}}
  wrapperClass="progress-bar-wrapper"
  borderColor = '#eff1ed'
  barColor = '#ffffff'
/></button>:<>
        <div className=' d-flex align-items-center'>
        <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main cursor-pointer text-white border border-black mt-3'>Login</button>
        <Link className='ms-3' to={'/Register'}> Register Now</Link>
        </div>
        </> }
    </form>

  </div>
  </>
}

export default Login