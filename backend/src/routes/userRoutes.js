import express from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updatePassword,

} from '../controllers/userControllers.js';

const userRoutes = (app) => {
  app.route('/users')
    .get(getUsers)
    .post(createUser);

  app.route('/users/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);
  app.route('/change-password/:id')
    .put(updatePassword);
};

export default userRoutes;
