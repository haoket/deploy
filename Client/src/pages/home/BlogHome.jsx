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


                <div className="section">
                    <div className="container">
                        <div className="section-header">
                            <h2>Bài viết mới</h2>
                        </div>

                        <div className="blog" >
                            <div className="blog-img">
                                <img src={apiDomain + "/image/" + data[0]?.img} alt="" />
                            </div>
                            <div className="blog-info">
                                <div className="blog-title">
                                    {data[0]?.title}
                                </div>
                                <div className="blog-preview">

                                </div>
                                <Link to={`/blog/${data[0]?.id}`} className="btn-flat btn-hover">Đọc thêm</Link>
                            </div>
                        </div>


                        <div className="blog row-revere">
                            <div className="blog-img">
                                <img src={apiDomain + "/image/" + data[1]?.img} alt="" />
                            </div>
                            <div className="blog-info">
                                <div className="blog-title">
                                    {data[1]?.title}
                                </div>
                                <div className="blog-preview">
                                </div>
                                <Link to={`/blog/${data[1]?.id}`} className="btn-flat btn-hover">Đọc thêm</Link>
                            </div>
                        </div>
                        <div className="section-footer">
                            <Link to='/blog' className="btn-flat btn-hover">Xem tất cả</Link>

                        </div>
                    </div>
                </div>
                {/* <!-- end blogs --> */}
            </>
        );
    };
}


export default BlogHome;