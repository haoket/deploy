
import createDatabaseConnection from '../config/database.js';

const dbConnection = createDatabaseConnection();
// Create a new product
export const createProduct = (req, res) => {
  console.log('====================================');
  console.log("req", req.body);
  console.log('====================================');
  const { Name, Description, Price, Quantity, Category, Stars, ImageLink } = req.body;
  const currentDate = new Date();
  const imageLinkJSON = JSON.stringify(ImageLink);

  const query = 'INSERT INTO Products (Name, Description, Price, Quantity, Category, Stars, ImageLink, date_create) VALUES (?, ?, ?,?, ?, ?, ?,?)';

  dbConnection.query(query, [Name, Description, Price, Quantity, Category, Stars, imageLinkJSON, currentDate], (error) => {
    if (error) {
      console.error('Lỗi khi tạo sản phẩm:', error);
      res.status(500).json({ error: 'Lỗi khi tạo sản phẩm' });
    } else {
      res.status(201).json({ message: 'Sản phẩm được tạo thành công' });
    }
  });
};

// Update a product
export const updateProduct = (req, res) => {
  console.log('====================================');
  console.log("req", req.body);
  console.log('====================================');
  const productId = req.params.id;
  const { Name, Description, Price, Quantity, Category, ImageLink } = req.body;
  const imageLinkJSON = JSON.stringify(ImageLink);
  const query = 'UPDATE Products SET Name = ?, Description = ?, Price = ?, Quantity = ?, Category = ?, ImageLink = ? WHERE ID = ?';

  dbConnection.query(query, [Name, Description, Price, Quantity, Category, imageLinkJSON, productId], (error) => {
    if (error) {
      console.error('Lỗi khi cập nhật sản phẩm:', error);
      res.status(500).json({ error: 'Lỗi khi cập nhật sản phẩm' });
    } else {
      res.status(200).json({ message: 'Sản phẩm được cập nhật thành công' });
    }
  });
};




export const getProductById = (req, res) => {
  const productId = req.params.id;
  const query = 'SELECT * FROM Products WHERE ID = ?';
  dbConnection.query(query, [productId], (error, results) => {
    if (error) {
      console.error('Lỗi khi lấy thông tin sản phẩm:', error);
      res.status(500).json({ error: 'Lỗi khi lấy thông tin sản phẩm' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'Sản phẩm không được tìm thấy' });
      } else {
        res.status(200).json(results[0]);
      }
    }
  });
};

export const getProductsByCategory = async (req, res) => {
  const productSlug = req.params.slug;

  // Tìm tên danh mục (category) bằng slug
  dbConnection.query('SELECT Name FROM categories WHERE slug = ?', [productSlug], (error, categoryResults) => {
    if (error) {
      console.error('Lỗi khi truy vấn cơ sở dữ liệu:', error);
      res.status(500).json({ error: 'Lỗi khi lấy thông tin danh mục' });
    } else {
      if (categoryResults.length === 0) {
        res.status(404).json({ message: 'Danh mục không được tìm thấy' });
        return;
      }

      const categoryName = categoryResults[0].Name;

      // Tìm danh sách sản phẩm bằng tên danh mục
      dbConnection.query('SELECT * FROM products WHERE category = ?', [categoryName], (error, productResults) => {
        if (error) {
          console.error('Lỗi khi truy vấn cơ sở dữ liệu:', error);
          res.status(500).json({ error: 'Lỗi khi lấy thông tin sản phẩm' });
        } else {

          res.status(200).json(productResults);

        }
      });
    }
  });
};



// Delete a product
export const deleteProduct = (req, res) => {
  const productId = req.params.id;
  const query = 'DELETE FROM Products WHERE ID = ?';

  dbConnection.query(query, [productId], (error, result) => {
    if (error) {
      console.error('Lỗi khi xóa sản phẩm:', error);
      res.status(500).json({ error: 'Lỗi khi xóa sản phẩm' });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Sản phẩm không được tìm thấy' });
      } else {
        res.status(200).json({ message: 'Sản phẩm đã được xóa thành công' });
      }
    }
  });
};
export const getProducts = (req, res) => {
  const query = 'SELECT * FROM Products ORDER BY date_create DESC';
  dbConnection.query(query, (error, results) => {
    if (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm:', error);
      res.status(500).json({ error: 'Lỗi khi lấy danh sách sản phẩm' });
    } else {
      res.status(200).json(results);
    }
  });
};



export const uploadImage = (req, res) => {
  if (req.file) {
    const uploadedImageName = req.file.filename;
    console.log('====================================');
    console.log(uploadedImageName);
    console.log('====================================');
    res.json({ fileName: uploadedImageName });
  } else {
    res.status(400).send('Không có hình ảnh được tải lên.');
  }
}


export const searchProduct = (req, res) => {
  const itemSearch = req.params.name;
  const keywords = itemSearch.split(' ');

  // Tạo điều kiện SQL với nhiều từ khóa
  const conditions = keywords.map(keyword => "Name LIKE ?").join(' AND ');
  const query = `SELECT * FROM products WHERE ${conditions}`;
  const queryParams = keywords.map(keyword => `%${keyword}%`);
  dbConnection.query(query, queryParams, (error, results) => {
    console.log('====================================');
    console.log("results");
    console.log('====================================');
    if (error) {
      console.error('Lỗi khi lấy thông tin sản phẩm:', error);
      res.status(500).json({ error: 'Lỗi khi lấy thông tin sản phẩm' });
    } else {
      if (results.length === 0) {

        res.status(404).json({ message: 'Sản phẩm không được tìm thấy' });
      } else {
        res.status(200).json(results);
      }
    }
  });
};

export const getProductsPriceDesc = (req, res) => {
  const query = 'SELECT * FROM Products ORDER BY Price DESC';
  dbConnection.query(query, (error, results) => {
    if (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm:', error);
      res.status(500).json({ error: 'Lỗi khi lấy danh sách sản phẩm' });
    } else {
      res.status(200).json(results);
    }
  });
};

export const getProductsPriceAsc = (req, res) => {
  const query = 'SELECT * FROM Products ORDER BY Price ASC';
  dbConnection.query(query, (error, results) => {
    if (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm:', error);
      res.status(500).json({ error: 'Lỗi khi lấy danh sách sản phẩm' });
    } else {
      res.status(200).json(results);
    }
  });
};
export const commentProduct = (req, res) => {

  const id_user = req.body.commentData.id_user;
  const id_product = req.body.commentData.id_product;
  const content = req.body.commentData.content;
  const date_create = new Date();
  const query = 'INSERT INTO comment(id_user,product_id, content, date_create) VALUES (?, ?, ?, ?)';
  dbConnection.query(query, [id_user, id_product, content, date_create], (error, results) => {
    if (error) {
      console.error('Lỗi khi bình luận', error);
      res.status(500).json({ error: 'Lỗi khi tạo bình luận' });
    } else {
      res.status(200).json(results);
    }
  });
};


export const getAllComment = (req, res) => {
  const query = 'SELECT comment.id, comment.id_user, comment.product_id, products.Name AS product_name, comment.content, comment.content_reply, users.address,  users.email, users.name,  users.phone FROM comment INNER JOIN users ON comment.id_user = users.id INNER JOIN products ON comment.product_id = products.id';
  dbConnection.query(query, (error, results) => {
    if (error) {
      console.error('Lỗi khi lấy danh sách bình luận:', error);
      res.status(500).json({ error: 'Lỗi khi lấy danh sách bình luận' });
    } else {
      res.status(200).json(results);
    }
  });
}

export const getCommentProduct = (req, res) => {
  const id = req.params.id;

  const query = 'SELECT * FROM comment INNER JOIN users ON comment.id_user = users.id where product_id = ?';
  dbConnection.query(query, [id], (error, results) => {
    if (error) {
      console.error('Lỗi khi lấy danh sách bình luận:', error);
      res.status(500).json({ error: 'Lỗi khi lấy danh sách bình luận' });
    } else {
      res.status(200).json(results);
    }
  });
};

export const replyComment = (req, res) => {
  const id = req.params.id;
  const content = req.body.replyContent;
  console.log('====================================');
  console.log("content", content);
  console.log('====================================');
  const query = 'UPDATE comment SET content_reply = ? WHERE id = ?';
  dbConnection.query(query, [content, id], (error, results) => {
    if (error) {
      console.error('Lỗi khi bình luận', error);
      res.status(500).json({ error: 'Lỗi khi bình luận' });
    } else {
      res.status(200).json("binh luan thanh cong");
    }
  });
};
export const deleteComment = (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM comment WHERE id = ?';

  dbConnection.query(query, [id], (error, result) => {
    if (error) {
      console.error('Lỗi khi xóa bình luận:', error);
      res.status(500).json({ error: 'Lỗi khi xóa bình luận' });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: ' không được tìm thấy' });
      } else {
        res.status(200).json({ message: 'đã được xóa thành công' });
      }
    }
  });
};