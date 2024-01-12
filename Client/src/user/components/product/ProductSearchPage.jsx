import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Context } from "../../../context/Context";
import { useContext } from "react";
import { apiDomain } from '../../../utils/utilsDomain';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import { getCategory, getProductBySlug } from "../../../utils/apiCalls";
import axios from 'axios';
//Lấy danh sách sản phẩm
const ProductSearchPage = () => {
  const { name } = useParams();
  const [data, setData] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const { setCartItems } = useContext(Context);
  const { user } = useContext(Context);

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
      alert("Hãy đăng nhập rồi thực hiện mua sắm!")
    }


  };

  //lấy data product by category
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
      <ToastContainer />

      {/* <!-- products content --> */}
      <div className="bg-main mt-[50px]">
        <div className="container ">

          <div className="box">
            <div className="row">
              <div className=" col-md-2  col-12 " id="filter-col" style={{ borderRight: '2px solid #e5e5e5' }}>
                <span className="filter-header">
                  Danh mục
                </span>
                <div className="box md:flex-col flex justify-between " >
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
                  <h1 className="text-black mb-3 bg-[#f2f2f2] p-2 mt-5">Lọc <FontAwesomeIcon className="text-red-500" icon="fa-solid fa-filter" /></h1>
                  <select value={selectedOption} id="" onChange={handleSortChange}>
                    <option value="">chọn</option>
                    <option value="price-asc" >
                      Giá thấp đến cao
                    </option>
                    <option value="price-desc">Giá từ cao đến thấp</option>

                  </select>
                </div>
              </div>
              <div className="col-9 col-md-10">

                <div className="box">
                  <div className="row" id="products">
                    <div className="box flex items-center justify-center mt-[20px] ">
                      <div className="breadcumb text-xl">
                        Kết quả tìm kiếm cho '{name}'
                      </div>
                    </div>
                    <div className="container">
                      <div className="row" id="latest-products">
                        {dataProduct.map((product, index) => (

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






    </>
  );
};

export default ProductSearchPage;
