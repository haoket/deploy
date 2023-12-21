import sql from 'mssql';
import config from '../config/config.js';
import createDatabaseConnection from '../config/database.js';

const dbConnection = createDatabaseConnection();


// Create a new order
export const createOrder = async (req, res) => {
  const { CustomerID, name, TotalAmount, address, email, method_payment, message, phone, date_create, isPaid, date_payment } = req.body;
  const query = 'INSERT INTO orders (CustomerID,name , TotalAmount, address,email, method_payment, message, phone, date_create, status, isPaid, date_payment) VALUES (?, ?, ?,?, ?, ?, ?, ?,?, 0, ?, ?)';
  dbConnection.query(query, [CustomerID, name, TotalAmount, address, email, method_payment, message, phone, date_create, isPaid, date_payment], (error, results) => {
    if (error) {
      console.error('Lỗi khi tạo sản phẩm:', error);
      res.status(500).json({ error: 'Lỗi khi tạo đơn hàng' });
    } else {
      res.status(201).json(results.insertId);

    }

  });


};
export const createOrderItem = async (req, res) => {
  const { ProductID, OrderID, Quantity, Price } = req.body;
  const query = 'INSERT INTO orderitems (ProductID,OrderID , Quantity, Price) VALUES (?, ?, ?,?)';
  dbConnection.query(query, [ProductID, OrderID, Quantity, Price], (error, results) => {
    if (error) {
      console.error('Lỗi khi tạo sản phẩm đơn hàng', error);
      res.status(500).json({ error: 'Lỗi khi tạo sản phẩm đơn hàng' });
    } else {
      res.status(201).json(results);

    }

  });
};







// Get all orders
export const getOrders = async (req, res) => {
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool.request().query('SELECT * FROM orders');
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: `An error occurred while retrieving orders... ${error.message}` });
  } finally {
    // sql.close();
  }
};

// Get a single order by ID
export const getOrderById = async (req, res) => {
  const orderId = req.params.id;

  try {
    const pool = await sql.connect(config.sql);
    const result = await pool.request()
      .input('orderId', sql.Int, orderId)
      .query('SELECT * FROM orders WHERE ID = @orderId');

    if (!result.recordset[0]) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      res.status(200).json(result.recordset[0]);
    }
  } catch (error) {
    res.status(500).json({ error: `An error occurred while retrieving the order... ${error.message}` });
  } finally {
    // sql.close();
  }
};




export const getOrderByIDCustomer = async (req, res) => {
  const userID = req.query.id;
  const query = `
    SELECT
      o.id AS ID,
      o.status AS Status,
      o.isPaid AS isPaid,
      o.date_create AS date_create,
      oi.ProductID,
      oi.Quantity,
      oi.Price,
      o.TotalAmount,
      p.name AS Name,
      p.ImageLink AS img
    FROM orders o
    JOIN orderitems oi ON o.id = oi.OrderID
    JOIN products p ON oi.ProductID = p.ID
    WHERE o.CustomerID = ?;
  `;

  // Thực hiện truy vấn SQL sử dụng thư viện database hoặc driver SQL của bạn ở đây
  dbConnection.query(query, [userID], (error, results) => {
    if (error) {
      console.error('Lỗi khi thực hiện truy vấn SQL:', error);
      res.status(500).json({ error: 'Lỗi khi thực hiện truy vấn SQL' });
    } else {
      // Xử lý kết quả trả về để tạo JSON theo định dạng mong muốn
      const ordersWithProducts = {};
      results.forEach((row) => {
        if (!ordersWithProducts[row.ID]) {
          ordersWithProducts[row.ID] = {
            ID: row.ID,
            TotalAmount: row.TotalAmount,
            date_create: row.date_create,
            Status: row.Status,
            isPaid: row.isPaid,
            products: [],
          };
        }
        ordersWithProducts[row.ID].products.push({
          ProductID: row.ProductID,
          Quantity: row.Quantity,
          Price: row.Price,
          Name: row.Name,
          img: row.img
        });
      });

      // Chuyển đổi kết quả thành JSON và gửi về cho client
      res.status(200).json(Object.values(ordersWithProducts));
    }
  });
};

export const getOrderByStatus = async (req, res) => {
  const status = req.query.status || 0;
  const userID = req.query.id;
  const query = `
    SELECT
      o.id AS ID,
     
      oi.ProductID,
      oi.Quantity,
      oi.Price,
      o.TotalAmount,
      p.name AS Name,
      p.ImageLink AS img
    FROM orders o
    JOIN orderitems oi ON o.id = oi.OrderID
    JOIN products p ON oi.ProductID = p.ID
    WHERE o.status = ? AND o.CustomerID = ?;
  `;

  // Thực hiện truy vấn SQL sử dụng thư viện database hoặc driver SQL của bạn ở đây
  dbConnection.query(query, [status, userID], (error, results) => {
    if (error) {
      console.error('Lỗi khi thực hiện truy vấn SQL:', error);
      res.status(500).json({ error: 'Lỗi khi thực hiện truy vấn SQL' });
    } else {
      // Xử lý kết quả trả về để tạo JSON theo định dạng mong muốn
      const ordersWithProducts = {};
      results.forEach((row) => {
        if (!ordersWithProducts[row.ID]) {
          ordersWithProducts[row.ID] = {
            ID: row.ID,
            TotalAmount: row.TotalAmount,
            products: [],
          };
        }
        ordersWithProducts[row.ID].products.push({
          ProductID: row.ProductID,
          Quantity: row.Quantity,
          Price: row.Price,
          Name: row.Name,
          img: row.img
        });
      });

      // Chuyển đổi kết quả thành JSON và gửi về cho client
      res.status(200).json(Object.values(ordersWithProducts));
    }
  });
};
export const getAllOrder = async (req, res) => {
  const status = req.query.status || 0;
  const userID = req.query.id;
  const query = `
        SELECT
        o.id AS ID,
        o.CustomerID,
        oi.ProductID,
        oi.Quantity,
        oi.Price,
        o.status,
        o.date_create,
        o.message,
        o.email,
        o.phone,
        o.TotalAmount,
        p.name AS Name, 
        p.ImageLink AS img,
        u.name AS name
      FROM
        orders o
      JOIN 
        orderitems oi ON o.id = oi.OrderID
      JOIN 
        products p ON oi.ProductID = p.ID
      JOIN
        users u ON o.CustomerID = u.ID;
    
  `;

  // Thực hiện truy vấn SQL sử dụng thư viện database hoặc driver SQL của bạn ở đây
  dbConnection.query(query, [status, userID], (error, results) => {
    if (error) {
      console.error('Lỗi khi thực hiện truy vấn SQL:', error);
      res.status(500).json({ error: 'Lỗi khi thực hiện truy vấn SQL' });
    } else {
      console.log('====================================');
      console.log(results);
      console.log('====================================');
      // Xử lý kết quả trả về để tạo JSON theo định dạng mong muốn
      const ordersWithProducts = {};
      results.forEach((row) => {
        if (!ordersWithProducts[row.ID]) {
          ordersWithProducts[row.ID] = {
            ID: row.ID,
            TotalAmount: row.TotalAmount,
            products: [],
            CustomerID: row.CustomerID,
            name: row.name,
            email: row.email,
            status: row.status,
            date_create: row.date_create,
            message: row.message,
            phone: row.phone
          };
        }
        ordersWithProducts[row.ID].products.push({
          ProductID: row.ProductID,
          Quantity: row.Quantity,
          Price: row.Price,
          Name: row.Name,
          img: row.img
        });
      });

      // Chuyển đổi kết quả thành JSON và gửi về cho client
      res.status(200).json(Object.values(ordersWithProducts));
    }
  });
};



// Update an order
export const updateOrder = async (req, res) => {
  const orderId = req.params.id;
  const { CustomerID, OrderDate, TotalAmount } = req.body;

  try {
    const pool = await sql.connect(config.sql);
    const result = await pool.request()
      .input('orderId', sql.Int, orderId)
      .input('CustomerID', sql.Int, CustomerID)
      .input('OrderDate', sql.Date, OrderDate)
      .input('TotalAmount', sql.Decimal, TotalAmount)
      .query('UPDATE orders SET CustomerID = @CustomerID, OrderDate = @OrderDate, TotalAmount = @TotalAmount WHERE ID = @orderId');

    res.status(200).json({ message: 'Order updated successfully' });
  } catch (error) {
    res.status(500).json({ error: `An error occurred while updating the order... ${error.message}` });
  } finally {
    // sql.close();
  }
};


export const updateStatusOrder = async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  const query = 'UPDATE orders SET status = ? WHERE ID = ?';

  dbConnection.query(query, [status, orderId], (error) => {
    if (error) {
      console.error('Lỗi khi cập nhật sản phẩm:', error);
      res.status(500).json({ error: 'Lỗi khi cập nhật sản phẩm' });
    } else {
      res.status(200).json({ message: 'Sản phẩm được cập nhật thành công' });
    }
  });
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const pool = await sql.connect(config.sql);
    const result = await pool.request()
      .input('orderId', sql.Int, orderId)
      .query('DELETE FROM orders WHERE ID = @orderId');

    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      res.status(200).json({ message: 'Order deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: `An error occurred while deleting the order... ${error.message}` });
  } finally {
    // sql.close();
  }
};
