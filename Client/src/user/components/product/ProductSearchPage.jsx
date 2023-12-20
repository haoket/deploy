import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiDomain } from '../../../utils/utilsDomain';

import { ToastContainer, toast } from 'react-toastify';
import { getCategory, getProductBySlug } from "../../../utils/apiCalls";
import axios from 'axios';
//Lấy danh sách sản phẩm
const ProductSearchPage = () => {
  const { name } = useParams();
  const [data, setData] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  //lấy data product by category
  const parseImageLink = (imageLink) => {

    try {
      const imageArray = JSON.parse(imageLink);
      if (Array.isArray(imageArray) && imageArray.length > 0) {
        return imageArray[0];
      }
    } catch (error) {
      console.error('Error parsing ImageLink:', error);
    }
    return null;
  };

  const getProductBySearch = async () => {
    try {
      const data = await axios.get(`${apiDomain}/search=${name}`);
      if (data) {
        setDataProduct(Object.values(data)[0]);
      } else {
        setDataProduct([]);
      }

      console.log('====================================');
      console.log("response", dataProduct);
      console.log('====================================');
    } catch (error) {
      console.error('Error fetching product details:', error);
    }

  };
  useEffect(() => {
    getProductBySearch();
    fetchCategory();



  }, [name]);



  // lấy danh sách danh mục
  const fetchCategory = async () => {
    try {
      const result = await getCategory();
      if (Array.isArray(result)) {
        setData(result);
      } else {
        console.error("Invalid data returned from search");
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };


  return (
    <>

      {/* <!-- products content --> */}
      <div className="bg-main">
        <div className="container">
          <div className="box flex items-center justify-center ">
            <div className="breadcumb text-xl">
              Kết quả tìm kiếm cho '{name}'
            </div>
          </div>
          <div className="box">
            <div className="row">
              <div className="col-3 filter-col" id="filter-col">
                <div className="box">
                  <span className="filter-header">
                    Categories
                  </span>


                  {data.length > 0 && data.map((item, index) => (
                    <ul key={index} className="filter-list text-[#7f7f7f] mx-5 mb-3 tracking-wide">
                      <li className="hover:text-[#f42c37] pl-10  cursor-pointer hover:font-bold"  >
                        <Link to={`/products/${item.slug}`} >
                          {item.Name}
                        </Link>

                      </li>
                    </ul>
                  ))}

                </div>
              </div>
              <div className="col-9 col-md-9">

                <div className="box">
                  <div className="row" id="products">

                    <div className="container">
                      <div className="row" id="latest-products">
                        {dataProduct.map((product, index) => (
                          <div className="col-3 col-md-3 col-sm-12" key={index}>
                            <div className="product-card">
                              <div className="product-card-img">
                                <img src={apiDomain + "/image/" + parseImageLink(product.ImageLink)} alt="" />
                                <img src={apiDomain + "/image/" + parseImageLink(product.ImageLink)} alt="" />
                              </div>
                              <div className="product-card-info">
                                <div className="product-btn">
                                  <Link to={`/product/${product.ID}`}>
                                    <button className="btn-flat btn-hover btn-shop-now">Chi tiết</button>
                                  </Link>
                                  <button className="btn-flat btn-hover btn-cart-add">
                                    <i className='bx bxs-cart-add'></i>
                                  </button>

                                </div>
                                <div className="product-card-name">
                                  {product.Name}
                                </div>
                                <div className="product-card-price">
                                  {/* <span><del>300</del></span> */}
                                  <span className="curr-price">{product.Price}.000 VNĐ</span>
                                </div>
                              </div>
                            </div>

                          </div>
                        ))}

                        {dataProduct.length === 0 && (
                          <p>Không có sản phẩm nào được tìm thấy!</p>
                        )}

                      </div>
                    </div>

                  </div>

                </div>
                <div className="box">
                  <ul className="pagination">
                    <li><a href="#"><i className='bx bxs-chevron-left'></i></a></li>
                    <li><a href="#" className="active">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">5</a></li>
                    <li><a href="#"><i className='bx bxs-chevron-right'></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end products content --> */}






      {/* 
      <div className="sm:flex" >
        <div>
          <div className="flex bg-[#ededed] p-3 rounded-[50px] m-6 ">
            <input
              type="email"
              placeholder="Search Here"
              className="bg-[#ededed] mx-2"
            />
            <button className="bg-[#f42c37] rounded-[50px] py-2 px-2 text-[#ffffff]">
              <FaSearch />
            </button>
          </div>
          <h1 className="font-bold text-1xl mb-3 tracking-wide m-6 cursor-pointer">
            Product Categories <FaCaretDown className={`inline ml-1`} />
          </h1>





          {data.length > 0 && data.map((item, index) => (
            <ul key={index} className="text-[#7f7f7f] mx-5 mb-3 tracking-wide">
              <li className="hover:text-[#f42c37] pl-10  cursor-pointer hover:font-bold"  >
                <Link to={`/products/${item.slug}`} >
                  {item.Name}
                </Link>

              </li>
            </ul>
          ))}
          <hr />
          <h1
            className="font-bold text-1xl tracking-wide m-6 cursor-pointer"
            onClick={togglePrice}
          >
            Choose Price{" "}
            <FaCaretDown
              className={`inline ml-1 ${showPrice ? "transform rotate-180" : ""
                }`}
            />
          </h1>

          {showPrice && <PriceFilter />}
        </div>
        <div className="p-6">
          <div>
            <h1 className="font-bold text-4xl mb-4">Shop</h1>
            <h1 className="text-[#0d0d0d] mb-4">
              Showing 1-9 of 10 results
            </h1>
          </div>




          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 ">



            {dataProduct.map((product, index) => (
              <div key={index} className="flex flex-col gap-2 cursor-pointer select ">
           
                <Link to={`/product/${product.ID}`}>
                  <div className="rounded-[5px] h-[13rem] flex justify-center">
                    <img
                      className="rounded-[10px] h-full object-contain "
                      src={apiDomain + "/image/" + parseImageLink(product.ImageLink)}
                      alt={product.Name}
                    />
                  </div>


                  <h3 className="font-bold hover:text-red-500 transition-all duration-300 px-16  flex items-center">
                    <p className='text-[#5c5c59]'>{product.Name}</p>
                  </h3>
                </Link>
                <div className="relative inline-block group font-bold px-16 ">
                  <span className="inline-block transition-all duration-300 ">
                    <p className='text-[#f42c37]'>{product.Price}.000 VNĐ</p>

                  </span>
                  <ToastContainer />
                  <button
                    className="left-full group-hover:translate-y-0 bg-red-500 text-white rounded-[20px] opacity-0 group-hover:opacity-100 transition-all duration-300"
                    onClick={() => handleAddToCart(product.ID)} 
                  >
                    Add to Cart
                  </button>
                </div>




              </div>


            ))}
          </div>
        </div>
      </div > */}



    </>
  );
};

export default ProductSearchPage;
