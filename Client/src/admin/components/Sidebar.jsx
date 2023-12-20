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

  const handleInputClick = () => {
    if (!isNavbarActive) {
      setNavbarActive(true);
    }
  };

  const handleIconClick = () => {
    if (!isNavbarActive) {
      setNavbarActive(true);
    }
  };


  return (
    <>
      <nav className={`navbar ${isNavbarActive ? 'active' : ''} mt-[50px] h-[100vh] `}>
        <div className="navbar-container">
          <div className="navbar-logo-div h-[50px]">
            <a className="navbar-logo-link" href="#">
              <div className="avatar me-3">
                <img src="https://png.pngtree.com/png-clipart/20230409/original/pngtree-admin-and-customer-service-job-vacancies-png-image_9041264.png"
                  class="rounded-circle" alt="image" />
              </div>
              <div>
                <div className="fw-bold">Văn Hào</div>
                <small className="text-muted">Admin</small>
              </div>

            </a>
            <button className="navbar-toggler" onClick={handleTogglerClick}>
              <i className="bi bi-distribute-vertical"></i>
            </button>
          </div>


          <ul className="menu-list">
            <li className={`menu-item `}>
              <Link to="" className={`menu-link ${selectedItem === 'Dashboard' ? 'active' : ''}`} onClick={() => handleItemClick('Dashboard')}>
                <span className="nav-link-icon">
                  <i className="bi bi-bar-chart"></i>
                </span>
                <span className="menu-link-text">Thống kê</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/orders" className={`menu-link ${selectedItem === 'Order' ? 'active' : ''}`} onClick={() => handleItemClick('Order')}>
                <span className="nav-link-icon">
                  <i className="bi bi-receipt"></i>
                </span>
                <span className="menu-link-text">Đơn hàng</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/products " className={`menu-link ${selectedItem === 'product' ? 'active' : ''}`} onClick={() => handleItemClick('product')}>
                <span className="nav-link-icon">
                  <i className="bi bi-truck"></i>
                </span>
                <span className="menu-link-text">Sản phẩm</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/category" className={`menu-link ${selectedItem === 'category' ? 'active' : ''}`} onClick={() => handleItemClick('category')}>
                <span className="nav-link-icon">
                  <i className="bi bi-wallet2"></i>
                </span>
                <span className="menu-link-text">Danh mục</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/users" className={`menu-link ${selectedItem === 'users' ? 'active' : ''}`} onClick={() => handleItemClick('users')}>
                <span className="nav-link-icon">
                  <i className="bi bi-person-badge "></i>
                </span>
                <span className="menu-link-text">Khách hàng</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/blog" className={`menu-link ${selectedItem === 'blog' ? 'active' : ''}`} onClick={() => handleItemClick('blog')}>
                <span className="nav-link-icon">
                  <i className="bi bi-receipt"></i>
                </span>
                <span className="menu-link-text">Blog</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/comment" className={`menu-link ${selectedItem === 'comment' ? 'active' : ''}`} onClick={() => handleItemClick('comment')}>
                <span className="nav-link-icon">
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


    //   className="hidden sm:block w-[30%] bg-white min-h-[90vh] py-4"
    //   initial={{ opacity: 0, x: -100 }} // Example initial animation properties
    //   animate={{ opacity: 1, x: 0 }} // Example animate animation properties
    //   transition={{ duration: 0.5 }} // Example transition properties
    // >

    //   {/* <!-- menu --> */}
    //   <div className="menu mt-20">

    //     <div className="menu-body">

    //       <a href="#" className="d-flex align-items-center" style={{ width: '220px' }}>
    //         <div className="avatar me-3">
    //           <img src="https://png.pngtree.com/png-clipart/20230409/original/pngtree-admin-and-customer-service-job-vacancies-png-image_9041264.png"
    //             class="rounded-circle" alt="image" />
    //         </div>
    //         <div>
    //           <div className="fw-bold">Văn Hào</div>
    //           <small className="text-muted">Admin</small>
    //         </div>
    //       </a>

    //       <ul style={{ width: '220px' }}>
    //         <li className={selectedItem === 'Dashboard' ? 'selected' : ''}>
    //           <Link to="" onClick={() => handleItemClick('Dashboard')}>
    //             <span className="nav-link-icon">
    //               <i className="bi bi-bar-chart"></i>
    //             </span>
    //             <span>Thống kê</span>
    //           </Link>
    //         </li>
    //         <li className={selectedItem === 'Orders' ? 'selected' : ''}>
    //           <Link to="/admin/orders" onClick={() => handleItemClick('Orders')}>
    //             <span className="nav-link-icon">
    //               <i className="bi bi-receipt"></i>
    //             </span>
    //             <span>Đơn hàng</span>
    //           </Link>
    //         </li>
    //         <li className={selectedItem === 'Products' ? 'selected' : ''}>
    //           <Link to="/admin/products" onClick={() => handleItemClick('Products')}>
    //             <span className="nav-link-icon">
    //               <i className="bi bi-truck"></i>
    //             </span>
    //             <span>Sản phẩm</span>
    //           </Link>

    //         </li>
    //         <li className={selectedItem === 'Category' ? 'selected' : ''}>
    //           <Link to="/admin/category" onClick={() => handleItemClick('Category')}>
    //             <span className="nav-link-icon">
    //               <i className="bi bi-wallet2"></i>
    //             </span>
    //             <span>Danh mục</span>
    //           </Link>

    //         </li>
    //         <li className={selectedItem === 'Customers' ? 'selected' : ''}>
    //           <Link to='/admin/users' onClick={() => handleItemClick('Customers')}>
    //             <span className="nav-link-icon">
    //               <i className="bi bi-person-badge"></i>
    //             </span>
    //             <span>Khách hàng</span>
    //           </Link>
    //         </li>
    //         <li className={selectedItem === 'blog' ? 'selected' : ''}>
    //           <Link to='/admin/blog' onClick={() => handleItemClick('blog')}>
    //             <span className="nav-link-icon">
    //               <i className="bi bi-receipt"></i>
    //             </span>
    //             <span>Blog</span>
    //           </Link>

    //         </li>
    //         <li className={selectedItem === 'comment' ? 'selected' : ''}>
    //           <Link to='/admin/comment' onClick={() => handleItemClick('comment')}>
    //             <span className="nav-link-icon">
    //               <i className="bi bi-chat-left-dots"></i>
    //             </span>
    //             <span>Bình luận</span>
    //           </Link>

    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    //   {/* <!-- ./  menu --> */}

  )
};
