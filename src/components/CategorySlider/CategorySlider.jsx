import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
// import Style from './CategorySlider.module.css'
import Slider from 'react-slick';
import {getCategories} from '../../Redux/categoriesSlice'
import { useSelector } from 'react-redux';

function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 1000
  };
  function getCategoriess(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  let {isLoading,isError ,data} = useQuery('categorySlider',getCategoriess)
  console.log(data?.data.data);
  return<>
<div className='py-4'>
  {data?.data.data?<Slider {...settings}>{
  data?.data.data.map((category)=> <img key={category._id} height={200} src={category.image} alt={category.name} className='w-100' /> )}</Slider>:''}
</div>
  </>
}

export default CategorySlider

// import axios from 'axios';
// import React from 'react';
// import { useQuery } from 'react-query';
// import Slider from 'react-slick'; // Corrected import statement

// function CategorySlider() {
//   var settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   async function getCategories() {
//     const response = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
//     return response.data.data; // Assuming the data you want is in response.data.data
//   }

//   const { isLoading, isError, data } = useQuery('categorySlider', getCategories);

//   return (
//     <>
//       <Slider {...settings}>
//         {data ? (
//           data.map((category) => (
//             <div key={category.id}> {/* Assuming each category has an 'id' */}
//               <img src={category.image} alt={category.name} className="w-100" /> {/* Assuming there is an 'image' field */}
//             </div>
//           ))
//         ) : (
//           <p>Loading...</p>
//         )}
//       </Slider>
//       <div>CategorySlider</div>
//     </>
//   );
// }

// export default CategorySlider;