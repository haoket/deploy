import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiDomain } from '../../../utils/utilsDomain';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [iOpenModalDetail, setOpenModalDetail] = useState(false);
  const [sortOrder, setSortOrder] = useState('');
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;


  const formatDateString = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const openModalDetail = (order) => {
    setOpenModalDetail(true);
    setSelectedOrder(order);


  };
  const closeModalDetail = () => {
    setSelectedOrder(null);
    setSelectedStatus('');
    setOpenModalDetail(false);
  };


  const parseImageLink = (imageLink) => {
    try {
      const img = JSON.parse(imageLink);

      // Lấy tên của hình ảnh đầu tiên và loại bỏ ký tự "\"
      return img[0].replace(/\\/g, '');

    } catch (error) {
      console.error('Error parsing ImageLink:', error);
    }
    return null;
  };

  //lấy dữ liệu đơn hàng
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${apiDomain}/getAllOrders`);
      setOrders(response.data);
      console.log('====================================');
      console.log(response.data);
      console.log('====================================');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const openModal = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setSelectedStatus('');
    setModalOpen(false);
  };
  const handleUpdateStatus = async () => {
    try {
      // Gọi API để cập nhật trạng thái đơn hàng
      await axios.put(`${apiDomain}/update-orders-status/${selectedOrder.ID}`, { status: selectedStatus });
      toast.success('Order Status Updated successfully', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      // Đóng modal sau khi cập nhật
      closeModal();
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };
  // trạng thái các đơn hàng
  const getStatus = (status) => {
    switch (status) {
      case '0':
        return { text: 'chờ xác nhận', color: 'text-white bg-yellow-600' };
      case '1':
        return { text: 'Đang giao hàng', color: 'text-white  bg-blue-600' };
      case '2':
        return { text: 'Đã giao hàng', color: 'text-white bg-green-600' };
      default:
        return { text: "Đã hủy", color: 'text-white bg-red-600' };
    }
  };

  // Calculate the index of the last product on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  // Calculate the index of the first product on the current page
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // Get the current products to display
  const currentOrder = orders.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
    const sortedOrders = [...orders].sort((a, b) => {
      if (e.target.value === 'asc') {
        return a.status - b.status;
      } else if (e.target.value === 'desc') {
        return b.status - a.status;
      }
      return 0; // Nếu giá trị không phải 'asc' hoặc 'desc', trả về 0 để không làm thay đổi thứ tự
    });

    setOrders(sortedOrders);
  };


  const handleSearch = async () => {
    await fetchOrders();


    if (keyword === '') {

      return;
    } else {
      const filteredOrders = orders.filter((item) => {
        const nameMatch = item.name && item.name.toLowerCase().includes(keyword.toLowerCase());
        const emailMatch = item.email && item.email.toLowerCase().includes(keyword.toLowerCase());
        // Sử dụng startsWith() để kiểm tra xem số điện thoại bắt đầu bằng keyword hay không
        const phoneMatch = item.phone && item.phone.startsWith(keyword);

        return nameMatch || phoneMatch || emailMatch;
      }
      );
      setOrders(filteredOrders);
      console.log('====================================');
      console.log(filteredOrders);
      console.log('====================================');
    }


  };


  useEffect(() => {
    fetchOrders();
  }, []);


  return (
    <div className='container px-4 mt-10'>

      {/* <!-- content --> */}
      <div className="content ">

        <div className="mb-4">
          <nav style={{ "--bs-breadcrumb-divider": ">" }} aria-label="breadcrumb">
            <h1 className="text-2xl font-bold mb-2 text-center text-gray-800 py-2 px-4">
              Danh sách đơn hàng
            </h1>
          </nav>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="d-md-flex gap-4 align-items-center">
              <div className="d-none d-md-flex">Tất cả đơn hàng</div>
              <div className="d-md-flex gap-4 align-items-center">
                <form className="mb-3 mb-md-0">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <select className="form-select" value={sortOrder} onChange={handleSortOrderChange}>
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
                            fetchOrders();
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

            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-custom table-lg mb-0" id="orders">
            <thead>

              <tr>

                <th>ID</th>
                <th>Tên khách hàng</th>
                <th>Email</th>
                <th>SĐT</th>
                <th>Ngày đặt</th>
                <th>Tổng tiền</th>
                <th>Tình trạng</th>
                <th className="text-end">Hành động</th>
                <th>

                </th>
              </tr>
            </thead>
            <tbody>
              {currentOrder.map((order, index) => (
                <tr key={index}>

                  <td>
                    <a href="#">#{order.ID}</a>
                  </td>
                  <td>{order.name}</td>
                  <td>{order.email}</td>
                  <td>0{order.phone}</td>
                  <td>{formatDateString(order.date_create)}</td>
                  <td>{order.TotalAmount}.000 VNĐ</td>
                  <td>
                    <span className={`px-4 py-2 badge border ${getStatus(order.status).color}`}> {getStatus(order.status).text}</span>
                  </td>
                  <td className="text-end">

                    {order.status != '3' && order.status != '2' && (
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white w-full px-2 py-1 rounded"
                        onClick={() => openModal(order)}
                      >
                        Cập nhật trạng thái
                      </button>
                    )}
                    {order.status === '3' && (
                      <button className='disabled bg-gray-500 text-white w-full px-2 py-1 rounded pointer-events-none'>

                        Đơn hàng đã hủy
                      </button>
                    )}
                    {order.status === '2' && (
                      <button className='disabled bg-green-500 text-white w-full px-2 py-1 rounded pointer-events-none'>
                        Đơn hàng đã giao thành công
                      </button>
                    )}
                  </td>
                  <td className="text-end">
                    <div className="d-flex">
                      <div className="dropdown ms-auto">
                        <button data-bs-toggle="dropdown"
                          className="btn btn-floating"
                          aria-expanded="false"
                          onClick={() => openModalDetail(order)}
                        >
                          <i className="bi bi-three-dots"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}



              {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                  <div className="bg-white p-6 rounded shadow-lg w-4/7">
                    <h3 className="text-xl font-bold mb-4">Cập nhật trạng thái</h3>

                    <h1 className='text-xl font-bold mb-4'>Chi tiết đơn hàng</h1>

                    {selectedOrder.products.map((product) => (
                      <div className='border-gray-100 pt-2'>
                        <div className='flex'>
                          <img width={100} height={100} src={apiDomain + "/image/" + parseImageLink(product.img)} alt="" />
                          <p className="mb-2"><span span className='font-bold'>Tên sản phẩm:</span> {product.Name}</p>
                        </div>
                        <p className="mb-2"><span span className='font-bold'>Giá:</span>{product.Price}</p>
                        <p className="mb-2"><span span className='font-bold'>Số lượng:</span> {product.Quantity}</p>
                        <hr className='border-1 border-black'></hr>
                      </div>
                    ))}

                    <p className="mb-2"><span span className='font-bold'>Tình trạng đơn hàng:</span> {getStatus(selectedOrder.status).text}</p>
                    <label className="block mb-4">
                      <span span className='font-bold'>Cập nhật:</span>
                      <select
                        className="border rounded w-full px-2 py-1"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                      >
                        {selectedOrder.status === '0' && (
                          <>
                            <option>Chọn</option>
                            <option value="1">Xác nhận đơn hàng</option>
                            <option value="3">Hủy đơn hàng</option>
                          </>
                        )}
                        {selectedOrder.status != '0' && selectedOrder.status != '3' && (

                          <>
                            <option>Chọn</option>
                            <option value="2">Đã giao hàng</option>
                          </>
                        )}
                      </select>
                    </label>
                    <div className="flex justify-between">
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
                        onClick={handleUpdateStatus}
                      >
                        Update Status
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}


              {iOpenModalDetail && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-10">
                  <div className="bg-white p-6 rounded shadow-lg w-1/3">
                    <h3 className="text-xl font-bold mb-4">Update Order Status</h3>

                    <h1 className='text-xl font-bold mb-4'>Chi tiết đơn hàng</h1>

                    {selectedOrder.products.map((product) => (
                      <div className='border-2 border-black'>
                        <p className="mb-2">Tên sản phẩm: {product.Name}</p>
                        <p className="mb-2">Giá sản phẩm: {product.Price}</p>
                        <p className="mb-2">Số lượng: {product.Quantity}</p>
                        <hr className='border-1 border-black'></hr>
                      </div>
                    ))}

                    <p className="mb-2">Tình trạng đơn hàng: {getStatus(selectedOrder.status).text}</p>

                    <div className="flex justify-between ">

                      <button
                        className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                        onClick={closeModalDetail}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </tbody>
          </table>
        </div>

        <div className="box">
          <ul className="pagination">
            {Array.from({ length: Math.ceil(orders.length / productsPerPage) }, (_, index) => (
              <li key={index} className={currentPage === index + 1 ? "active bg-green-500" : ""}>
                <a href="#" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>
      {/* <!-- ./ content --> */}





      <ToastContainer />
    </div>
  );
};

export default OrdersTable;




