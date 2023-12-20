import {
    createBlog,
    getBlog,
    deleteBlog,
    getBlogByID,
    updateBlog

} from '../controllers/blogController.js';

const blogRoute = (app) => {
    app.route('/create-blog')
        .post(createBlog);
    app.route('/blog')
        .get(getBlog);
    app.route('/delete-blog/:id')
        .delete(deleteBlog);
    app.route('/getBlogById/:id')
        .get(getBlogByID);
    app.route('/update-blog/:id')
        .put(updateBlog);
};

export default blogRoute;
