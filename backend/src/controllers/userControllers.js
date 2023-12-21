import mysql from 'mysql';
import createDatabaseConnection from '../config/database.js';

import bcrypt from 'bcrypt';

const dbConnection = createDatabaseConnection();


export const getUsers = (req, res) => {
  const query = 'SELECT * FROM users';

  dbConnection.query(query, (error, results) => {
    if (error) {
      console.error('Lỗi khi lấy danh sách người dùng:', error);
      res.status(500).json({ error: 'Lỗi khi lấy danh sách người dùng' });
    } else {
      res.status(200).json(results);
    }
  });
};




// Get a specific user by ID
export const getUserById = async (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM Users Where id = ?';

  dbConnection.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Lỗi khi lấy danh sách người dùng:', error);
      res.status(500).json({ error: 'Lỗi khi lấy danh sách người dùng' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

// Create a new user
export const createUser = async (req, res) => {
  const { password, email, phone, name, address } = req.body;
  console.log('====================================');
  console.log('req', req.body);
  console.log('====================================');
  const created_at = new Date().toDateString();
  try {
    dbConnection.query('INSERT INTO Users (name, address, phone, password, email, created_at) VALUES (?, ?, ?,?,?,?)', [name, address, phone, password, email, created_at]);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `An error occurred while creating the user... ${error.message}` });
  }
};

// Update a user by ID
export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { email, phone, name, address } = req.body;
  try {
    dbConnection.query('UPDATE Users SET  email = ?, phone = ?, name = ?, address = ? WHERE id = ?', [email, phone, name, address, userId]);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `An error occurred while updating the user... ${error.message}` });
  }
};


// Delete a user by ID
export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await dbConnection.query('DELETE FROM Users WHERE id = ?', [userId]);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `An error occurred while deleting the user... ${error.message}` });
  }
};

export const updatePassword = async (req, res) => {
  const userId = req.params.id;
  const { oldPassword, newPassword } = req.body;

  try {
    // Lấy thông tin người dùng từ database
    const query = 'SELECT * FROM Users WHERE id = ?';

    const [user] = await new Promise((resolve, reject) => {
      dbConnection.query(query, [userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    // Kiểm tra mật khẩu hiện tại
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect current password' });
    }

    // Mã hóa mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu mới vào database
    await new Promise((resolve, reject) => {
      dbConnection.query('UPDATE Users SET password = ? WHERE id = ?', [hashedPassword, userId], (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Lỗi khi cập nhật mật khẩu:', error);
    res.status(500).json({ error: 'Lỗi khi cập nhật mật khẩu' });
  }
};