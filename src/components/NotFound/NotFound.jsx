import React from 'react'
import Style from './NotFound.module.css'
import imgErorr from '../../Assets/image/error.svg'

function NotFound() {
  return<>
    <div className=' container'>
      <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
         <img src={imgErorr} alt="erorr" />
      </div>
    </div>
  </>
}

export default NotFound