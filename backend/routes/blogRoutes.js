import express from 'express';
import { createBlog, getBlogs, getBlogById, deleteBlog, updateBlog } from '../controllers/blogController.js';
const router = express.Router();

router.route('/').get(getBlogs).post(createBlog);

router.route('/:id').get(getBlogById).delete(deleteBlog).put(updateBlog);

export default router;