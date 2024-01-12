import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getBlog, getProducts } from '../../utils/apiCalls';
import { apiDomain } from '../../utils/utilsDomain';




const BlogHome = () => {
    const [data, setData] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const numberOfProducts = 20;
    const displayedProducts = data.slice(0, numberOfProducts);



    const fetchProducts = async () => {
        const dataB = await getBlog();
        setData(dataB);
        console.log('====================================');
        console.log("dataB", dataB);
        console.log('====================================');

    };

    useEffect(() => {
        fetchProducts();

    }, []);


    if (data) {

        return (
            <>

                {/* <!-- blogs --> */}


                <div className="section mt-[-200px]">
                    <div className="container">
                        <div className="section-header">
                            <h2>Bài viết mới</h2>
                        </div>

                        <div className=" flex p-2" >
                            <div className="">
                                < img src={apiDomain + "/image/" + data[0]?.img} alt="" />
                            </div>
                            <div className=" flex align-center flex-col justify-center p-2">
                                <div >
                                    <h1 className=" font-bold sm:text-lg md:text-[25px] md:p-10"> {data[0]?.title}</h1>
                                </div>

                                <Link to={`/blog/${data[0]?.id}`} className="btn-flat btn-hover flex justify-center rounded"><p className='text-center'>Đọc thêm</p></Link>
                            </div>
                        </div>


                        <div className=" flex row-revere p-2" >
                            <div >
                                < img className="rounded" src={apiDomain + "/image/" + data[1]?.img} alt="" />
                            </div>
                            <div className=" flex align-center flex-col justify-center p-2">
                                <div >
                                    <h1 className=" font-bold sm:text-lg md:text-[25px] md:p-10"> {data[1]?.title}</h1>
                                </div>

                                <Link to={`/blog/${data[0]?.id}`} className="btn-flat btn-hover flex justify-center rounded"><p className='text-center'>Đọc thêm</p></Link>
                            </div>
                        </div>

                        <div className=" center flex justify-center">
                            <Link to='/blog' className="btn-flat btn-hover rounded">Xem tất cả</Link>

                        </div>
                    </div>
                </div>
                {/* <!-- end blogs --> */}
            </>
        );
    };
}


export default BlogHome;