import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { apiDomain } from "../../../utils/utilsDomain";
import CartFallback from "./FallBack";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "../../../context/Context";
import '../../../css/cart/bootstrap.css'
import '../../../css/cart/responsive.css'
import '../../../css/cart/ui.css'


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { setCartItems: updateItemsCount } = useContext(Context);
  const [totalPrice, setTotalPrice] = useState(0);

  // const getapi = async () => {
  //   const response = axios.get(`https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=1`);
  //   console.log('====================================');
  //   console.log(response.data);
  //   console.log('====================================');
  // }

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
  const getCartItems = async () => {
    try {
      const response = await axios.get(`${apiDomain}/cart`);
      setCartItems(response.data);
      updateItemsCount(response.data)
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
  useEffect(() => {
    getCartItems();
    console.log(cartItems);

  }, []);
  const handleRemoveItem = async (cartItemId) => {
    try {

      await axios.delete(`${apiDomain}/cart/${cartItemId}`);
      getCartItems();
      const removedItem = cartItems.find((item) => item.cart_id === cartItemId);
      toast.success(`${removedItem.Name} has been removed from the cart.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      console.log(cartItems)
      const totalPrice = cartItems.reduce(
        (sum, item) => sum + (item.price || 0),
        0
      );
      return totalPrice;
    };
    setTotalPrice(calculateTotalPrice());
  }, [cartItems]);

  return (
    <>
      <ToastContainer />

      <section className="section-content bg padding-y border-top">
        <div className="bg-[#e2e2e2] w-screen p-16  mb-8 ">

          <i className="flex flex-col items-center w-full">
            <h1 className="font-bold text-4xl ">Giỏ hàng của bạn</h1>
          </i>
        </div>
        <div className="container">

          <div className="row">
            <main className=" col-12 col-md-8">


              <div className="card wrap table-responsive border-none">
                {!cartItems[0] && <CartFallback />}
                {cartItems && (
                  <div class="overflow-x-auto">
                    <table class="min-w-full table-auto">
                      <thead class="bg-gray-200">
                        <tr>
                          <th class="px-4 py-2">Sản phẩm</th>
                          <th class="px-4 py-2">Số lượng</th>
                          <th class="px-4 py-2">Giá</th>
                          <th class="px-4 py-2 text-right">Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item, index) => (
                          <tr key={index} class="border-t">
                            <td class="px-4 py-2">
                              <div class="flex items-center">
                                <div class="w-12 h-12 overflow-hidden">
                                  <img src={apiDomain + "/image/" + parseImageLink(item.ImageLink)} class="object-cover w-full h-full" alt={item.Name} />
                                </div>
                                <div class="ml-4">
                                  <h6 class="text-sm font-medium">{item.Name}</h6>
                                </div>
                              </div>
                            </td>
                            <td class="px-4 py-2">{item.quantity}</td>
                            <td class="px-4 py-2">{item.price}.000VNĐ</td>
                            <td class="px-4 py-2 text-right">
                              <button class="text-red-500 hover:bg-red-700 hover:text-white font-bold py-2 px-4 rounded" onClick={() => handleRemoveItem(item.cart_id)}><i className="bi bi-trash"></i></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

              </div>
              {/* <!-- card.// --> */}

            </main>
            {/* <!-- col.// --> */}
            <aside className="col-12 col-md-4">
              <p className="alert alert-success">Nhấn thanh toán để tiếp tục</p>
              {/* <dl class="dlist-align">
                <dt>Total price: </dt>
                <dd class="text-right">USD 568</dd>
              </dl> */}
              {/* <dl class="dlist-align">
                <dt>Discount:</dt>
                <dd class="text-right">USD 658</dd>
              </dl> */}
              <dl className="dlist-align h4">
                <dt>Tổng:</dt>
                <dd className="text-right"><strong>{totalPrice}.000VNĐ</strong></dd>
              </dl>
              <hr />
              {/* <figure class="itemside mb-3">
                <aside class="aside"><img src="images/icons/pay-visa.png" /></aside>
                <div class="text-wrap small text-muted">
                  Pay 84.78 AED ( Save 14.97 AED ) By using ADCB Cards
                </div>
              </figure>
              <figure class="itemside mb-3">
                <aside class="aside"> <img src="images/icons/pay-mastercard.png" /> </aside>
                <div class="text-wrap small text-muted">
                  Pay by MasterCard and Save 40%.
                  <br /> Lorem ipsum dolor
                </div>
              </figure> */}
              <button className="btn btn-success btn-lg btn-block ">   <Link to="/create-order"> Thanh Toán</Link>
              </button>
            </aside>
            {/* <!-- col.// --> */}
          </div>

        </div>
        {/* <!-- container .//  --> */}
      </section>
    </>
  );
};

export default Cart;
