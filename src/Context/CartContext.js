//CartContext
import axios from "axios";
import { createContext, useState,useEffect } from "react";
export let CartContext = createContext()

let userToken =localStorage.getItem('userToken')
let headers ={
    token:userToken
}
function addToCart(id){
  return axios.post(
    'https://ecommerce.routemisr.com/api/v1/cart',{productId:id},{
    headers:headers
   }).then((response) =>response)
   .catch((error) => error)
}
function getLoggedUserCart(){
   return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers:headers
    }).then((response) => response)
    .catch((error) => error)

}
function removeCartItem(productId){
   return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
    headers:headers
   }).then((response) => response).catch((error) => error )
}


function updateProduct(productId, count) {
  // Check if the count is greater than 0
  if (count > 0) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        count: count
      }, {
        headers: headers
      })
      .then((response) => response)
      .catch((error) => error);
  } else {
    // If count is 0, remove the item from the cart
    return removeCartItem(productId);
  }
}


export default function CartContextProvider(props){
    const [cartId,setCartId] = useState(null)
    const [numOfCartItems,setnumOfCartItems] = useState(null)

    async function getInitialCart(){
      let {data}= await getLoggedUserCart()
      setnumOfCartItems(data?.numOfCartItems)
      setCartId(data?.data._id)
    }

    useEffect(()=>{
      getInitialCart()
    },[])

    function onlinePayment(shippingAddress){
      //65242eedf626c1c2d21051c6
      return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
        shippingAddress:shippingAddress
    },{headers:headers}).then((response) => response).catch((error)=>error)
    
    }
  return <CartContext.Provider value={{addToCart,getLoggedUserCart,removeCartItem,updateProduct,onlinePayment,numOfCartItems,setnumOfCartItems}}>
    {props.children}
</CartContext.Provider>
}