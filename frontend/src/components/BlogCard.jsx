import React from "react";
import { useNavigate } from "react-router-dom"; 

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div style={styles.card} onClick={() => navigate(`/blog/${blog._id}`)}>
      <div style={styles.meta}>
        <span>By {blog.author || "Anonymous"}</span>
        <span>•</span>
        <span>{formatDate(blog.createdAt)}</span>
      </div>
      <h2 style={styles.title}>{blog.title}</h2>
      <p style={styles.description}>{blog.description}</p>
      <div style={styles.contentPreview}>
        {blog.content.substring(0, 150)}...
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: "rgba(255, 255, 255, 0.03)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "20px",
    transition: "transform 0.2s ease, border-color 0.2s ease",
    cursor: "pointer",
    width: "100%",
    maxWidth: "600px",
  },
  meta: {
    display: "flex",
    gap: "10px",
    fontSize: "0.85rem",
    color: "#9ca3af",
    marginBottom: "12px",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "10px",
    letterSpacing: "-0.5px",
  },
  description: {
    fontSize: "1rem",
    color: "#9ca3af",
    lineHeight: "1.5",
    marginBottom: "14px",
  },
  contentPreview: {
    fontSize: "0.9rem",
    color: "#6b7280",
    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
    paddingTop: "12px",
  },
};

export default BlogCard;
