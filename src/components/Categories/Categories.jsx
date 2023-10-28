import React, { useState } from 'react';
import Style from './Categories.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import Loading from '../isLoading/isLoading';

function Categories() {
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const [IsLoading, setIsLoading] = useState (false)
  async function chCategories(id,name) {
    setSelectedCategoryId(id);
    setSelectedCategoryName(name);
    
    // Fetch subcategories based on the selected category ID
    setIsLoading(true)
    let { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/subcategories?category=${id}`);
    setSubcategories(data.data);
    setIsLoading(false)
  }

  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  const { isLoading, isError, data, isFetching } = useQuery('category', getCategories);

  const names = data?.data.data || []; // Make sure names is an array

  return <>
  {isLoading ?<Loading />:<div className="row g-3 py-5">
          {names.map((category) =><div key={category._id} className="col-lg-4">
              <div onClick={() => chCategories(category._id,category.name)} className="product border rounded-2 overflow-hidden">
                <div className="overflow-hidden h350px">
                  <img src={category.image} className="w-100" alt={category.name} />
                </div>
                <div className="border-top p-2">
                  <h3 className="h4 fw-bold text-main">{category.name}</h3>
                </div>
              </div>
            </div>
          )}
        </div>
      }
      <div>
        {IsLoading?<div className='bg-black bg-opacity-25 z-1 position-fixed end-0 start-0 top-0 bottom-0'><Loading /></div>:selectedCategoryId !== null ? <>
        <h2 className='fw-bold text-main'>{selectedCategoryName} subcategories</h2>
          {subcategories.map((subcategory) =><div key={subcategory._id}>

              <h4 className='product p-2 border'>{subcategory.name}</h4>
            </div>)}</>:''}

      </div>
  </>
  
}

export default Categories;
