import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
// import Style from './ProductDetails.module.css'
import {Helmet} from "react-helmet";
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import IsLoading from '../isLoading/isLoading';
import Slider from "react-slick";
import React, { useContext, useEffect, useState } from 'react'
function ProductDetails() {
  let {id} = useParams();
  let {addToCart,setnumOfCartItems} = useContext(CartContext)
  async function addProductToCart(id)
  {
    let response = await addToCart(id)
    if(response.data.status === 'success'){
      toast.success("product added successfully",{
        duration: 1500,
        position: 'top-right',
        
     })
     setnumOfCartItems(response.data.numOfCartItems)
    }else{
     toast.error('Error Product added')
    }
  }

  const [ProductDetails, setProductDetails] = useState({})
  const [isLoading, setisLoading] = useState(true)

  async function getProductDetails(id){
   let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
   setProductDetails(data.data)
   setisLoading(false)
  }
  useEffect(() =>{
    getProductDetails(id)
  },[])

//react slick slider settings
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return<>
    <Helmet>
        <title>{ProductDetails.title}</title>
    </Helmet>

{isLoading?<IsLoading/>:ProductDetails?<div className='row align-items-center py-4'>
    <div className="col-lg-4 col-sm-12 ">
    <Slider {...settings}>
    
    {ProductDetails.images.map((pro)=><img key={pro._id} className='img-fluid border' src={pro} alt='' />)}
    </Slider>
    
            
          </div>
          <div className="col-lg-8 col-sm-12">
            <h2 className='fw-bold'>{ProductDetails.title}</h2>
            <table className="table table-striped border">
            <tbody>
    <tr>
      <th scope="row">description</th>
      <td><p>{ProductDetails.description}</p></td>
    </tr>
    <tr>
      <th scope="row">name</th>
      <td><h3 className='h6 fw-bolder text-main'>{ProductDetails.category.name}</h3></td>
    </tr>
    <tr>
      <th scope="row">ratingsQuantity</th>
      <td>{ProductDetails.ratingsQuantity}</td>
    </tr>
  </tbody>
           </table>
            <div className="d-flex justify-content-between align-items-center">
              <span>{ProductDetails.price} EGY</span>
              <span>{ProductDetails.ratingsAverage} <i className="bi bi-star-fill rating-color"></i></span>
            </div>
            <button onClick={()=>addProductToCart(ProductDetails._id)} className='btn bg-main w-100 text-white fw-bold mt-4' > Add To Cart <i className="bi bi-cart4 fa-lg ms-1"></i></button>
            </div></div>:''}
  
  </>
}

export default ProductDetails