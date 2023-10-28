import React from 'react'
// import Style from './IsLoading.module.css'
import { ProgressBar } from  'react-loader-spinner'
function IsLoading() {
  return<>
    <div className='w-100 py-3 vh-90  d-flex justify-content-center align-items-center'>
  <ProgressBar
  height="100"
  width="100"
  ariaLabel="progress-bar-loading"
  wrapperStyle={{}}
  wrapperClass="progress-bar-wrapper"
  borderColor = '#0aad0a'
  barColor = '#0aad0a'/>
  </div>
  </>
}

export default IsLoading