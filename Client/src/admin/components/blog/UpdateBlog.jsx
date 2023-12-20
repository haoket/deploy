import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { uploadImage, updateBlog, getBlogById } from "../../../utils/apiCalls";
import { apiDomain } from "../../../utils/utilsDomain";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { yupResolver } from '@hookform/resolvers/yup';

export const UpdateBlog = () => {
    const [selectedImages, setSelectedImages] = useState('');
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    const [data, setData] = useState([]);
    const { blog_id } = useParams()
    const navigate = useNavigate();



    const getBlog = async () => {
        const data = await getBlogById(blog_id);
        setData(data);
        setTitle(data.title);
        setDescription(data.description);
        setSelectedImages(data.img);

    }



    useEffect(() => {
        getBlog();
    }, [])





    const handleImageSelect = async (e) => {
        const files = e.target.files[0]; // Chọn tất cả các tệp đã chọn

        if (files) {
            const formData = new FormData();
            formData.append('ImageLink', files);
            try {
                // Gửi hình ảnh lên server
                const response = await uploadImage(formData);
                console.log('====================================');
                console.log("Tải lên hình ảnh:", response.fileName);
                console.log('====================================');
                const uploadedImageName = response.fileName;
                // Cập nhật danh sách hình ảnh
                setSelectedImages(uploadedImageName);
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


    const schema = yup.object().shape({
        title: yup.string().required("Name is required"),
        Description: yup.string().required("Description is required"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        control, // Add control from react-hook-form
    } = useForm({
        resolver: yupResolver(schema),
    });



    const onSubmit = async () => {
        try {

            const dataUpdate = {
                Title: title,
                Description: description,
                ImageLink: selectedImages
            };
            console.log('====================================');
            console.log("newBlog", dataUpdate);
            console.log('====================================');
            await updateBlog(dataUpdate, blog_id);
            // alert("blog updated successfully");
            // navigate("/admin/blog");
        } catch (error) {
            console.error("Error creating product:", error);
        }


    };

    return (
        <form className="max-w-sm m-6" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                >
                    Blog Title
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    placeholder="Enter blog title"
                    required="required"
                    value={title}
                    onChange={(e) => { setTitle(e.target.value); }}
                />
            </div>
            <p className="error">{errors.Name?.message}</p>
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
            <p className="error">{errors.Description?.message}</p>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2  flex flex-col"
                    htmlFor="imageLink"
                >
                    Image


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
                    {selectedImages && (

                        <div className="m-1 relative" >
                            <img src={apiDomain + "/image/" + selectedImages} width={100} height={100} alt={`Ảnh ${selectedImages}`} />
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded absolute top-0 right-0 "
                                onClick={() => handleRemoveImage(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>

                            </button>
                        </div>
                    )}
                </div>
            </div >

            <div className="flex items-center">
                <button
                    className="bg-blue-500 hover:bg-blue-700 t ext-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    onClick={onSubmit}
                >
                    Submit
                </button>
            </div>
        </form >
    );
};
