import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Context } from "../../../context/Context";
import { apiDomain } from '../../../utils/utilsDomain';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getBlog, getProducts } from '../../../utils/apiCalls';

import './product.scss'


const Product = () => {
  const [data, setData] = useState([]);
  const { setCartItems } = useContext(Context);
  const { user } = useContext(Context);
  const numberOfProducts = 4;
  const displayedProducts = data.slice(0, numberOfProducts);
  const [isModalOpen, setOpenModal] = useState(false);

  const getCartItems = async () => {
    try {
      const response = await axios.get(`${apiDomain}/cart/${user.id}`);
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };


  const handleAddToCart = async (id, price, name) => {

    if (user) {


      const data = {
        product_id: id,
        quantity: 1,
        price: price,
      }
      try {
        await axios.post(`${apiDomain}/cart/${user.id}`, data);
        getCartItems();
        toast.success(` Sản phẩm ${name} đã được thêm vào giỏ hàng thành công!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    } else {
      setOpenModal(true);
    }


  };


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
      <ToastContainer />
      {/* <!-- product list --> */}
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='fixed inset-0 bg-gray-500 z-[-1] bg-opacity-75'></div>

          <div className='bg-white p-6 rounded-lg relative'>
            <button className="absolute top-0 right-0 p-1 font-bold   text-black-500" onClick={() => setOpenModal(false)}>X</button>
            <h1>Bạn phải đăng nhập để tiếp tục mua sắm</h1>
            <div className='flex justify-end'>
              <Link to='/auth/login'
                className='bg-blue-500 hover:bg-blue-700 center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              >
                Đi đến đăng nhập
              </Link>

            </div>
          </div>
        </div>
      )}
      <div className="section mt-[-150px]">
        <div className="container">
          <div className="section-header ">
            <h2>Sản phẩm mới</h2>
          </div>
          <div className="row" id="latest-products">
            {data.map((product, index) => (

              <div className="col-6 col-md-3 listproduct " key={index}>
                <Link to={`/product/${product.ID}`}>
                  <img className="image-product" src={parseImageLink(product.ImageLink)[0]} alt="" />

                </Link>
                <img className='label-new' src="/images/new.png" alt="" />
                <Link to={`/product/${product.ID}`} className="font-medium md:pt-4 pt-2">
                  <p className='md:text-[15px] text-center'>{product.Name}</p>
                  <p className='text-center md:text-[18px] text-red'>{product.Price}.000 VNĐ</p>
                </Link>
                <div className="btn-product">
                  <Link to={`/product/${product.ID}`} className='btn-view-product'>
                    <button className=""><i className="bi bi-search  hover:text-blue-500 text-3xl "></i></button>
                  </Link>
                  <button className='' onClick={() => handleAddToCart(product.ID, product.Price, product.Name)}><i className="bi bi-cart-plus hover:text-blue-500 text-3xl "></i></button>
                </div>
              </div>


            ))}

          </div>
          <div className="text-center">

            <Link to="/products" className="btn-flat btn-hover rounded">
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
