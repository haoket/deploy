import mysql from 'mysql';
import createDatabaseConnection from '../config/database.js';

const dbConnection = createDatabaseConnection();

// Get all cart items
export const getCart = (req, res) => {
  const query = 'SELECT * FROM cart c INNER JOIN Products p ON c.product_id = p.ID';

  dbConnection.query(query, (error, results) => {
    if (error) {
      console.error('Lỗi khi lấy danh sách các sản phẩm trong giỏ hàng:', error);
      res.status(500).json({ error: 'Lỗi khi lấy danh sách các sản phẩm trong giỏ hàng' });
    } else {
      res.status(200).json(results);
    }
  });
};

// Get a single cart item by ID
export const getCartById = (req, res) => {
  const cartItemId = req.params.id;
  const query = 'SELECT * FROM cart WHERE cart_id = ?';

  dbConnection.query(query, [cartItemId], (error, results) => {
    if (error) {
      console.error('Lỗi khi lấy thông tin sản phẩm trong giỏ hàng:', error);
      res.status(500).json({ error: 'Lỗi khi lấy thông tin sản phẩm trong giỏ hàng' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'Sản phẩm trong giỏ hàng không được tìm thấy' });
      } else {
        res.status(200).json(results[0]);
      }
    }
  });
};


// export const getProductsByCategory = async (req, res) => {
//   const productSlug = req.params.slug;

//   // Tìm tên danh mục (category) bằng slug
//   dbConnection.query('SELECT Name FROM categories WHERE slug = ?', [productSlug], (error, categoryResults) => {
//     if (error) {
//       console.error('Lỗi khi truy vấn cơ sở dữ liệu:', error);
//       res.status(500).json({ error: 'Lỗi khi lấy thông tin danh mục' });
//     } else {
//       if (categoryResults.length === 0) {
//         res.status(404).json({ message: 'Danh mục không được tìm thấy' });
//         return;
//       }

//       const categoryName = categoryResults[0].Name;

//       // Tìm danh sách sản phẩm bằng tên danh mục
//       dbConnection.query('SELECT * FROM products WHERE category = ?', [categoryName], (error, productResults) => {
//         if (error) {
//           console.error('Lỗi khi truy vấn cơ sở dữ liệu:', error);
//           res.status(500).json({ error: 'Lỗi khi lấy thông tin sản phẩm' });
//         } else {

//           res.status(200).json(productResults);

//         }
//       });
//     }
//   });
// };

// Create a new cart item
export const createCart = (req, res) => {
  const { product_id, quantity, price } = req.body;
  //   // Tìm tên danh mục (category) bằng slug
  dbConnection.query('SELECT * FROM cart WHERE product_id = ?', [product_id], (error, categoryResults) => {
    if (error) {
      console.error('Lỗi khi truy vấn cơ sở dữ liệu:', error);
      res.status(500).json({ error: 'Lỗi khi lấy thông tin giỏ hàng' });
    } else {
      if (categoryResults.length === 0) {

        const query = 'INSERT INTO cart ( product_id, quantity, price) VALUES ( ?, ?,?)';

        dbConnection.query(query, [product_id, quantity, price], (error) => {
          if (error) {
            console.error('Lỗi khi tạo sản phẩm trong giỏ hàng:', error);
            res.status(500).json({ error: 'Lỗi khi tạo sản phẩm trong giỏ hàng' });
          } else {
            res.status(201).json({ message: 'Sản phẩm trong giỏ hàng được tạo thành công' });
          }
        });

        return;
      } else {
        const query = 'UPDATE cart SET price = ?, quantity = ? WHERE cart_id = ?';
        const newPrice = price + categoryResults[0].price;
        const newQuantity = categoryResults[0].quantity + quantity;

        dbConnection.query(query, [newPrice, newQuantity, categoryResults[0].cart_id], (error) => {
          if (error) {
            console.error('Lỗi khi cập nhật sản phẩm trong giỏ hàng:', error);
            res.status(500).json({ error: 'Lỗi khi cập nhật sản phẩm trong giỏ hàng' });
          } else {
            res.status(200).json({ message: 'Sản phẩm trong giỏ hàng được cập nhật thành công' });
          }
        });
      }


    }
  })
}





// Update a cart item
export const updateCart = (req, res) => {
  const cartItemId = req.params.id;
  const { id, product_id, name, price, quantity } = req.body;
  const query = 'UPDATE cart SET id = ?, product_id = ?, name = ?, price = ?, quantity = ? WHERE cart_id = ?';

  dbConnection.query(query, [id, product_id, name, price, quantity, cartItemId], (error) => {
    if (error) {
      console.error('Lỗi khi cập nhật sản phẩm trong giỏ hàng:', error);
      res.status(500).json({ error: 'Lỗi khi cập nhật sản phẩm trong giỏ hàng' });
    } else {
      res.status(200).json({ message: 'Sản phẩm trong giỏ hàng được cập nhật thành công' });
    }
  });
};

// Delete a cart item
export const deleteCart = (req, res) => {
  const cartItemId = req.params.id;
  const query = 'DELETE FROM cart WHERE cart_id = ?';

  dbConnection.query(query, [cartItemId], (error, result) => {
    if (error) {
      console.error('Lỗi khi xóa sản phẩm trong giỏ hàng:', error);
      res.status(500).json({ error: 'Lỗi khi xóa sản phẩm trong giỏ hàng' });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Sản phẩm trong giỏ hàng không được tìm thấy' });
      } else {
        res.status(200).json({ message: 'Sản phẩm trong giỏ hàng đã được xóa thành công' });
      }
    }
  });
};
export const deleteAllCart = (req, res) => {
  const query = 'DELETE FROM cart';

  dbConnection.query(query, (error, result) => {
    if (error) {
      console.error('Lỗi khi xóa sản phẩm trong giỏ hàng:', error);
      res.status(500).json({ error: 'Lỗi khi xóa sản phẩm trong giỏ hàng' });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Sản phẩm trong giỏ hàng không được tìm thấy' });
      } else {
        res.status(200).json({ message: 'Sản phẩm trong giỏ hàng đã được xóa thành công' });
      }
    }
  });
};


// Đảm bảo đóng kết nối sau khi xử lý xong các yêu cầu
process.on('exit', () => {
  dbConnection.end();
});
