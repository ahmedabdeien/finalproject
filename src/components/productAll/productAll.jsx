import React from 'react'
import { Navigate } from 'react-router-dom'
// import Style from './ProductAll.module.css'

function ProductAll( props ) {
  if(localStorage.getItem('userToken') !== null)
  {
    return props.children
  }
  else{
    return <Navigate to={'/Login'}/>
  }

}

export default ProductAll