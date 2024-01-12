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
  const user = JSON.parse(localStorage.getItem('user'));
  const [cartItems, setCartItems] = useState([]);
  const { setCartItems: updateItemsCount } = useContext(Context);
  const [totalPrice, setTotalPrice] = useState(0);


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
      const response = await axios.get(`${apiDomain}/cart/${user.id}`);
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

      <section className="section-content bg lg:mt-16 border-top">
        <div className="bg-[#e2e2e2] w-screen p-16  mb-8 ">

          <div className="flex flex-col items-center w-full">
            <h1 className="font-bold lg:text-4xl text-2xl ">Giỏ hàng của bạn</h1>
          </div>
        </div>
        <div className="container">

          <div className="row">
            <main className=" col-12 col-md-8">
              <div className="card wrap table-responsive border-none">
                {!cartItems[0] && <CartFallback />}
                {cartItems && cartItems.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="px-4 py-2">Sản phẩm</th>
                          <th className="px-4 py-2">Số lượng</th>
                          <th className="px-4 py-2">Giá</th>
                          <th className="px-4 py-2 text-center">Xóa</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item, index) => (
                          <tr key={index} className="border-t">
                            <td className="px-4 py-2">
                              <div className="flex items-center">
                                <div className="w-12 h-12 overflow-hidden">
                                  <img src={parseImageLink(item.ImageLink)} className="object-cover w-full h-full" alt={item.Name} />
                                </div>
                                <div className="ml-4">
                                  <h6 className="text-sm font-medium">{item.Name}</h6>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-2">{item.quantity}</td>
                            <td className="px-4 py-2">{item.price}.000VNĐ</td>
                            <td className="px-4 py-2 text-right">
                              <button className="text-red-500 hover:bg-red-700 hover:text-white font-bold py-2 px-4 rounded" onClick={() => handleRemoveItem(item.cart_id)}><i className="bi bi-trash"></i></button>
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
            <aside className="col-12 col-md-4 ">
              <p className="alert alert-success">Nhấn thanh toán để tiếp tục</p>
              <dl className="dlist-align h4">
                <dt>Tổng:</dt>
                <dd className="text-right mr-2"><strong>{totalPrice}.000VNĐ</strong></dd>
              </dl>
              <hr />

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
