import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { createProduct, updateProduct, uploadImage } from "../../../utils/apiCalls";
import { getCategory } from "../../../utils/apiCalls"; // Import the function to fetch categories
import { apiDomain } from "../../../utils/utilsDomain";
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { firebaseConnect } from '../../../utils/firebase';


const ProductForm = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [stars, setStars] = useState("");
    const [quantity, setQuantity] = useState("");
    const navigate = useNavigate();
    const storage = getStorage();

    const handleImageSelect = async (e) => {
        const files = e.target.files[0];

        if (files) {
            const storage = getStorage(); // Lấy đối tượng storage từ Firebase
            const storageRef = ref(storage, `images/${files.name}`);
            const uploadTask = uploadBytesResumable(storageRef, files);

            try {
                uploadTask.on('state_changed', (snapshot) => {
                    // Quá trình tải lên, bạn có thể theo dõi tiến trình tại đây nếu cần
                }, (error) => {
                    console.error('Lỗi khi tải lên hình ảnh:', error);
                }, async () => {
                    // Khi tải lên thành công, lấy URL của ảnh
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log('URL hình ảnh:', downloadURL);

                    // Cập nhật danh sách hình ảnh
                    setSelectedImages([...selectedImages, downloadURL]);
                });
            } catch (error) {
                console.error('Lỗi khi tải lên hình ảnh:', error);
            }
        }
    };

    const handleRemoveImage = (imageIndex) => {
        const newSelectedImages = [...selectedImages];
        newSelectedImages.splice(imageIndex, 1);
        setSelectedImages(newSelectedImages);


    }


    const schema = yup.object().shape({
        Name: yup.string().required("Name is required"),
        Description: yup.string().required("Description is required"),
        Price: yup.string().required("Price is required"),
        Category: yup.string().required("Category is required"),
        Stars: yup.string().required("Price is required"),
        Quantity: yup.string().required("Quantity is required"),

    });

    const [categories, setCategories] = useState([]); // State to store categories
    const {
        register,
        handleSubmit,
        formState: { errors },
        control, // Add control from react-hook-form
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        // Fetch categories when the component mounts
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const result = await getCategory(); // Fetch categories from your API
            setCategories(result); // Update the categories state
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const onSubmit = async () => {
        try {

            const newProduct = {
                Name: name,
                Description: description,
                Price: price,
                Category: category,
                Stars: stars,
                Quantity: quantity,
                ImageLink: selectedImages
            };
            console.log('====================================');
            console.log("newProduct", newProduct);
            console.log('====================================');
            await createProduct(newProduct);
            alert("Product created successfully");
            navigate("/admin/products");
        } catch (error) {
            console.error("Error creating product:", error);
        }


    };

    return (
        <div className="w-full flex justify-center">

            <form className=" w-full m-6" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <div className="row">
                    <div className="mb-4 col-5">
                        <div className="row">
                            <div className="col-12">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2 w-full"
                                    htmlFor="productName"
                                >
                                    Tên sản phẩm
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="productName"
                                    type="text"
                                    placeholder="Nhập tên sản phẩm"
                                    required="required"
                                    onChange={(e) => { setName(e.target.value); }}
                                />
                                <p className="error">{errors.Name?.message}</p>
                            </div>
                            <div className="mb-4 col-6">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="price"
                                >
                                    Giá
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="price"
                                    type="number"
                                    placeholder="Nhập giá"
                                    required="required"
                                    onChange={(e) => { setPrice(e.target.value); }}
                                />
                            </div>
                            <div className="mb-4 col-6">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="quantity"
                                >
                                    Số lượng
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="quantity"
                                    type="number"
                                    placeholder="Nhập số lượng"
                                    required="required"
                                    onChange={(e) => { setQuantity(e.target.value); }}
                                />
                                <p className="error">{errors.Price?.message}</p>
                            </div>


                            <div className="mb-4 col-6 ">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="category"
                                >
                                    Danh mục
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
                                            <option value="">Chọn danh mục</option>
                                            {categories.map((category, index) => (
                                                <option key={index} value={category.Name}>
                                                    {category.Name}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                />
                                <p className="error">{errors.Category?.message}</p>
                            </div>

                            <div className="mb-4 col-6">
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
                                    placeholder=""
                                    required="required"
                                    onChange={(e) => { setStars(e.target.value); }}
                                />



                            </div>
                            <p className="error">{errors.Stars?.message}</p>


                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2  flex flex-col"
                                    htmlFor="imageLink"
                                >
                                    Hình ảnh


                                    <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded w-20 flex " >Chọn hình ảnh </div>
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hidden"
                                    id="imageLink"
                                    accept="image/*"
                                    type="file" // Sử dụng kiểu file
                                    required="required"
                                    multiple
                                    onChange={handleImageSelect}
                                />
                                <div className="flex">
                                    {selectedImages.length > 0 && selectedImages.map((image, index) => (

                                        <div key={index} className="m-1 relative" >
                                            <img src={image} width={200} height={200} alt={`Ảnh ${index}`} />
                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded absolute top-0 right-0 "
                                                onClick={() => handleRemoveImage(index)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>

                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div >
                            <div className="flex items-center">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 t ext-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                    onClick={onSubmit}
                                >
                                    Thêm
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4 col-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="description"
                        >
                            Mô tả
                        </label>
                        <ReactQuill
                            theme="snow"
                            value={description}
                            onChange={setDescription}
                        />
                    </div>
                    <p className="error">{errors.Description?.message}</p>




                </div>
            </form >

        </div>
    );
};

export default ProductForm;
