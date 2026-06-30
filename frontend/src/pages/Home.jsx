import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import BlogCard from '../components/BlogCard';
import CreateBlog from './CreateBlog';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');

  const fetchBlogs = async () => {
    try {
      const response = await API.get('/blogs');
      setBlogs(response.data);
      setFilteredBlogs(response.data); 
    } catch (error) {
      console.error('Error loading blogs:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const results = blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBlogs(results);
  }, [searchQuery, blogs]);

  return (
    <div style={styles.pageWrapper}>
      <nav style={styles.navbar}>
        <div style={styles.navContainer}>
          <div style={styles.logo}>
             <span style={styles.gradientText}>Blogging Hub</span>
          </div>

          <div style={styles.searchContainer}>
            <i className="fas fa-search" style={styles.searchIcon}></i>
            <input 
              type="text" 
              placeholder="Search pristine dashboards, modules..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
 
          </div>

          <button style={styles.createTriggerBtn} onClick={() => setIsModalOpen(true)}>
            <i className="fas fa-plus" style={styles.btnIcon}></i> 
            <span style={styles.btnText}>Create Blog</span>
          </button>
        </div>
      </nav>

      <CreateBlog 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onBlogAdded={fetchBlogs} 
      />

      <div style={styles.contentContainer}>
        {loading ? (
          <div style={styles.loader}>Loading operational viewports...</div>
        ) : filteredBlogs.length === 0 ? (
          <div style={styles.noData}>No records matching search query found.</div>
        ) : (
          <div style={styles.grid}>
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    backgroundColor: '#0b0f19',
  },
  navbar: {
    position: 'sticky',
    top: 0,
    background: 'rgba(11, 15, 25, 0.7)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    padding: '16px 0',
    zIndex: 1000,
  },
  navContainer: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'left',
    gap: '20px',
  },
  logo: {
    fontSize: '1.4rem',
    fontWeight: '800',
    color: '#ffffff',
    whiteSpace: 'nowrap',
  },
  gradientText: {
    background: 'white',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  searchContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    maxWidth: '500px',
  },
  searchIcon: {
    position: 'absolute',
    left: '16px',
    color: '#6b7280',
    fontSize: '0.95rem',
  },
  searchInput: {
    width: '100%',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    padding: '12px 16px 12px 45px',
    color: '#ffffff',
    outline: 'none',
    fontSize: '0.95rem',
    transition: 'border-color 0.2s',
  },
  filterBtn: {
    position: 'absolute',
    right: '8px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: 'none',
    borderRadius: '8px',
    width: '32px',
    height: '32px',
    color: '#9ca3af',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
createTriggerBtn: {
    background: 'linear-gradient(45deg, #0e1a43, #132738)',
    border: 'none',
    borderRadius: '12px',
    padding: '12px 20px',
    color: '#ffffff',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontSize: '0.95rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  btnIcon: {
    marginRight: '0px', 
  },
  btnText: {
    marginLeft: '8px',
    display: 'inline',
  },
  contentContainer: {
    maxWidth: '100%',
    margin: '40px 0 0 0',
    padding: '0 20px 60px 20px',
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    flexWrap: 'wrap',
    justifyContent: 'left',
  },
  loader: { textAlign: 'center', color: '#4facfe', padding: '60px 0' },
  noData: { textAlign: 'center', color: '#6b7280', padding: '60px 0' },
};

export default Home;