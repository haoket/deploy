import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../../../context/Context";
import { ToastContainer, toast } from 'react-toastify';
import { apiDomain } from '../../../utils/utilsDomain';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCategory, getProducts, getProductsPriceDesc, getProductsPriceAsc } from "../../../utils/apiCalls";
import Loading from "../amination/Loading";
import axios from "axios";
import Suggest from "./Suggest";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const { setCartItems } = useContext(Context);
  const { user } = useContext(Context);
  const [selectedOption, setSelectedOption] = useState('');
  const [isModalOpen, setOpenModal] = useState(false);
  const fetchProducts = async () => {
    const data = await getProducts();
    setDataProduct(data);
  };
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

  const handleSortChange = (event) => {
    // Lấy giá trị được chọn từ thẻ select và set vào state
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    switch (selectedValue) {
      case 'price-asc':
        setDataProduct([...dataProduct].sort((a, b) => a.Price - b.Price));
        break;
      case 'price-desc':
        setDataProduct([...dataProduct].sort((a, b) => b.Price - a.Price));
        break;
      default:
        // Nếu không có case nào khớp, không làm gì cả
        break;
    }
  };
  // handle add to cart




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

  const fetchCategory = async () => {
    try {
      const result = await getCategory();
      if (Array.isArray(result)) {
        setData(result);
      } else {
        console.error("Invalid data returned from getCategory");
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchProducts();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Calculate the index of the last product on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  // Calculate the index of the first product on the current page
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // Get the current products to display
  const currentProducts = dataProduct.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Nếu bạn muốn có hiệu ứng cuộn mượt
    });
  };

  return (
    <>

      <ToastContainer />
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
      <div className="bg-main mt-2">
        <div className="container">
          <div className="box">
            <div className="breadcumb">
              <Link to="/">Trang chủ</Link>
              <span><i className='bx bxs-chevrons-right'></i></span>
              <a href="#">Tất cả sản phẩm</a>
            </div>
          </div>
          <div className="box">
            <div className="row">
              {/* nav danh mục */}

              <div className=" col-md-2  col-12 " id="filter-col">
                <div className="border border-[#f2f2f2] bg-pink-200 rounded-lg p-2 text-center">
                  <span className="font-bold center w-full  ">
                    Danh mục
                  </span>
                  <div className="box md:flex-col flex justify-between text-center mt-2" >
                    {data.length > 0 && data.map((item, index) => (
                      <ul key={index} className="flex  text-[#7f7f7f] mb-3 ">
                        <li className="hover:text-[#f42c37]  cursor-pointer hover:font-bold"  >
                          <Link to={`/products/${item.slug}`} >
                            {item.Name}
                          </Link>
                        </li>
                      </ul>
                    ))}
                  </div>
                  <div>
                    <h1 className="text-black mb-3 bg-[#f2f2f2] rounded-lg p-2 mt-5 font-bold text-md">Lọc <FontAwesomeIcon className="text-red-500" icon="fa-solid fa-filter" /></h1>
                    <select className="border border-[#f2f2f2] rounded-lg p-2 text-[10px] w-full" value={selectedOption} id="" onChange={handleSortChange}>
                      <option value="">Lựa chọn</option>
                      <option value="price-asc" >
                        Giá thấp đến cao
                      </option>
                      <option value="price-desc">Giá từ cao đến thấp</option>

                    </select>
                  </div>
                </div>
              </div>


              {/* hiển thị sản phẩm */}
              <div className="col-12 col-md-10">
                {loading ? (
                  <Loading />
                ) : (
                  <div className="box">
                    <div className="row" id="products">

                      <div className="container">
                        <div className="row" id="latest-products">
                          {currentProducts.map((product, index) => (

                            <div className="col-6 col-md-3 listproduct ">

                              <img className="image-product" src={parseImageLink(product.ImageLink)[0]} alt="" />
                              {product.Quantity === 0 &&
                                <img className='label-new' src="https://png.pngtree.com/png-clipart/20230806/original/pngtree-sold-out-blue-red-rubber-vector-picture-image_9913566.png" alt="" />
                              }
                              <div className="font-medium md:pt-4 pt-2">
                                <p className='md:text-[15px] text-center'>{product.Name}</p>
                                <p className='text-center md:text-[18px] text-red'>{product.Price}.000 VNĐ</p>
                              </div>
                              <div className="btn-product">
                                <Link to={`/product/${product.ID}`} className='btn-view-product'>
                                  <button className=""><i className="bi bi-search  hover:text-blue-500 text-2xl "></i></button>
                                </Link>
                                {product.Quantity != 0 &&
                                  <button className='' onClick={() => handleAddToCart(product.ID, product.Price, product.Name)}><i className="bi bi-cart-plus hover:text-blue-500 text-2xl "></i></button>
                                }
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="box">
                  <ul className="pagination">
                    <li>
                      <button onClick={() => paginate(currentPage - 1)}><i className="bx bx-chevron-left"></i></button>
                    </li>
                    {Array.from({ length: Math.ceil(dataProduct.length / productsPerPage) }, (_, index) => (
                      <li key={index} className={currentPage === index + 1 ? "active bg-blue-300 rounded-lg " : ""}>
                        <a style={{ border: "none" }} href="#" onClick={() => {
                          paginate(index + 1);
                        }} className="pr-2 hover:border-none">
                          {index + 1}
                        </a>
                      </li>
                    ))}
                    <li>
                      <button onClick={() => paginate(currentPage + 1)}><i className="bx bx-chevron-right"></i></button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div >
        </div >
      </div >
      <Suggest />

    </>
  );
};

export default ProductList;
