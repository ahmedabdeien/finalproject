//Cart
import React, { useContext, useEffect, useState } from 'react';
import Style from './Cart.module.css';
import { CartContext } from '../../Context/CartContext';
import { ProgressBar } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Cart() {
  const [cartDetails, setCartDetails] = useState(null)
  let {getLoggedUserCart,removeCartItem,updateProduct,setnumOfCartItems} = useContext(CartContext);
  async function updateCount(id, count) {
    let { data } = await updateProduct(id, count);
    if (data.count >= 0) {
      setCartDetails(data);
    } else {
      removeItem(id);
    }
  }
  async function removeItem(id)
  {
    let {data} = await removeCartItem(id);
    setnumOfCartItems(data.numOfCartItems)
    setCartDetails(data);
    
  }
  async function getCart()
  {
    let {data} = await getLoggedUserCart();
    
    setCartDetails(data);
    
  }

  useEffect(() =>{
    getCart();
  },[]);
  return<>
        <Helmet>
        <title>Cart</title>
      </Helmet>
  
  {cartDetails?<div className=' mx-auto p-2 bg-main-light'>
      <h3>shopping Cart</h3>
      <h4 className='h6 text-main fw-bolder'>Cart Items : {cartDetails.numOfCartItems}</h4>
      <h4 className='h6 text-main fw-bolder'>Total Cart Price : {cartDetails.data.totalCartPrice}</h4>
      {cartDetails.data.products.map((product)=><div 
      className='row' key={product.product._id}>
       <div className="col-lg-2 col-sm-4 my-2">
         <img className='w-100' src={product.product.imageCover} alt={product.title} />
       </div>
       <div className="col-lg-10 col-sm-8 my-2 border-bottom">
         <div className=' d-flex justify-content-between align-items-center'>
          <div>
            <h3 className='h6'>{product.product.title.split(' ').slice(0,3).join(' ')}</h3>
            <h6>{product.price} EGY</h6>
          </div>

          <div>
            <button onClick={()=>updateCount(product.product.id,product.count +1)} className='btn border-main'>+</button>
            <span className='mx-2'>{product.count}</span>
            <button onClick={()=>updateCount(product.product.id,product.count -1)} className='btn border-main'>-</button>
          </div>
         </div>
         <button onClick={()=> removeItem(product.product._id)} className='btn btn-outline-danger py-1'><i className="bi bi-trash"></i> remove</button>
       </div>
      </div>
      )}
       <Link className='btn bg-main text-white w-100' to='/Checkout'>Checkout</Link>
    </div>:
    <div id='loading' className='vh-90 w-100 d-flex justify-content-center align-items-center'>
    <ProgressBar
  height="100"
  width="100"
  ariaLabel="progress-bar-loading"
  wrapperStyle={{}}
  wrapperClass="progress-bar-wrapper"
  borderColor = '#0aad0a'
  barColor = '#0aad0a'/>
      </div>
      }

  </>
}

export default Cart