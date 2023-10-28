import React, { useEffect, useState } from 'react';
import Style from './Brands.module.css';
import axios from 'axios';
import { ProgressBar } from 'react-loader-spinner';

function Brands() {
  let [brandsData, setBrandsData] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [selectedBrand, setSelectedBrand] = useState(null); // Add state for the selected brand

  async function getBrands() {
    setIsLoading(true);
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    setBrandsData(data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getBrands();
  }, []);

  // Function to handle brand selection
  function handleBrandClick(brandName) {
    setSelectedBrand(brandName);
  }

  return <>
      {isLoading ? <div className='w-100 vh-90 d-flex justify-content-center align-items-center'>
          <ProgressBar
            height="100"
            width="100"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#0aad0a"
            barColor="#0aad0a"
          />
        </div>:<div className="row g-3 py-4">
          <h2 className='fw-bold bg-main p-3 text-white rounded-pill'>All Brands</h2>
          {brandsData.map((brand) => 
            <div key={brand._id} className="col-lg-3 col-md-6">
              <div type="button" className="cursor-pointer product rounded-5 border p-3" data-bs-toggle="modal"
              data-bs-target="#exampleModal" onClick={() => handleBrandClick(brand.name)}>
                <img src={brand.image} alt={brand.name} />
                <h4 className='border-top pt-2'>{brand.name}</h4>
              </div>
            </div>
          )}
        </div>
      }

      <div>
        {selectedBrand && ( // Only display modal if a brand is selected
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    {selectedBrand}
                  </h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <h2 className='fw-bold text-main h1'>{selectedBrand}</h2>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  
}

export default Brands;
