import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBlog, deleteBlog } from "../../../utils/apiCalls";

const Blog = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const [keyword, setKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 5;
    const [sortBlog, setSortBlog] = useState('');



    const handleSortBlogChange = (e) => {
        setSortBlog(e.target.value);
        const sortedBlog = [...data].sort((a, b) => {
            if (e.target.value === 'asc') {
                return a.Price - b.Price;
            } else if (e.target.value === 'desc') {
                return b.Price - a.Price;
            }
            return 0; // Nếu giá trị không phải 'asc' hoặc 'desc', trả về 0 để không làm thay đổi thứ tự
        });

        setData(sortedBlog);
    };


    // Calculate the index of the last product on the current page
    const indexOfLastBlog = currentPage * blogsPerPage;
    // Calculate the index of the first product on the current page
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    // Get the current products to display
    const currentBlog = data.slice(indexOfFirstBlog, indexOfLastBlog);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const handleSearch = async () => {
        await fetchBlog();


        if (keyword === '') {

            return;
        } else {
            const filterBlog = data.filter((item) => {
                const nameMatch = item.title && item.title.toLowerCase().includes(keyword.toLowerCase());
                return nameMatch;
            }
            );
            setData(filterBlog);
            console.log('====================================');
            console.log(filterBlog);
            console.log('====================================');
        }


    };

    const truncateDescription = (description) => {
        const maxLength = 100; // Độ dài tối đa của mô tả ngắn gọn
        if (description.length > maxLength) {
            return `${description.slice(0, maxLength)}...`;
        }
        return description;
    };


    const fetchBlog = async () => {
        const data = await getBlog();
        setData(data);
    };

    useEffect(() => {
        fetchBlog();
    }, []);

    const handleDelete = (id) => {
        deleteBlog(id);
        fetchBlog();
    };

    const handleUpdate = (id) => {
        navigate("/admin/updateBlog/" + id);
    };

    return (

        <div>
            <div className="mb-4 mt-10 px-4">

                <nav style={{ "--bs-breadcrumb-divider": ">" }} aria-label="breadcrumb">
                    <div className="d-md-flex gap-4 align-items-center">
                        <form className="mb-3 mb-md-0">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <select className="form-select" value={sortBlog} onChange={handleSortBlogChange}>
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
                                            value={keyword}
                                            onChange={(e) => setKeyword(e.target.value)}
                                        />
                                    </div>
                                    <div width="100px">
                                        {keyword && (
                                            <button className=" font-bold  p-[3px] rounded absolute right-10 " type="button" onClick={() => {
                                                setKeyword('');
                                                fetchBlog();
                                            }}>
                                                <i className="bi bi-x"></i>
                                            </button>


                                        )}

                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-[9px] ml-1 rounded" type="button" onClick={handleSearch}>

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
                Danh sách bài viết
            </h1>
            <button onClick={() => navigate("/admin/create-blog")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Thêm blog</button>

            <table className="min-w-full border-collapse m-6  ">
                <thead>
                    <tr>

                        <th className="py-2 text-left px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b">
                            Hành động
                        </th>
                        <th className="py-2 text-left px-4 border bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b" >
                            Tiêu đề
                        </th>
                        <th className="py-2 text-left px-4 bg-gray-200 text-gray-600 font-bold  uppercase text-sm border-b " >
                            Nội dung
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {currentBlog.map((item, index) => (
                        <tr key={index}>
                            <td className="p-2">
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2 mb-1 "
                                    onClick={() => handleDelete(item.id)}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                    onClick={() => handleUpdate(item.id)}
                                >
                                    <i className="bi bi-pencil-square"></i>
                                </button>
                            </td>
                            <td className="">
                                <p className="text-xs">{item.title}</p>
                            </td>
                            <td className="" >
                                <p className="text-xs/[9px]">{truncateDescription(item.description)}...</p>
                            </td>


                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="box">
                <ul className="pagination">
                    {Array.from({ length: Math.ceil(data.length / blogsPerPage) }, (_, index) => (
                        <li key={index} className={currentPage === index + 1 ? "active bg-green-500" : ""}>
                            <a href="#" onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div >
    );
};

export default Blog;
