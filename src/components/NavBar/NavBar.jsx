import React, { useContext } from 'react'
import Style from './NavBar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../Assets/image/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext'

import { CartContext } from '../../Context/CartContext'

function NavBar() {

  let {userToken , setUserToken} = useContext(UserContext)
  let navigate = useNavigate()

  let{numOfCartItems} = useContext(CartContext)
  function LogOut(){
    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate('/Login')
}

  return<>
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top border">
  <div className="container-fluid">
    <Link className="navbar-brand" href="/"><img src={Logo} alt="freshcart-logo" /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {userToken!==null?<>
        <li className="nav-item">
          <Link className="nav-link fw-bolder" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link fw-bolder" to="/Products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link fw-bolder" to="/Categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link fw-bolder" to="/Brands">Brands</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link fw-bolder" to="/Profile">Profile</Link>
        </li>
        </>:''
        }

        
      </ul>
              <span className='border d-flex px-1 rounded-pill mx-auto'>
       <li className={`${Style.iconsSocialMedia}`}><i className="bi bi-instagram"></i></li>
        <li className={`${Style.iconsSocialMedia}`}><i className="bi bi-facebook"></i></li>
        <li className={`${Style.iconsSocialMedia}`}><i className="fa-brands fa-tiktok"></i></li>
        <li className={`${Style.iconsSocialMedia}`}><i className="fa-brands fa-twitter"></i></li>
        <li className={`${Style.iconsSocialMedia}`}><i className="bi bi-linkedin"></i></li>
        <li className={`${Style.iconsSocialMedia}`}><i className="bi bi-youtube"></i></li>
       </span>
       <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>

        {userToken !== null ?<>
        <li className="nav-item">
          <Link className="nav-link fw-bolder position-relative me-2" to="/Cart">
             <i className="bi bi-cart-fill fa-lg"></i>
             <span className='bg-main text-white px-2 position-absolute top-0 start-50 border  badge rounded-pill'>{numOfCartItems}</span>
             </Link>
        </li>
        <li  className="nav-item">
        <span onClick={()=>LogOut()} className="btn fw-bolder cursor-pointer rounded-pill text-danger">Logout <i className="bi bi-box-arrow-right "></i></span>
        </li>

        </>:<>
         <li  className="nav-item">
        <Link className="nav-link fw-bolder" to="/Register">Register</Link>
        </li>
        <li  className="nav-item">
        <Link className="nav-link fw-bolder" to="/Login">Login</Link>
        </li>
        </>}
       </ul>
    </div>
  </div>
</nav>
  </>
}

export default NavBar