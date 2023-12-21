import createDatabaseConnection from '../config/database.js';


const dbConnection = createDatabaseConnection();

export const createBlog = async (req, res) => {
    const { Title, Description, ImageLink } = req.body;
    const currentDate = new Date();
    const query = 'INSERT INTO blog (title, description, img, date_create) VALUES (?, ?, ?,?)';
    dbConnection.query(query, [Title, Description, ImageLink, currentDate], (error, results) => {
        if (error) {
            console.error('Lỗi khi tạo blog:', error);
            res.status(500).json({ error: 'Lỗi khi tạo đơn blog' });
        } else {
            res.status(201).json(results.insertId);

        }

    });
};

export const getBlog = (req, res) => {
    const query = 'SELECT * FROM blog ORDER BY date_create DESC';
    dbConnection.query(query, (error, results) => {
        if (error) {
            console.error('Lỗi khi lấy thông tin blog:', error);
            res.status(500).json({ error: 'Lỗi khi lấy thông tin blog' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: 'blog không được tìm thấy' });
            } else {
                res.status(200).json(results);
            }
        }
    });
};




export const deleteBlog = (req, res) => {
    const blogId = req.params.id;
    console.log('====================================');
    console.log("id", blogId);
    console.log('====================================');
    const query = 'DELETE FROM blog WHERE id = ?';

    dbConnection.query(query, [blogId], (error, result) => {
        if (error) {
            console.error('Lỗi khi xóa blog:', error);
            res.status(500).json({ error: 'Lỗi khi xóa blog' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Blog không được tìm thấy' });
            } else {
                res.status(200).json({ message: 'Blog đã được xóa thành công' });
            }
        }
    });
};



export const getBlogByID = (req, res) => {
    const blogId = req.params.id;
    const query = 'SELECT * FROM blog WHERE ID = ?';
    dbConnection.query(query, [blogId], (error, results) => {
        if (error) {
            console.error('Lỗi khi lấy thông tin Blog:', error);
            res.status(500).json({ error: 'Lỗi khi lấy thông tin Blog' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: 'Blog không được tìm thấy' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    });
};



export const updateBlog = (req, res) => {
    const blogId = req.params.id;
    const { Title, Description, ImageLink } = req.body;

    const query = 'UPDATE blog SET title = ?, description = ?, img = ? WHERE id = ?';

    dbConnection.query(query, [Title, Description, ImageLink, blogId], (error, results) => {
        if (error) {
            console.error('Lỗi khi cập nhật blog:', error);
            res.status(500).json({ error: 'Lỗi khi cập nhật blog' });
        } else {
            if (results.affectedRows > 0) {
                res.status(200).json({ message: 'Blog đã được cập nhật thành công' });
            } else {
                res.status(404).json({ error: 'Không tìm thấy blog' });
            }
        }
    });
};
