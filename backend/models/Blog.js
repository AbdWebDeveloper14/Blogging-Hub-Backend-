import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title Needed For the Blog Post.'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description Needed For the Blog Post.']
  },
  content: {
    type: String,
    required: [true, 'Main blog content Needed For the Blog Post.']
  },
  author: {
    type: String,
    default: 'Anonymous'
  }
}, { 
  timestamps: true 
});

const Blog = mongoose.model('Blog', BlogSchema);
export default Blog;