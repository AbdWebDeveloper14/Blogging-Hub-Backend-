import React, { useState } from 'react';
import API from '../api/axios';

const CreateBlog = ({ isOpen, onClose, onBlogAdded }) => {
  const [formData, setFormData] = useState({ title: '', description: '', content: '', author: '' });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/blogs', formData);
      setFormData({ title: '', description: '', content: '', author: '' });
      onBlogAdded(); 
      onClose(); 
    } catch (error) {
      console.error('Error creating blog:', error.message);
    }
  };

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h3 style={styles.formTitle}>Write a Pristine Article</h3>
          <button onClick={onClose} style={styles.closeBtn}><i className="fas fa-times"></i></button>
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input 
            type="text" 
            placeholder="Blog Title" 
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})} 
            style={styles.input} 
            required 
          />
          <input 
            type="text" 
            placeholder="Short Description" 
            value={formData.description} 
            onChange={(e) => setFormData({...formData, description: e.target.value})} 
            style={styles.input} 
            required 
          />
          <textarea 
            placeholder="Main Content Structure..." 
            value={formData.content} 
            onChange={(e) => setFormData({...formData, content: e.target.value})} 
            style={styles.textarea} 
            rows="6" 
            required 
          />
          <input 
            type="text" 
            placeholder="Author Name" 
            value={formData.author} 
            onChange={(e) => setFormData({...formData, author: e.target.value})} 
            style={styles.input} 
          />
          <button type="submit" style={styles.btn}>Publish Engine</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(5, 8, 16, 0.8)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
  },
  modalContent: {
    background: 'rgba(20, 27, 45, 0.7)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '24px',
    padding: '35px',
    width: '100%',
    maxWidth: '550px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'between',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '25px',
  },
  formTitle: {
    fontSize: '1.4rem',
    color: '#ffffff',
    fontWeight: '600',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#9ca3af',
    fontSize: '1.2rem',
    cursor: 'pointer',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    padding: '14px 18px',
    color: '#ffffff',
    fontSize: '1rem',
    outline: 'none',
  },
  textarea: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    padding: '14px 18px',
    color: '#ffffff',
    fontSize: '1rem',
    outline: 'none',
    resize: 'none',
  },
  btn: {
    background: 'linear-gradient(45deg, #0e1a43, #132738)',
    border: 'none',
    borderRadius: '12px',
    padding: '15px',
    color: '#ffffff',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px',
  }
};

export default CreateBlog;