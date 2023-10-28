import Style from './Layout.module.css'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import { Offline, Online } from "react-detect-offline";
import Footer from '../Footer/Footer';
import ProductAll from '../productAll/productAll';
function Layout() {


  return<>
  <NavBar/>
  <div className="container py-5">
        <Outlet/>
  </div>

    <Offline>
    <div className='network d-flex align-items-center rounded-2 border'>
    <i class="bi bi-wifi-off fa-3x text-danger"></i>
    <h4 className=' fw-bold ms-3'>you are offline (surprise!)</h4>
    </div>
      
      </Offline>


<ProductAll><Footer/></ProductAll>
    
  </>
}

export default Layout