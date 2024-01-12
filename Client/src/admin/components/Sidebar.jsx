import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import "./Sidebar.scss"
export const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState('Dashboard');

  const handleItemClick = (item) => {
    setSelectedItem(item);

  };

  const [isNavbarActive, setNavbarActive] = useState(false);

  const handleTogglerClick = () => {
    setNavbarActive(!isNavbarActive);
  };



  return (
    <>
      <nav className={`navbar ${isNavbarActive ? 'active' : ''} mt-[70px] h-[100vh] lg:mt-10 `}>
        <div className="navbar-container">
          <div className="navbar-logo-div h-[50px]">
            <a className="navbar-logo-link" href="#">
              <div className="avatar me-3">
                <img src="https://png.pngtree.com/png-clipart/20230409/original/pngtree-admin-and-customer-service-job-vacancies-png-image_9041264.png"
                  className="rounded-circle" alt="image" />
              </div>
              <div>
                <div className="fw-bold">Văn Hào</div>
                <small className="text-muted">Admin</small>
              </div>

            </a>
            <button className="navbar-toggler " onClick={handleTogglerClick}>
              <i className="bi bi-distribute-vertical"></i>
            </button>
          </div>


          <ul className="menu-list md:mt-[-10px] mt-[-30px]" >
            <li className={`menu-item `}>
              <Link to="" className={`menu-link  px-[5px] ${selectedItem === 'Dashboard' ? 'active' : ''}`} onClick={() => handleItemClick('Dashboard')}>
                <span className={`nav-link-icon px-2 rounded ${selectedItem === 'Dashboard' ? 'bg-gray-400' : ''}`}>
                  <i className="bi bi-bar-chart"></i>
                </span>
                <span className="menu-link-text">Thống kê</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/orders" className={`menu-link px-[5px] ${selectedItem === 'Order' ? 'active' : ''}`} onClick={() => handleItemClick('Order')}>
                <span className={`nav-link-icon px-2 rounded ${selectedItem === 'Order' ? 'bg-gray-400' : ''}`}>
                  <i className="bi bi-receipt"></i>
                </span>
                <span className="menu-link-text">Đơn hàng</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/products " className={`menu-link px-[5px] ${selectedItem === 'product' ? 'active' : ''}`} onClick={() => handleItemClick('product')}>
                <span className={`nav-link-icon px-2 rounded ${selectedItem === 'product' ? 'bg-gray-400' : ''}`}>
                  <i className="bi bi-truck"></i>
                </span>
                <span className="menu-link-text">Sản phẩm</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/category" className={`menu-link px-[5px] ${selectedItem === 'category' ? 'active ' : ''}`} onClick={() => handleItemClick('category')}>
                <span className={`nav-link-icon px-2 rounded ${selectedItem === 'category' ? 'bg-gray-400' : ''}`}>
                  <i className="bi bi-wallet2"></i>
                </span>
                <span className="menu-link-text">Danh mục</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/users" className={`menu-link px-[5px] ${selectedItem === 'users' ? 'active' : ''}`} onClick={() => handleItemClick('users')}>
                <span className={`nav-link-icon px-2 rounded ${selectedItem === 'users' ? 'bg-gray-400' : ''}`}>
                  <i className="bi bi-person-badge "></i>
                </span>
                <span className="menu-link-text">Khách hàng</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/blog" className={`menu-link px-[5px] ${selectedItem === 'blog' ? 'active' : ''}`} onClick={() => handleItemClick('blog')}>
                <span className={`nav-link-icon px-2 rounded ${selectedItem === 'blog' ? 'bg-gray-400' : ''}`}>
                  <i className="bi bi-receipt"></i>
                </span>
                <span className="menu-link-text">Blog</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/comment" className={`menu-link px-[5px]  ${selectedItem === 'comment' ? 'active' : ''}`} onClick={() => handleItemClick('comment')}>
                <span className={`nav-link-icon px-2 rounded ${selectedItem === 'comment' ? 'bg-gray-400' : ''}`}>
                  <i className="bi bi-chat-left-dots"></i>
                </span>
                <span className="menu-link-text">Bình luận</span>
              </Link>
            </li>


            {/* Add similar list items for other menu links */}
          </ul>
        </div>

      </nav>
    </>



  )
};
