import express from 'express';
import crypto from 'crypto';
import axios from 'axios';

import { vnp_TmnCode, vnp_HashSecret, vnp_Url, vnp_ReturnUrl } from '../config/config.js';

import bodyParser from 'body-parser';
import dateFormat from 'dateformat';
import qs from 'qs';



import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  createOrderItem,
  getOrderByStatus,
  updateStatusOrder,
  getAllOrder,
  getOrderByIDCustomer
} from '../controllers/ordersControllers.js';

const orderRoutes = (app) => {


  app.route('/create-order').post(createOrder);
  app.route('/create-order-item').post(createOrderItem);


  app.route('/orders/:id')
    .get(getOrderById)

  app.route('/update-orders-status/:id').put(updateStatusOrder)


  app.route('/getOrderByStatus').get(getOrderByStatus);
  app.route('/getOrderByIDCustomer').get(getOrderByIDCustomer);
  app.route('/getAllOrders').get(getAllOrder);



};

export default orderRoutes;
