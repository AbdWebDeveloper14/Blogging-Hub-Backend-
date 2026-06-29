import Blog from '../models/Blog.js';


export const createBlog = async (req, res) => {
  try {
    const { title, description, content, author } = req.body;

    const newBlog = await Blog.create({
      title,
      description,
      content,
      author
    });

    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }); 
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found!' });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Invalid ID format or Server Error!' });
  }
};


export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found!' });
    }
    await blog.deleteOne();
    res.status(200).json({ message: 'Blog successfully deleted!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateBlog = async (req, res) => {
  try {
    const { title, description, content, author } = req.body;
    
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog schema matching ID not found' });
    }

    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.content = content || blog.content;
    blog.author = author || blog.author;

    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};