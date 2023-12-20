import React, { useEffect, useState } from 'react';
import './Blog.css';
import { getBlog } from '../../utils/apiCalls';
import { Link } from 'react-router-dom';
import { apiDomain } from '../../utils/utilsDomain';
import { delay, motion } from 'framer-motion';
import Loading from '../../user/components/amination/Loading';


const Blog = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Thêm state cho trạng thái loading



    const formatDateString = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    };

    const fetchBlog = async () => {
        try {
            const fetchedData = await getBlog();
            setData(fetchedData);
        } catch (error) {
            console.error('Error fetching blog:', error);
        } finally {
            setTimeout(() => {
                setLoading(false); // Thay đổi trạng thái loading thành false sau 2 giờ
            }, 1000);
        }
    };

    useEffect(() => {
        fetchBlog();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <section className="blog">
                <div className="container ">
                    {loading ? (
                        // Nếu đang tải, hiển thị màn hình loading
                        <Loading />
                    ) : (
                        // Nếu đã tải xong, hiển thị danh sách blog
                        <div className="row flex justify-around">
                            <div className="bg-[#e2e2e2] w-screen p-16  mb-8 ">

                                <i className="flex flex-col items-center w-full">
                                    <h1 className="font-bold text-4xl ">Blog Làm đẹp</h1>
                                </i>
                            </div>
                            {data.map((blog, index) => (
                                <div className="col-sm-3 blog-list" style={{ gap: '2px' }} key={index}>
                                    <img src={apiDomain + '/image/' + blog.img} alt="" />
                                    <div className="blog-list-content">
                                        <div className="title rainbow">
                                            <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                                        </div>
                                        <div className="blog-footer">
                                            <b> Blog post: </b> {formatDateString(blog.date_create)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </motion.div>
    );
};

export default Blog;
