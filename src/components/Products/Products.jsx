import React, { useState } from 'react';
import Style from './Products.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { ProgressBar } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import  Loading  from '../isLoading/isLoading';

function Products() {
  let { addToCart, setnumOfCartItems } = useContext(CartContext);

  const [searchText, setSearchText] = useState(''); // State to store the search text
  const [filteredProducts, setFilteredProducts] = useState([]); // State to store filtered products

  async function addProductToCart(id) {
    let response = await addToCart(id);
    if (response.data.status === 'success') {
      toast.success('Product added successfully', {
        duration: 1500,
        position: 'top-right',
      });
      setnumOfCartItems(response.data.numOfCartItems);
    } else {
      toast.error('Error Product added');
    }
  }

  function getfeaturedProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { isLoading, isError, data, isFetching } = useQuery('featuredProducts', getfeaturedProducts);

  // Handle search input change
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);

    // Filter the products based on the search text
    const filtered = data?.data.data.filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <>
      <h2 className="bg-main py-3 fw-bold px-2 mt-4 border-bottom border-1 border-dark">Products</h2>
      <div className="py-3">
        <input
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={handleSearchChange}
          className="form-control mb-3"
        />

        {isLoading?<Loading/>:<div className="row py-3">
            {(searchText ? filteredProducts : data?.data.data).map((product) => (
              <div key={product._id} className="col-lg-2 col-md-4 col-sm-6 my-2">
                <div className="product px-1 cursor-pointer">
                  <Link to={`/productDetails/${product._id}`}>
                    <img className="img-fluid" height={200} src={product.imageCover} alt={product.title} />
                    <div className="py-2">
                      <span className="badge rounded-pill fa-xs bg-main py-2">{product.category.name}</span>
                      <h3 className="h6 fw-semibold">{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <span>{product.price} EGY</span>
                        <span>
                          <i className="bi bi-star-fill rating-color"></i> {product.ratingsAverage}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <button onClick={() => addProductToCart(product._id)} className="btn bg-main text-white w-100 btn-sm mt-2">
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </>
  );
}

export default Products;