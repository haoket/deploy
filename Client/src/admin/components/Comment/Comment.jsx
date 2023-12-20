import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { apiDomain } from "../../../utils/utilsDomain";
import { ToastContainer, toast } from "react-toastify";

const Comment = () => {
    const [dataComment, setDataComment] = useState([]);
    const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
    const [replyContent, setReplyContent] = useState("");
    const [selectedComment, setSelectedComment] = useState(null);

    const fetchComment = async () => {
        try {
            const response = await axios.get(`${apiDomain}/get-all-comment`);
            setDataComment(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchComment();
    }, []);

    const handleReply = async (comment) => {
        setSelectedComment(comment);
        setIsReplyModalOpen(true);
    };

    const handleSaveReply = async () => {
        // Add your logic to save the reply content here
        // You may need to send an API request to your server
        // and update the comment with the replyContent
        const data = await axios.put(`${apiDomain}/reply-comment/${selectedComment.id}`, { replyContent });
        if (data) {
            setIsReplyModalOpen(false);
            setSelectedComment(null);
            setReplyContent("");
            fetchComment();
            toast.success(`Đã trả lời`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

        } else {
            toast.error(`Thất bại`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        // After saving the reply, close the modal and fetch updated comments
        // Clear the reply content for the next reply
    };

    const handleDelete = async (comment) => {
        console.log('====================================');
        console.log("comment", comment);
        console.log('====================================');
        const data = await axios.delete(`${apiDomain}/reply-comment/${comment.id}`);
        if (data) {
            toast.success(`Xóa thành công`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fetchComment();
        } else {
            toast.error(`Xóa thất bại`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            alert("khong thanh cong");
        }
    }


    return (
        <>

            <ToastContainer />
            <h1 className="text-2xl font-bold mb-2 text-center text-gray-800 py-2 px-4">
                Danh sách bình luận
            </h1>
            {/* Modal trả lời */}
            {isReplyModalOpen && (
                <div className='fixed inset-0 flex items-center justify-center z-50'>
                    {/* Modal overlay */}
                    <div className='fixed inset-0 bg-gray-500 z-[-1] bg-opacity-75'></div>

                    {/* Modal content */}
                    <div className='bg-white p-6 rounded-lg'>
                        <h2 className='text-xl font-bold mb-4'>Trả lời bình luận</h2>
                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2' htmlFor='replyContent'>
                                Trả lời:
                            </label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='replyContent'
                                type='text'
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                            />
                        </div>

                        <div className='flex justify-end'>
                            <button
                                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                                type='button'
                                onClick={handleSaveReply}
                            >
                                Lưu
                            </button>
                            <button onClick={() => setIsReplyModalOpen(false)}>Đóng</button>
                        </div>
                    </div>
                </div>
            )}
            {/* Kết thúc Modal trả lời */}

            {/* Bảng hiển thị dữ liệu */}
            <table className="min-w-full border-collapse m-6">
                <thead>
                    <tr>
                        <th className="py-2 text-left px-4 border bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b">
                            ID
                        </th>
                        {/* Thêm cột cho tên sản phẩm */}
                        <th className="py-2 text-left px-4 border bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b">
                            Tên sản phẩm
                        </th>
                        <th className="py-2 text-left px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b">
                            Người bình luận
                        </th>
                        <th className="py-2 text-left px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b">
                            Nội dung
                        </th>
                        <th className="py-2 text-left px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b">
                            Trạng thái
                        </th>
                        <th className="py-2 text-left px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b">
                            Hành động
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {dataComment.map((item, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b">{item.id}</td>
                            {/* Hiển thị tên sản phẩm */}
                            <td className="py-2 px-4 border-b">{item.product_name}</td>
                            <td className="py-2 px-4 border-b">{item.name}</td>
                            <td className="py-2 px-4 border-b">{item.content}</td>
                            <td className="py-2 px-4 border-b">
                                {item.content_reply ? (
                                    <span >Đã trả lời: <p className="font-italic">{item.content_reply}</p></span>
                                ) : (
                                    <span > Chưa trả lời</span>
                                )}


                            </td>
                            <td className="py-2 px-4 border-b">
                                {!item.content_reply ? (
                                    <>
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2 mb-1"
                                            onClick={() => handleDelete(item)}

                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>

                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                            onClick={() => handleReply(item)}

                                        >
                                            <i className="bi bi-reply-all"></i>
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2 mb-1"
                                        onClick={() => handleDelete(item)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Comment;
