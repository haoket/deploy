import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct, getProducts } from "../../../utils/apiCalls";

const ProductsTable = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
    const [sortProduct, setSortProduct] = useState('');



    const handleSortProductChange = (e) => {
        setSortProduct(e.target.value);
        const sortedproduct = [...data].sort((a, b) => {
            if (e.target.value === 'asc') {
                return a.Price - b.Price;
            } else if (e.target.value === 'desc') {
                return b.Price - a.Price;
            }
            return 0; // Nếu giá trị không phải 'asc' hoặc 'desc', trả về 0 để không làm thay đổi thứ tự
        });

        setData(sortedproduct);
    };
    const handleSearch = async () => {
        await fetchProducts();


        if (keyword === '') {

            return;
        } else {
            const filterProduct = data.filter((item) => {
                const nameMatch = item.Name && item.Name.toLowerCase().includes(keyword.toLowerCase());
                const categoryMath = item.Category && item.Category.toLowerCase().includes(keyword.toLowerCase());
                // Sử dụng startsWith() để kiểm tra xem số điện thoại bắt đầu bằng keyword hay không


                return nameMatch || categoryMath;
            }
            );
            setData(filterProduct);
            console.log('====================================');
            console.log(filterProduct);
            console.log('====================================');
        }


    };


    const fetchProducts = async () => {
        const data = await getProducts();
        setData(data);
    };


    const truncateDescription = (description) => {
        const maxLength = 100; // Độ dài tối đa của mô tả ngắn gọn
        if (description.length > maxLength) {
            return `${description.slice(0, maxLength)}...`;
        }
        return description;
    };


    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = (id) => {
        deleteProduct(id);
        fetchProducts();
    };

    const handleUpdate = (id) => {
        navigate("/admin/update/" + id);
    };

    // Calculate the index of the last product on the current page
    const indexOfLastProduct = currentPage * productsPerPage;
    // Calculate the index of the first product on the current page
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    // Get the current products to display
    const currentOrder = data.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);



    return (

        <div>
            <div className="mb-4 mt-10 px-4">
                <nav style={{ "--bs-breadcrumb-divider": ">" }} aria-label="breadcrumb">
                    <div className="d-md-flex gap-4 align-items-center">
                        <form className="mb-3 mb-md-0">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <select className="form-select" value={sortProduct} onChange={handleSortProductChange}>
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
                                                fetchProducts();
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
                Danh sách sản phẩm
            </h1>
            <button onClick={() => navigate("/admin/createproduct")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Thêm sản phẩm</button>

            <table className="min-w-full border-collapse m-6  ">
                <thead>
                    <tr>

                        <th className="py-2 text-left px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b">
                            Hành động
                        </th>
                        <th className="py-2 text-left px-4 border bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b" >
                            Tên sản phẩm
                        </th>
                        <th className="py-2 text-left px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b">
                            Giá
                        </th>
                        <th className="py-2 text-left px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b">
                            Danh mục
                        </th>
                        <th className="py-2 text-left px-4 bg-gray-200 text-gray-600 font-bold  uppercase text-sm border-b " >
                            Nội dung chi tiết
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {currentOrder.map((item, index) => (
                        <tr key={index} className="border-b-[10px] ">
                            <td className="">
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2 mb-1 "
                                    onClick={() => handleDelete(item.ID)}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                    onClick={() => handleUpdate(item.ID)}
                                >
                                    <i className="bi bi-pencil-square"></i>
                                </button>
                            </td>
                            <td className="">
                                <p className="text-xs">{item.Name}</p>
                            </td>
                            <td className="">{item.Price}</td>
                            <td className="">
                                <p className="text-xs">{item.Category}</p>
                            </td>
                            <td className="" >
                                <p className="text-xs/[9px]">
                                    {truncateDescription(item.Description)}
                                </p>
                            </td>


                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="box">
                <ul className="pagination">
                    {Array.from({ length: Math.ceil(data.length / productsPerPage) }, (_, index) => (
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

export default ProductsTable;
