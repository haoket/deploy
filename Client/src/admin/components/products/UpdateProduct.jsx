import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { getProductById, updateProduct, uploadImage, getCategory } from "../../../utils/apiCalls";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { apiDomain } from "../../../utils/utilsDomain";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const UpdateProductForm = () => {
    const [data, setData] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [stars, setStars] = useState("");
    const [quantity, setQuantity] = useState("");
    const { product_id } = useParams()
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]); // State to store categories
    const fetchCategories = async () => {
        try {
            const result = await getCategory(); // Fetch categories from your API
            setCategories(result); // Update the categories state
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        control, // Add control from react-hook-form
    } = useForm({

    });
    const getProduct = async () => {
        const data = await getProductById(product_id);
        setData(data);
        setName(data.Name);
        setDescription(data.Description);
        setPrice(data.Price);
        setCategory(data.Category);
        setStars(data.Stars);
        setQuantity(data.Quantity);
        setSelectedImages(JSON.parse(data.ImageLink));

    }


    useEffect(() => {
        getProduct();
        fetchCategories();

    }, [])



    const onSubmit = async () => {
        try {
            const dataUpdate = {
                Name: name,
                Description: description,
                Price: price,
                Category: category,
                Stars: stars,
                Quantity: quantity,
                ImageLink: selectedImages
            };
            console.log('====================================');
            console.log("dataUpdate", dataUpdate);
            console.log('====================================');
            await updateProduct(dataUpdate, product_id);
            alert("Blog updated successfully");
            navigate("/admin/blog");
        } catch (error) {
            console.error("Error update product:", error);
        }



    };
    const handleImageSelect = async (e) => {
        const files = e.target.files[0]; // Chọn tất cả các tệp đã chọn

        if (files) {

            const formData = new FormData();
            formData.append('ImageLink', files);

            try {
                // Gửi hình ảnh lên server
                const response = await uploadImage(formData);

                const uploadedImageName = response.fileName;

                // Cập nhật danh sách hình ảnh
                setSelectedImages([...selectedImages, uploadedImageName]);

            } catch (error) {
                console.error('Lỗi khi tải lên hình ảnh: ', error);
            }
        }
        console.log('====================================');
        console.log("selectedImages", selectedImages);
        console.log('====================================');
    };

    const handleRemoveImage = (imageIndex) => {
        const newSelectedImages = [...selectedImages];
        newSelectedImages.splice(imageIndex, 1);
        setSelectedImages(newSelectedImages);


    }

    return (
        <form className="max-w-full m-6" onSubmit={onSubmit}>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="productName"
                >
                    Product Name
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="productName"
                    type="text"

                    placeholder="Enter product name"
                    required="required"
                    value={name}
                    onChange={(e) => { setName(e.target.value); }}

                />
            </div>
            {/* <p className="error">{errors.Name?.message}</p> */}
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                >
                    Description
                </label>
                <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={setDescription}
                />
            </div>
            {/* <p className="error">{errors.Description?.message}</p> */}
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="price"
                >
                    Price
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="price"
                    type="number"
                    placeholder="Enter price"
                    required="required"
                    onChange={(e) => { setPrice(e.target.value); }}
                    value={price}
                />
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="category"
                >
                    Category
                </label>
                <Controller
                    name="Category"
                    control={control}
                    render={({ field }) => (
                        <select
                            {...field}
                            onChange={(e) => {
                                setCategory(e.target.value);
                            }}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Select a category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.Name}>
                                    {category.Name}
                                </option>
                            ))}
                        </select>
                    )}
                />
            </div>
            {/* <p className="error">{errors.Category?.message}</p> */}
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="stars"
                >
                    Stars
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="stars"
                    type="number"
                    placeholder="Enter price"
                    required="required"
                    value={stars}
                    onChange={(e) => { setStars(e.target.value); }}
                />



            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2  flex flex-col"
                    htmlFor="imageLink"
                >
                    Image Link


                    <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded w-20 flex " >Chọn hình ảnh </div>
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hidden"
                    id="imageLink"
                    accept="image/*"
                    type="file" // Sử dụng kiểu file
                    // required="required"
                    multiple
                    onChange={handleImageSelect}
                />
                <div className="flex">
                    {selectedImages && selectedImages.length > 0 && (
                        <div className="flex">
                            {selectedImages.map((image, index) => (
                                <div key={index} className="m-1 relative">
                                    <img src={apiDomain + "/image/" + image} width={100} height={100} alt={`Ảnh ${index}`} />
                                    <button
                                        className="bg-red-500 hover-bg-red-700 text-white font-bold py-1 px-2 rounded absolute top-0 right-0"
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        Xóa
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div >





            <div className="flex items-center ">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    onClick={onSubmit}
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default UpdateProductForm;
