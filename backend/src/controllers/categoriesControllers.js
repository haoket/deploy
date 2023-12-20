import mysql from 'mysql';
import createDatabaseConnection from '../config/database.js';

const dbConnection = createDatabaseConnection();

// Get all categories
export const getCategories = (req, res) => {
  const query = 'SELECT * FROM Categories';
  dbConnection.query(query, (error, results) => {
    if (error) {
      console.error('Lỗi khi lấy danh sách danh mục:', error);
      res.status(500).json({ error: 'Lỗi khi lấy danh sách danh mục' });
    } else {
      res.status(200).json(results);
    }
  });
};

// Get a single category by ID
export const getCategoryById = (req, res) => {
  const categoryId = req.params.id;
  const query = 'SELECT * FROM Categories WHERE ID = ?';

  dbConnection.query(query, [categoryId], (error, results) => {
    if (error) {
      console.error('Lỗi khi lấy thông tin danh mục:', error);
      res.status(500).json({ error: 'Lỗi khi lấy thông tin danh mục' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'Danh mục không được tìm thấy' });
      } else {
        res.status(200).json(results[0]);
      }
    }
  });
};

// Create a new category
export const createCategory = (req, res) => {
  const { Name, Description, Slug } = req.body;
  const query = 'INSERT INTO Categories (Name, Description, slug) VALUES (?, ?, ?)';

  dbConnection.query(query, [Name, Description, Slug], (error) => {
    if (error) {
      console.error('Lỗi khi tạo danh mục:', error);
      res.status(500).json({ error: 'Lỗi khi tạo danh mục' });
    } else {
      res.status(201).json({ message: 'Danh mục được tạo thành công' });
    }
  });
};

// Update a category
export const updateCategory = (req, res) => {
  const categoryId = req.params.id;
  const { Name, Description } = req.body;
  const query = 'UPDATE Categories SET Name = ?, Description = ? WHERE ID = ?';

  dbConnection.query(query, [Name, Description, categoryId], (error) => {
    if (error) {
      console.error('Lỗi khi cập nhật danh mục:', error);
      res.status(500).json({ error: 'Lỗi khi cập nhật danh mục' });
    } else {
      res.status(200).json({ message: 'Danh mục được cập nhật thành công' });
    }
  });
};

// Delete a category
export const deleteCategory = (req, res) => {
  const categoryId = req.params.id;
  const query = 'DELETE FROM Categories WHERE ID = ?';

  dbConnection.query(query, [categoryId], (error, result) => {
    if (error) {
      console.error('Lỗi khi xóa danh mục:', error);
      res.status(500).json({ error: 'Lỗi khi xóa danh mục' });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Danh mục không được tìm thấy' });
      } else {
        res.status(200).json({ message: 'Danh mục đã được xóa thành công' });
      }
    }
  });
};

// Đảm bảo đóng kết nối sau khi xử lý xong các yêu cầu
process.on('exit', () => {
  dbConnection.end();
});
