import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getCategory, deleteCategory, createCategory } from "../../../utils/apiCalls";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    categoryName: yup.string().required("Category Name is required"),
    categoryDescription: yup.string().required("Category Description is required"),
    categorySlug: yup.string().required("Category Slug is required"),
});

const Category = () => {
    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 3;
    const [sortCategory, setSortCategory] = useState('');



    const handleSortCategoryChange = (e) => {
        setSortCategory(e.target.value);
        const sortedcategory = [...data].sort((a, b) => {
            if (e.target.value === 'desc') {
                return a.ID - b.ID;
            } else if (e.target.value === 'asc') {
                return b.ID - a.ID;
            }
            return 0; // Nếu giá trị không phải 'asc' hoặc 'desc', trả về 0 để không làm thay đổi thứ tự
        });

        setData(sortedcategory);
    };
    const handleSearch = async () => {
        await fetchCategory();


        if (keyword === '') {

            return;
        } else {
            const filterCategory = data.filter((item) => {
                const nameMatch = item.Name && item.Name.toLowerCase().includes(keyword.toLowerCase());
                // Sử dụng startsWith() để kiểm tra xem số điện thoại bắt đầu bằng keyword hay không


                return nameMatch;
            }
            );
            setData(filterCategory);
            console.log('====================================');
            console.log(filterCategory);
            console.log('====================================');
        }


    };

    // Calculate the index of the last product on the current page
    const indexOfLastProduct = currentPage * productsPerPage;
    // Calculate the index of the first product on the current page
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    // Get the current products to display
    const currentProduct = data.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const fetchCategory = async () => {
        try {
            const result = await getCategory();
            if (Array.isArray(result)) {
                setData(result);
            } else {
                console.error("Invalid data returned from getCategory");
            }
        } catch (error) {
            console.error("Error fetching category:", error);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const { categoryName, categoryDescription, categorySlug } = data;
            const newCategory = {
                Name: categoryName,
                Description: categoryDescription,
                Slug: categorySlug,
            };
            await createCategory(newCategory);
            setOpenModal(false);
            reset();
            fetchCategory();
        } catch (error) {
            console.error("Error creating category:", error);
        }
    };

    const handleDelete = (id) => {
        deleteCategory(id).then(() => {
            fetchCategory();
        });
    };

    const handleUpdate = (id) => {
        // Add your code for updating a category here
        console.log("Update category with ID:", id);
    };

    return (
        <>
            <div className="mb-4 mt-10 px-4">
                <nav style={{ "--bs-breadcrumb-divider": ">" }} aria-label="breadcrumb">
                    <div className="d-md-flex gap-4 align-items-center">
                        <form className="mb-3 mb-md-0">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <select className="form-select" value={sortCategory} onChange={handleSortCategoryChange}>
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
                                                fetchCategory();
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
            {openModal && (
                <Modal show={openModal} onHide={() => setOpenModal(false)} className="transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 w-1/2 rounded ">
                    <Modal.Header className="flex justify-center items-center">
                        <h1 className="text-2xl font-bold mb-2 text-center text-gray-800 py-2 px-4">
                            Thêm danh mục
                        </h1>
                    </Modal.Header>
                    <Modal.Body className="flex justify-center items-center mt-20 ">
                        <form className="max-w-sm m-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="categoryName"
                                >
                                    Tên danh mục
                                </label>
                                <Controller
                                    name="categoryName"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="text"
                                            placeholder="Nhập tên danh mục"
                                        />
                                    )}
                                />
                                {errors.categoryName && (
                                    <p className="text-red-500">{errors.categoryName.message}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="categoryDescription"
                                >
                                    Mô tả danh mục
                                </label>
                                <Controller
                                    name="categoryDescription"
                                    control={control}
                                    render={({ field }) => (
                                        <textarea
                                            {...field}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            rows="3"
                                            placeholder="Nhập mô tả"
                                        />
                                    )}
                                />
                                {errors.categoryDescription && (
                                    <p className="text-red-500">
                                        {errors.categoryDescription.message}
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="categorySlug"
                                >
                                    Slug
                                </label>
                                <Controller
                                    name="categorySlug"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="text"
                                            placeholder="Nhập slug"
                                        />
                                    )}
                                />
                                {errors.categorySlug && (
                                    <p className="text-red-500">{errors.categorySlug.message}</p>
                                )}
                            </div>


                        </form>
                    </Modal.Body>
                    <Modal.Footer className="flex justify-center items-center mb-2">
                        <Button
                            className="bg-blue-700 hover:bg-blue-200 text-white font-bold py-1 px-2 rounded mb-1 mr-2  "
                            type="submit"
                        >
                            Thêm
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setOpenModal(false);
                                reset();
                            }}
                            className="bg-red-700 hover:bg-red-200 text-white font-bold py-1 px-2 rounded mb-1 mr-2 "
                        >
                            Đóng
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            <div className="relative">
                <h1 className="text-2xl font-bold mb-2 text-center text-gray-800 py-2 px-4">
                    Danh mục
                </h1>
                <button
                    onClick={() => setOpenModal(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-10 ml-10 rounded"
                >
                    Thêm danh mục
                </button>
            </div>

            <table className="min-w-full border-collapse m-6">
                <thead>
                    <tr>
                        <th className="py-2 text-left px-4 border bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b">
                            ID
                        </th>
                        <th className="py-2 text-left px-4 border bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b">
                            Tên danh mục
                        </th>
                        <th className="py-2 text-left px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b">
                            Mô tả
                        </th>
                        <th className="py-2 text-left px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b">
                            Slug
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentProduct.map((item, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b">{item.ID}</td>
                            <td className="py-2 px-4 border-b">{item.Name}</td>
                            <td className="py-2 px-4 border-b">{item.Description}</td>
                            <td className="py-2 px-4 border-b">{item.slug}</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2 mb-1"
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
        </>
    );
};

export default Category;
