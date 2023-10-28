import React from 'react'
import Style from './Footer.module.css'
import kindpng1 from '../../Assets/image/kindpng1.png'
import kindpng2 from '../../Assets/image/kindpng2.png'
import kindpng3 from '../../Assets/image/kindpng3.png'
import kindpng4 from '../../Assets/image/kindpng4.png'
import Store from '../../Assets/image/itemsStore.svg'

function Footer() {
  return<footer className='bg-main-light border-top'>
    <div className=' container py-4'>
      <div className="row">
        <div className="col-12 border-bottom py-3">
           <h3>Get the FreshCart app</h3>
           <p>We will send you a link, open it on your phone to download the app.</p>
           <div className='d-flex align-items-center'>
           <input placeholder='Email...' className='form-control-color w-75' type="email" />
           <button className='btn bg-main rounded-0 fw-bold text-white ms-2'>Share App Link</button>
           </div>

           </div>
           <div className="col-md-6 d-flex align-items-center py-4">
             <h5 className='me-2 fw-bold'>Payment Partners</h5>
              <img width={80} src={kindpng3}  alt="kindpng" />
             <img width={80} src={kindpng2}  alt="kindpng" />
             <img width={90} src={kindpng1}  alt="kindpng" />
             <img width={80} src={kindpng4}  alt="kindpng" />
           </div>
           <div className="col-md-6 py-3 d-flex align-items-center justify-content-end py-4 ">
            <h5 className='me-4 fw-bold'>Get deliveries with FreshCart</h5>
            <img  src={Store} width={120}  alt="Store" />
            </div>

      </div>
    </div>
  </footer>
}

export default Footer