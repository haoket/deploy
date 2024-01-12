import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiDomain } from "../../../utils/utilsDomain";
import { Link } from "react-router-dom";

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [modelEdit, setModelEdit] = useState(false);
    const [modelView, setModelView] = useState(false);
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [Order, setOrders] = useState([]);
    const [orderCounts, setOrderCounts] = useState([]);
    const [keyword, setKeyword] = useState('');

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${apiDomain}/users`);

            setUsers(response.data.filter(user => user.role === 'user')); // Pass the response data to setUsers
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    const fetchOrderCount = async (id) => {
        try {
            const response = await axios.get(`${apiDomain}/getOrderByIDCustomer`, {
                params: {
                    id: id,
                },
            });
            // Lưu số đơn hàng vào mảng orderCounts
            setOrderCounts((prevCounts) => ({ ...prevCounts, [id]: response.data.length }));
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };



    const handleOpenEdit = async (id) => {
        setModelEdit(true);
        const { data } = await axios.get(`${apiDomain}/users/${id}`);
        setName(data.name);
        setPhone(data.phone);
        setAddress(data.address);
        setEmail(data.email);
        setId(data.id);



    };
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


    const handleEditUser = async (id) => {
        const data = await axios.put(`${apiDomain}/users/${id}`, {
            name: name,
            phone: phone,
            address: address,
            email: email
        });
        fetchUsers();
        setModelEdit(false);
    }
    const handleOpenView = async (id) => {

        setModelView(true);
        const response = await axios.get(`${apiDomain}/getOrderByIDCustomer`, {
            params: {
                id: id,
            },
        });
        setOrders(response.data);


    }



    useEffect(() => {
        fetchUsers();
    }, []);
    useEffect(() => {
        // Gọi hàm bất đồng bộ khi component được mount hoặc id thay đổi
        users.forEach((user) => {
            fetchOrderCount(user.id);
        });
    }, [users]);



    return (
        <div className="container px-4 ">
            {modelEdit && (
                <div className='fixed inset-0 flex items-center justify-center z-50'>
                    <div className='fixed inset-0 bg-gray-500 z-[2] bg-opacity-75'></div>

                    <div className='bg-white p-6 rounded-lg z-[3]'>
                        <h2 className='text-xl font-bold mb-4'>Chỉnh sửa thông tin người dùng</h2>
                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2' htmlFor='name'>
                                Tên khách hàng
                            </label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='name'
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2' htmlFor='email'>
                                Email
                            </label>
                            <input

                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='email'
                                type='text'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}

                            />
                        </div>
                        <div className='mb-4'>
                            <label

                                className='block text-gray-700 font-bold mb-2'
                                htmlFor='address'
                            >
                                Địa chỉ
                            </label>
                            <input

                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='address'
                                type='text'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
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
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className='flex justify-end'>
                            <button
                                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                                type='button'
                                onClick={() => handleEditUser(id)}

                            >
                                Lưu
                            </button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => setModelEdit(false)}>Đóng</button>
                        </div>
                    </div>
                </div>


            )}
            {modelView && (
                <div className='fixed inset-0 flex items-center justify-center z-50'>
                    <div className='fixed inset-0 bg-gray-500 z-[2] bg-opacity-75'></div>

                    <div className='bg-white p-6 rounded-lg z-[1000] w-2/3 '>
                        <h2 className='text-xl font-bold mb-4'>Danh sách đơn hàng đã đặt</h2>
                        {Order == 0 && (
                            <div>Khách hàng chưa có đơn đặt hàng</div>
                        )}

                        {Order != 0 && (
                            <div className="h-[500px]  overflow-scroll">
                                <h1>Số đơn hàng đã đặt: {Order.length}</h1>
                                {Order.map((item, index) => (

                                    <div className={`mt-10 relative active`} key={index}>

                                        <p scope="col" key={index}>
                                            Mã đơn hàng {item.ID}
                                        </p>

                                        <table className={`table table-hover shopping-cart-wrap active`}>
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
                                                                <div className="img-wrap"><img src={parseImageLink(product.img)} className="img-thumbnail img-sm" /></div>
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
                        )}


                        <div className="w-full flex justify-end mt-3">
                            <button className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => setModelView(false)}>Đóng</button>
                        </div>
                    </div>
                </div>


            )}
            <div className="mb-4 mt-10 px-4">
                <nav style={{ "--bs-breadcrumb-divider": ">" }} aria-label="breadcrumb">
                    <div className="d-md-flex gap-4 align-items-center">
                        <form className="mb-3 mb-md-0">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <select className="form-select" >
                                        <option value="">...</option>
                                        <option value="desc">Tăng</option>
                                        <option value="asc">Giảm</option>

                                    </select>
                                </div>
                                <div className="col-md-6  flex">
                                    <div className="input-group  ">
                                        <input
                                            type="text"
                                            className=" form-control"
                                            placeholder="Tìm kiếm"


                                        />
                                    </div>
                                    <div width="100px">
                                        {keyword && (
                                            <button className=" font-bold  p-[3px] rounded absolute right-10 " type="button" >
                                                <i className="bi bi-x"></i>
                                            </button>


                                        )}

                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-[9px] ml-1 rounded" type="button" >

                                            <i className="bi bi-search text-sm"></i>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                </nav>
            </div>
            <h1 className="text-2xl font-bold mb-2 text-center text-gray-800 py-2 px-4">
                Danh sách khách hàng
            </h1>
            <table className="table-auto w-full border">
                <thead>
                    <tr>
                        <th className="px-4 py-2  text-left bg-gray-100 border">ID</th>
                        <th className="px-4 py-2  text-left bg-gray-100 border">Tên khách hàng</th>
                        <th className="px-4 py-2  text-left bg-gray-100 border">Email</th>
                        <th className="px-4 py-2  text-left bg-gray-100 border">Số điện thoại</th>
                        <th className="px-4 py-2  text-left bg-gray-100 border">Địa chỉ</th>
                        <th className="px-4 py-2  text-left bg-gray-100 border">Số đơn đặt hàng</th>

                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="px-4 py-2 border">{user.id}</td>
                            <td className="px-4 py-2 border">{user.name}</td>
                            <td className="px-4 py-2 border">{user.email}</td>
                            <td className="px-4 py-2 border">{user.phone}</td>
                            <td className="px-4 py-2 border">{user.address}</td>
                            <td className="px-4 py-2 border">{orderCounts[user.id]}</td>
                            <td className="px-4 py-2 border ">
                                <div className=" flex gap-2">
                                    <button onClick={() => handleOpenView(user.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"><i className="bi bi-view-stacked"></i></button>

                                    <button onClick={() => handleOpenEdit(user.id)} className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">   <i className="bi bi-pencil-square"></i></button>

                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
