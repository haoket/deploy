import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
  getProductsByCategory,
  searchProduct,
  getProductsPriceDesc,
  getProductsPriceAsc,
  commentProduct,
  getCommentProduct,
  getAllComment,
  replyComment,
  deleteComment
} from '../controllers/productControllers.js';
import fs from 'fs';
import path from 'path';
import multer from 'multer';


import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const imageDirectory = path.join(__dirname, '..\\image'); // Đường dẫn đến thư mục 'image'
    fs.mkdirSync(imageDirectory, { recursive: true }); // Tạo thư mục 'image' nếu chưa tồn tại
    cb(null, imageDirectory); // Sử dụng thư mục 'image' làm nơi lưu trữ
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Tạo tên tệp hình ảnh duy nhất
  },
});

const upload = multer({ storage: storage });




const productRoutes = (app) => {
  app.route('/products')
    .get(getProducts);

  app.route('/products/abc')
    .get(getProducts);

  app.route('/getPrductByCategory/:slug')
    .get(getProductsByCategory);

  app.route('/createproducts').post(createProduct);

  app.route('/products/:id')
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct);

  app.route('/comment-product').post(commentProduct);
  app.route('/comment-product/:id').get(getCommentProduct);
  app.route('/get-all-comment').get(getAllComment);



  app.route('/uploadImage')
    .post(upload.single('ImageLink'), uploadImage);



  app.route('/search=:name')
    .get(searchProduct);


  app.route('/getProductsPriceDesc')
    .get(getProductsPriceDesc);
  app.route('/getProductsPriceAsc')
    .get(getProductsPriceAsc);
  app.route('/reply-comment/:id')
    .put(replyComment)
    .delete(deleteComment);

};



export default productRoutes;
