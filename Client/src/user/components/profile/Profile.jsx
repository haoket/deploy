import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiDomain } from '../../../utils/utilsDomain';
import { Context } from '../../../context/Context';
import axios from 'axios';
import './Profile.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [Order, setOrders] = useState([]);
    const [detailOrder, setDetailOrder] = useState(null);
    const [nameUser, setNameUser] = useState('');
    const [phoneUser, setPhoneUser] = useState('');
    const [addressUser, setAddressUser] = useState('');
    const [emailUser, setEmailUser] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const dUpdate = {
        name: nameUser,
        phone: phoneUser,
        address: addressUser,
        email: emailUser
    }

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

    const formatDateString = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    };
    const getOrdersByStatus = async () => {
        try {
            const response = await axios.get(`${apiDomain}/getOrderByIDCustomer`, {
                params: {
                    id: user.id,
                },
            });
            setOrders(response.data.sort((a, b) => b.ID - a.ID));
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        getOrdersByStatus();
        getInforUser();
    }, []);

    const handleViewDetail = (item) => {
        setDetailOrder((prevDetailOrder) => (prevDetailOrder === item.ID ? null : item.ID));
    };


    const handleUpdateStatus = async (orderId) => {
        const confirmed = window.confirm('Bạn có chắc chắn muốn hủy đơn hàng không?');

        if (confirmed) {
            try {
                // Gọi API /updatestatus với tham số orderId và status là 3
                const response = await axios.put(`${apiDomain}/update-orders-status/${orderId}`, {
                    status: 3,
                });


                // Kiểm tra và xử lý response từ API nếu cần
                console.log(response.data);

                toast.success(`Hủy đơn hàng thành công`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })

                // Cập nhật lại danh sách đơn hàng sau khi hủy
                getOrdersByStatus();
            } catch (error) {
                console.error("Error updating order status:", error);
                toast.error(`Đã xảy ra lỗi khi hủy đơn hàng`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        }
    };

    const getInforUser = async () => {
        try {
            const response = await axios.get(`${apiDomain}/users/${user.id}`);
            setNameUser(response.data.name);
            setPhoneUser(response.data.phone);
            setAddressUser(response.data.address);
            setEmailUser(response.data.email);

        } catch (error) {
            console.error("Error fetching user information:", error);
        }
    }




    const handleUpdateProfile = async () => {

        try {
            // Gọi API /updateprofile với tham số editUserInfo
            const response = await axios.put(`${apiDomain}/users/${user.id}`, dUpdate);
            if (response.data) {
                toast.success(`Cập nhật thông tin thành công`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setIsEditModalOpen(false);
                getInforUser();

            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    }

    return (
        <div className='px-10 lg:px-40'>

            <ToastContainer />
            <div>
                <h1 className=' text-3xl mt-3'>
                    Quản lý tài khoản
                    <span
                        className='text-red-600 text-[14px] cursor-pointer'
                        onClick={() => setIsEditModalOpen(true)}
                    >
                        Chỉnh sửa
                    </span>
                </h1>

                {/* Modal chỉnh sửa */}
                {isEditModalOpen && (
                    <div className='fixed inset-0 flex items-center justify-center z-50'>
                        <div className='fixed inset-0 bg-gray-500 z-[-1] bg-opacity-75'></div>

                        <div className='bg-white p-6 rounded-lg'>
                            <h2 className='text-xl font-bold mb-4'>Chỉnh sửa thông tin người dùng</h2>
                            <div className='mb-4'>
                                <label className='block text-gray-700 font-bold mb-2' htmlFor='name'>
                                    Tên khách hàng
                                </label>
                                <input
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='name'
                                    type='text'
                                    value={nameUser}
                                    onChange={(e) =>
                                        setNameUser(e.target.value)
                                    }
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-700 font-bold mb-2' htmlFor='email'>
                                    Địa chỉ email
                                </label>
                                <input

                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='email'
                                    type='text'
                                    value={emailUser}
                                    onChange={(e) =>
                                        setEmailUser(e.target.value)
                                    }
                                />
                            </div>
                            <div className='mb-4'>
                                <label

                                    className='block text-gray-700 font-bold mb-2'
                                    htmlFor='address'
                                >
                                    Địa chỉ nhận hàng
                                </label>
                                <input

                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='address'
                                    type='text'
                                    value={addressUser}
                                    onChange={(e) =>
                                        setAddressUser(e.target.value)
                                    }
                                />
                            </div>
                            <div className='mb-4'>
                                <label

                                    className='block text-gray-700 font-bold mb-2'
                                    htmlFor='phone'
                                >
                                    Số điện thoại
                                </label>
                                <input

                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='phone'
                                    type='text'
                                    value={phoneUser}
                                    onChange={(e) =>
                                        setPhoneUser(e.target.value)
                                    }
                                />
                            </div>
                            <div className='flex justify-end'>
                                <button
                                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                                    type='button'
                                    onClick={handleUpdateProfile}
                                >
                                    Lưu
                                </button>
                                <button onClick={() => setIsEditModalOpen(false)}>Đóng</button>
                            </div>
                        </div>
                    </div>


                )}
                {/* end modal chinh sua */}

                <div className='flex flex-row justify-around gap-2'>




                    <div className='w-1/3 border bg-gray-100 p-4 '>
                        <Link to='/change-password' className='text-blue hover:underline cursor-pointer'>Thay đổi mật khẩu</Link>
                        <h1 className='font-bold mt-4'>Thông tin cá nhân </h1>
                        <p>{nameUser}</p>
                        <div>
                            <h1 className='font-bold'>Địa chỉ email</h1>
                            <p>{emailUser}</p>
                        </div>
                    </div>
                    <div className='row-9 w-2/3  border-2 rounder-2xl   bg-gray-100 p-4'>
                        <div className='flex  flex-col'>
                            <h1 className='font-bold'>Sổ địa chỉ: </h1>
                            <div>
                                <h1 className='font-bold'>Địa chỉ nhận hàng</h1>
                                <p>{addressUser}</p>
                            </div>
                            <div>
                                <h1 className='font-bold'>Số điện thoại</h1>
                                <p>0{phoneUser}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className='mt-10 '>
                <h1 className='font-bold text-xl '>Đơn hàng gần đây</h1>

                {Order && Order.map((item, index) => (
                    <div className={`mt-10 relative ${detailOrder === item.ID ? 'active' : ''}`} key={index}>
                        {detailOrder === item.ID && (
                            <div className={`mt-[150px] order-details ${detailOrder === item.ID ? 'active' : ''}`}>
                                <div>
                                    <p className='font-bold text-xl'>Chi tiết đơn hàng</p>

                                    <p>Mã đơn hàng {item.ID}</p>
                                    <p>
                                        Ngày đặt hàng: {formatDateString(item.date_create)}
                                    </p>

                                    <p>Tình trạng đơn hàng: {item.Status === '0' ? "Đang xử lý" :
                                        item.Status === '1' ? "Đang giao" :
                                            item.Status === '2' ? "Đã giao" :
                                                "Đã hủy"
                                    }
                                    </p>
                                    {item.isPaid == 1 ? <p>Trạng thái thanh toán: Đã thanh toán</p> : <p>Trạng thái thanh toán: Chưa thanh toán</p>}


                                    <table className="table table-hover shopping-cart-wrap ">
                                        <thead className="text-muted">
                                            <tr>
                                                <th scope="col">Sản phẩm</th>
                                                <th scope="col">Số lượng</th>
                                                <th scope="col">Giá</th>
                                            </tr>
                                        </thead>
                                        {item.products.map((product, index) => (
                                            <tbody key={index}>
                                                <tr>
                                                    <td>
                                                        <figure className="media">
                                                            <div className="img-wrap"><img src={apiDomain + "/image/" + parseImageLink(product.img)} className="img-thumbnail img-sm" /></div>
                                                            <figcaption className="media-body">
                                                                <h6 className="title text-truncate"> </h6>
                                                            </figcaption>
                                                        </figure>
                                                    </td>
                                                    <td>
                                                        <span>Số lượng:{product.Quantity}</span>
                                                    </td>
                                                    <td>
                                                        <div className="price-wrap">
                                                            <var className="price">{product.Price}.000VNĐ</var>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>

                                        ))}
                                    </table>
                                    <div className='flex justify-between'>
                                        <div>
                                            <button className='border-2 px-2 bg-green-300 rounded hover:bg-green-600' onClick={() => handleViewDetail(item)}> đóng</button>
                                        </div>
                                        <div>
                                            {item.Status === "0" && item.isPaid === 0 && (
                                                <button className='border-2 px-2 bg-red-300 rounded hover:bg-red-600' onClick={() => handleUpdateStatus(item.ID)}>Hủy đơn hàng</button>
                                            )}
                                        </div>


                                    </div>
                                </div>
                            </div>
                        )}
                        <p scope="col" key={index}>
                            Mã đơn hàng {item.ID}  <button className='border-2 px-2 rounded hover:bg-green-600' onClick={() => handleViewDetail(item)} >Xem chi tiết</button>
                        </p>

                        <table className={`table table-hover shopping-cart-wrap ${detailOrder === item.ID ? 'active' : ''}`}>
                            <thead className="text-muted">
                                <tr>
                                    <th scope="col">Sản phẩm</th>
                                    <th scope="col">Số lượng</th>
                                    <th scope="col">Giá</th>
                                </tr>
                            </thead>
                            {item.products.map((product, index) => (
                                <tbody key={index}>
                                    <tr>
                                        <td>
                                            <figure className="media">
                                                <div className="img-wrap"><img src={apiDomain + "/image/" + parseImageLink(product.img)} className="img-thumbnail img-sm" /></div>
                                                <figcaption className="media-body">
                                                    <h6 className="title text-truncate"> </h6>
                                                </figcaption>
                                            </figure>
                                        </td>
                                        <td>
                                            <span>Số lượng:{product.Quantity}</span>
                                        </td>
                                        <td>
                                            <div className="price-wrap">
                                                <var className="price">{product.Price}.000VNĐ</var>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
}
