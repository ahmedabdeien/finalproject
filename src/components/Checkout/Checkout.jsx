//Checkout
import React, { useContext } from 'react'
import Style from './Checkout.module.css'
import { useFormik } from 'formik'
import { CartContext } from '../../Context/CartContext';

function Checkout() {
  let {onlinePayment} =useContext(CartContext)

  async function paymnet(vallues){
    console.log("holle",vallues);
    let {data} = await onlinePayment(vallues)
    window.location.href = data.session.url
    console.log(data);
  }
  let formik = useFormik({
    initialValues:{
      "details":"",
      "phone":"",
      "city":"",
    },
    onSubmit:paymnet
  })
  return<>
    <div className="p-5 mx-auto bg-light rounded-4 border">
      <h2>Shipping Address</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="details">Details</label>
            <input type="text" className='form-control' id='details' name='details' value={formik.values.details} onChange={formik.handleChange}/>

            <label htmlFor="phone">Phone</label>
            <input type="text" className='form-control' id='phone' name='phone' value={formik.values.phone} onChange={formik.handleChange}/>

            <label htmlFor="city">City</label>
            <input type="text" className='form-control' id='city' name='city' value={formik.values.city} onChange={formik.handleChange}/>
         
            <button className='btn bg-main text-white w-100 mt-4'><i className="bi bi-credit-card-2-front-fill me-2 fa-lg"></i>Pay now :D </button>
          </div>
        </form>
    </div>
  </>
}

export default Checkout