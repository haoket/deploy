import sql from "mssql";
import config from "../config/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createDatabaseConnection from "../config/database.js";
export const loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!" });
  }
};

// Register a new User

export const Register = async (req, res) => {
  const { password, email, phone, name, address } = req.body;
  const role = 'user';
  const hashedPassword = bcrypt.hashSync(password, 10);
  const created_at = new Date().toLocaleString();
  try {
    const dbConnection = createDatabaseConnection();

    dbConnection.connect((err) => {
      if (err) {
        console.error('Lỗi kết nối cơ sở dữ liệu:', err);
        res.status(500).json({ error: 'Lỗi kết nối cơ sở dữ liệu' });
        return;
      }

      // Thay đổi câu lệnh SQL để phù hợp với MySQL
      const insertUserQuery = `INSERT INTO users (name, address, phone, password, email, created_at, role) VALUES (?, ?, ?,?,?,?,?)`;
      dbConnection.query(insertUserQuery, [name, address, phone, hashedPassword, email, created_at, role], (error, results) => {
        if (error) {
          console.error('Lỗi khi thêm người dùng:', error);
          res.status(500).json({ error: 'Lỗi khi thêm người dùng' });
        } else {
          res.status(200).send({ message: 'Người dùng đã được tạo thành công' });
        }

        // Đóng kết nối sau khi hoàn thành
        dbConnection.end();
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Có lỗi xảy ra khi tạo người dùng' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const dbConnection = createDatabaseConnection();

    dbConnection.connect((err) => {

      if (err) {
        console.error('Lỗi kết nối cơ sở dữ liệu:', err);
        res.status(500).json({ error: 'Lỗi kết nối cơ sở dữ liệu' });
        return;
      }


      const selectUserQuery = `SELECT * FROM users WHERE email = ?`;

      dbConnection.query(selectUserQuery, [email], (error, results) => {

        if (error) {
          console.error('Lỗi khi truy vấn người dùng:', error);
          res.status(500).json({ error: 'Lỗi khi truy vấn người dùng' });
        } else {
          const user = results[0];
          console.log('====================================');
          console.log(user.password);
          console.log('====================================');
          if (!user) {
            res.status(401).json({ error: 'Xác thực thất bại. Sai thông tin đăng nhập.' });
          } else {
            if (!bcrypt.compareSync(password, user.password)) {
              res.status(401).json({ error: 'Xác thực thất bại. Sai thông tin đăng nhập.' });
            } else {
              // Đúng thông tin đăng nhập, tạo và gửi token JWT ở đây
              const token = `JWT ${jwt.sign({ email: user.email }, 'judicious')}`;
              res.status(200).json({
                email: user.email,
                id: user.id,
                name: user.name,
                role: user.role,
                img: user.img,
                token: token,
              });
            }
          }
        }

        // Đóng kết nối sau khi hoàn thành
        dbConnection.end();
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Có lỗi xảy ra khi xác thực người dùng' });
  }
};