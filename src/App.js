//app
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import { UserContext } from './Context/UserContext';
import { useContext, useEffect } from 'react';
import ProductAll from './components/productAll/productAll';
import ProductDetails from './components/productDetails/productDetails';
import CartContextProvider from './Context/CartContext';
import Profile from './components/Profile/Profile';
import Checkout from './components/Checkout/Checkout';
import AllOrders from './components/AllOrders/AllOrders';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';


let routers = createHashRouter([
  {path:'/',element:<Layout/>,children:[
    {index:true,element: <ProductAll><Home/></ProductAll>},
    {path:'Cart',element: <ProductAll><Cart/></ProductAll>},
    {path:'Brands',element:<ProductAll><Brands/> </ProductAll>},
    {path:'Products',element: <ProductAll><Products/></ProductAll>},
    {path:'Categories',element:<ProductAll><Categories/></ProductAll>},
    {path:'ProductDetails/:id',element:<ProductAll><ProductDetails/></ProductAll>},
    {path:'Profile',element:<ProductAll><Profile/></ProductAll>},
    {path:'Checkout',element:<ProductAll><Checkout/></ProductAll>},
    {path:'allorders',element:<ProductAll><AllOrders/></ProductAll>},
    {path:'Register',element:<Register/>},
    {path:'Login',element:<Login/>},
    {path:'*',element:<NotFound/>},
  ]}
])
function App() {
  let {setUserToken} = useContext( UserContext );
  useEffect(()=>{
    if(localStorage.getItem('userToken') !== null){
      setUserToken(localStorage.getItem('userToken'))
    }
  },[]);
  return<>
    <CartContextProvider>
      <Provider store={store}>
      <RouterProvider router={routers}></RouterProvider>
      <Toaster/>
      </Provider>
    </CartContextProvider>
 </>
}

export default App;
