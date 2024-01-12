import React from 'react'
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { apiDomain } from "../../../utils/utilsDomain";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "../../../context/Context";
import { Navigate, useNavigate } from 'react-router-dom';
import { PayPalButton } from "react-paypal-button-v2";
import { delay } from 'framer-motion';
export const Order = () => {
    const { setCartItems } = useContext(Context);
    const { cartItems, } = useContext(Context);;
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [method_payment, setMethod_payment] = useState('COD');
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const date_create = new Date();
    const [sdkReady, setSdkReady] = useState(false);
    const [isPaid, setIsPaid] = useState(0);
    const [date_payment, setDate_payment] = useState('');


    const navigate = useNavigate();


    const dataOder = {
        CustomerID: user.id,
        TotalAmount: totalPrice,
        name: name,
        address: address,
        email: user.email,
        method_payment: method_payment,
        message: message,
        phone: phone,
        date_create: date_create,
        isPaid: isPaid,
        date_payment: date_payment

    }

    const onSuccess = async (paymentResult) => {

        if (paymentResult.status === "COMPLETED") {
            setDate_payment(paymentResult.create_time);
            createOrderPaypal(); // Chờ cho createOrder() hoàn thành trước khi chuyển sang bước tiếp theo


        }
    }


    const getInfoUser = async () => {

        const { data } = await axios.get(`${apiDomain}/users/${user.id}`);
        setPhone(data.phone);
        setName(data.name);
        setAddress(data.address);

    }

    const MemoizedPayPalButton = React.memo(() => (
        <PayPalButton
            amount={totalPrice}
            onSuccess={onSuccess}
        />
    ));

    const createOrderPaypal = async () => {
        try {
            const dataP = {
                CustomerID: user.id,
                TotalAmount: totalPrice,
                name: name,
                address: address,
                email: user.email,
                method_payment: method_payment,
                message: message,
                phone: phone,
                date_create: date_create,
                isPaid: 1,
                date_payment: date_payment

            }
            const idPayment = await axios.post(`${apiDomain}/create-order`, dataP);
            const id = idPayment.data;

            for (const item of cartItems) {
                const data = {
                    ProductID: item.ID,
                    OrderID: id,
                    Price: item.price,
                    Quantity: item.quantity,
                }

                await axios.post(`${apiDomain}/create-order-item`, data);
                await axios.post(`${apiDomain}/update-product-quantity`, {
                    productID: item.ID,
                    quantitySold: item.quantity,
                });
            }

            toast.success(`Đặt hàng thành công`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            await axios.delete(`${apiDomain}/delete-cart/${user.id}`);
            setCartItems([]);

            setTimeout(() => {
                navigate("/profile"); // Chuyển hướng sau 2 giây
            }, 2000);
        } catch (error) {
            console.error('Lỗi khi đặt hàng:', error);
            // Hiển thị thông báo lỗi cho người dùng
            toast.error('Có lỗi xảy ra khi đặt hàng', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
    const createOrder = async () => {
        try {
            const idPayment = await axios.post(`${apiDomain}/create-order`, dataOder);
            const id = idPayment.data;

            for (const item of cartItems) {
                const data = {
                    ProductID: item.ID,
                    OrderID: id,
                    Price: item.price,
                    Quantity: item.quantity,
                }

                await axios.post(`${apiDomain}/create-order-item`, data);
                await axios.post(`${apiDomain}/update-product-quantity`, {
                    productID: item.ID,
                    quantitySold: item.quantity,
                });
            }

            toast.success(`Đặt hàng thành công`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            await axios.delete(`${apiDomain}/delete-cart/${user.id}`);
            setCartItems([]);

            setTimeout(() => {
                navigate("/profile"); // Chuyển hướng sau 2 giây
            }, 2000);
        } catch (error) {
            console.error('Lỗi khi đặt hàng:', error);
            // Hiển thị thông báo lỗi cho người dùng
            toast.error('Có lỗi xảy ra khi đặt hàng', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
    //lấy hình ảnh đầu tiên của mảng
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
    // Function to get the cart items using Axios
    const getCartItems = async () => {
        try {
            const response = await axios.get(`${apiDomain}/cart`);

            setCartItems(response.data);
            updateItemsCount(response.data);
            setIsLoading(false);

        } catch (error) {
            console.error("Error fetching cart items:", error);
            setIsLoading(false);
        }



    };

    useEffect(() => {
        getCartItems();

        calculateTotalPrice();
        getInfoUser();

    }, [isLoading]);





    // tính toán tổng tiền
    const calculateTotalPrice = () => {
        if (!isLoading) { // Kiểm tra nếu dữ liệu đã sẵn sàng
            const totalPrice = cartItems.reduce(
                (sum, item) => sum + (item.price || 0),
                0
            );
            setTotalPrice(totalPrice);
        }
    };
    const addPaypalScript = async () => {
        const { data } = await axios.get(`${apiDomain}/payment/config`);
        console.log('====================================');
        console.log(data);
        console.log('====================================');
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${data.data}`;
        script.async = true;
        script.onload = () => {
            setSdkReady(true);

        }
        document.body.appendChild(script);

    }

    useEffect(() => {
        if (!window.paypal) {
            addPaypalScript();
        } else {
            setSdkReady(true);
        }
    })

    return (

        <div className='flex flex-col ml-[30px] sm:px-[20px] lg:mt-[55px] md:mt-[-10px] mt-[-25px] lg:px-[8%] '>
            <div className=' text-[13px] sm:text-[20px] py-4 text-center text-red-500'>Quý khách vui lòng xác nhận thông tin chính xác trước khi đặt hàng</div>
            <ToastContainer />
            <div className="row">
                <div className="col-12 col-md-6 wrap p-2  rounded-md ml-[-17px]  ">

                    <div className='border-2 bg-gray-100 rounded-md p-4 border-yellow-300'>
                        <h1 className='font-bold text-xl'>Thông tin thanh toán:</h1>
                        <hr className='border-2 ' />
                        <p className='font-bold'>Tên khách hàng</p>
                        <input type="text" className='border border-gray rounded-md w-full px-2 py-1' value={name} onChange={(e) => setName(e.target.value)} />

                        <p className='font-bold'>Số điện thoại nhận hàng</p>
                        <input type="text" pattern='[0-9]{10}' className='border border-gray rounded-md w-full px-2 py-1' value={phone} onChange={(e) => setPhone(e.target.value)} />

                        <p className='font-bold'>Địa chỉ nhận hàng</p>
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className='border border-gray rounded-md w-full px-2 py-1' />

                    </div>

                    <div className='border-2 bg-gray-100 rounded-md p-4 mt-4 border-yellow-300'>
                        <table className=''>

                            <thead>
                                <tr className='' >
                                    <th><p className='text-left '>Sản phẩm</p></th>
                                    <th><p className='text-center'>Đơn giá</p></th>
                                    <th><p className='text-left'>Số lượng</p></th>
                                    <th><p className='text-right'>Thành tiền</p></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.cart_id}>
                                        <td className='flex p-2 '>
                                            <img width={"10%"} height={"10%"} src={parseImageLink(item.ImageLink)} alt={item.Name} />
                                            <p className='text-left text-[10px] lg:text-[13px] flex '>{item.Name}</p>
                                        </td>
                                        <td><p className='text-center  text-[10px] lg:text-[13px]'>{item.price / item.quantity}.000 VNĐ</p></td>
                                        <td><p className='text-left  text-[10px] lg:text-[13px]'>{item.quantity}</p></td>
                                        <td><p className='text-right  text-[10px] lg:text-[13px]'>{item.price}.000 VNĐ</p></td>
                                    </tr>
                                ))}


                                <tr className=''>

                                    <td><p className='text-left m-2 mt-4' onChange={(e) => setMessage(e.target.value)}> <p className='font-bold'>Lời nhắn</p>
                                        <input type="text" className='border border-black rounded-md w-full px-2 py-1 ml-4' /></p>

                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={4}><p className='text-right'><span className='font-bold'>Tổng tiền:</span> {totalPrice}.000 VNĐ</p> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className=" flex  flex-col col-12 col-md-6 overflow-hidden bg-gray-100 border-2 border-blue-300 mt-2 h-[220px] sm:h-[270px] md:h-[245px] lg:h-[240px] rounded-md p-3 ml-[-17px] md:ml-0">
                    <div><p className='font-bold '>Phương thức thanh toán</p></div>
                    <select name="method_payment" onChange={(e) => setMethod_payment(e.target.value)} className='border border-gray rounded-md w-full px-2 py-1 mt-4 mb-4'>
                        <option value="COD" >Thanh toán khi nhận hàng</option>
                        <option value="paypal">PayPal</option>

                    </select>

                    {method_payment === "paypal" && sdkReady ? (

                        <MemoizedPayPalButton className='z-[-12]' />

                    ) : (
                        <button onClick={createOrder} className='rounded-md bg-red-500 w-80 hover:bg-red-700 text-white px-8 py-6 mt-6 text-[#666666] rounded-1xl cursor-pointer center' >Đặt hàng</button>
                    )}

                </div>
            </div>

        </div>
    )
}
s