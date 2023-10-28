import React from 'react'
import Style from './MainSlider.module.css'
import Slider1 from '../../Assets/image/slider-image-1.jpeg'
import Slider2 from '../../Assets/image/slider-image-2.jpeg'
import Slider3 from '../../Assets/image/slider-image-3.jpeg'
import blog1 from '../../Assets/image/blog-img-1.jpeg'
import blog2 from '../../Assets/image/blog-img-2.jpeg'
import Slider from "react-slick";
function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return<>
  <div className="row gx-0 py-3">
    <div className="col-lg-8">
           <Slider {...settings}>
           <img height={400} src={Slider1} alt="" className='w-100'/>
           <img height={400} src={Slider2} alt="" className='w-100' />
           <img height={400} src={Slider3} alt="" className='w-100' />

        </Slider>
    </div>
    <div className="col-lg-4">
    <img height={200} src={blog1} alt="" className='w-100 ' />
    <img height={200} src={blog2} alt="" className='w-100 ' />
    </div>
  </div>

  </>
}

export default MainSlider