import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiDomain } from '../../../utils/utilsDomain';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getBlog, getProducts } from '../../../utils/apiCalls';
import './product.scss'



const Product = () => {
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const numberOfProducts = 4;
  const displayedProducts = data.slice(0, numberOfProducts);



  const fetchProducts = async () => {
    const data = await getProducts();
    setData(data.slice(0, numberOfProducts));

  };
  const parseImageLink = (imageLink) => {
    try {
      const imageArray = JSON.parse(imageLink);
      if (Array.isArray(imageArray) && imageArray.length > 0) {
        return imageArray;
      }
    } catch (error) {
      console.error('Error parsing ImageLink:', error);
    }
    return null;
  };


  useEffect(() => {
    fetchProducts();

  }, []);
  return (
    <>

      {/* <!-- product list --> */}
      <div className="section">
        <div className="container">
          <div className="section-header ">
            <h2>Sản phẩm mới</h2>
          </div>
          <div className="row" id="latest-products">
            {data.map((product, index) => (

              <div className="col-6 col-md-3 listproduct " key={index}>

                <img className="image-product" src={apiDomain + "/image/" + parseImageLink(product.ImageLink)[0]} alt="" />
                <img className='label-new' src="https://www.myboat.com.au/wp-content/uploads/new.png" alt="" />
                <div className="font-medium md:pt-4 pt-2">
                  <p className='md:text-[15px] text-center'>{product.Name}</p>
                  <p className='text-center md:text-[18px] text-red'>{product.Price}.000 VNĐ</p>
                </div>
                <div className="btn-product">
                  <Link to={`/product/${product.ID}`} className='btn-view-product'>
                    <button className=""><i className="bi bi-search  hover:text-blue-500 text-3xl "></i></button>
                  </Link>
                  <button className=''><i className="bi bi-cart-plus hover:text-blue-500 text-3xl "></i></button>
                </div>
              </div>


            ))}

          </div>
          <div className="section-footer">

            <Link to="/products" className="btn-flat btn-hover">
              Xem tất cả
            </Link>
          </div>
        </div>
      </div>
      {/* <!-- end product list --> */}



    </>
  );
};

export default Product;
