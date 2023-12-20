import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import AuthLayout from "../Layouts/AuthLayout";
import UserLayout from "../Layouts/UserLayout";
import { AdminLayout } from "../Layouts/AdminLayout";
import Home from "../pages/home/Home";
import Cart from "../user/components/cart/Cart";
import ProductList from "../user/components/product/ProductList";
import Contact from "../pages/contact/Contact";
import ProductDetails from "../user/components/product/ProductDetails";
import { Dashboard } from "../admin/components/Dashboard";
import About from "../pages/about/About";
import UpdateProductForm from "../admin/components/products/UpdateProduct";
import ProductsTable from "../admin/components/products/ProductsTable";
import UsersTable from "../admin/components/userAccount/UsersTable";
import CreatePoductForm from "../admin/components/products/CreateProduct";
import OrdersTable from "../admin/components/order/OrdersTable";
import Category from "../admin/components/category/Category";
import ProductCategories from "../user/components/product/ProductCategories";
import { Order } from "../user/components/order/Order";
import { Profile } from "../user/components/profile/Profile";
import ProductSearchPage from "../user/components/product/ProductSearchPage";
import BlogTable from "../admin/components/blog/BlogTable";
import { CreateBlog } from "../admin/components/blog/CreateBlog";
import { UpdateBlog } from "../admin/components/blog/UpdateBlog";
import Blog from "../pages/blog/Blog";
import BlogDetail from "../pages/blog/BlogDetail";
import Comment from "../admin/components/Comment/Comment";
import { ChangePassword } from "../user/components/profile/ChangePassword";



export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>

            {/* USER ROUTES*/}
            <Route path="" element={<UserLayout />}>
                <Route path="" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="products" element={<ProductList />} />
                <Route path="product/:id" element={<ProductDetails />} />
                <Route path="cart" element={<Cart />} />
                <Route path="products/:slug" element={<ProductCategories />} />
                <Route path="search/:name" element={<ProductSearchPage />} />
                <Route path="/create-order" element={<Order />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/profile/" element={<Profile />} />
                <Route path="/change-password" element={<ChangePassword />} />

            </Route>
            {/* ADMIN ROUTES */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route path="" element={<Dashboard />} />
                <Route path="products" element={<ProductsTable />} />
                <Route path="users" element={<UsersTable />} />
                <Route path="createproduct" element={<CreatePoductForm />} />
                <Route path="category" element={<Category />} />
                <Route path="orders" element={<OrdersTable />} />
                <Route path="blog" element={<BlogTable />} />
                <Route path="create-blog" element={<CreateBlog />} />
                <Route path="update/:product_id" element={<UpdateProductForm />} />
                <Route path="updateBlog/:blog_id" element={<UpdateBlog />} />
                <Route path="comment" element={<Comment />} />
            </Route>
            {/* AUTH ROUTES */}
            <Route path="auth" element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
            </Route>

        </Route>
    )
);