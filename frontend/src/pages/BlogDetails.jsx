import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

const BlogDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("view"); 
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    content: "",
    author: "",
  });

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await API.get(`/blogs/${id}`);
        setBlog(response.data);
        setEditData(response.data); 
      } catch (error) {
        console.error("Error fetching individual record:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogData();
  }, [id]);

const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const response = await API.put(`/blogs/${id}`, editData);
    
    setBlog(response.data);
    
    setActiveTab('view');
  } catch (error) {
    console.error('Error committing structural updates:', error.message);
    alert('System failure during data update routine execution.');
  }
};
  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you absolutely sure you want to completely destroy this module from the database grid?"
      )
    ) {
      try {
        await API.delete(`/blogs/${id}`);
        navigate("/");
      } catch (error) {
        console.error("Error executing deletion:", error.message);
      }
    }
  };

  if (loading)
    return <div style={styles.loader}>Accessing database schemas...</div>;
  if (!blog)
    return (
      <div style={styles.loader}>Module not found inside live collections.</div>
    );

  return (
    <div style={styles.dashboardContainer}>
      <aside style={styles.sidebar}>
        <div style={styles.backWrapper} onClick={() => navigate("/")}>
          <i className="fas fa-arrow-left"></i> Back To Blogs
        </div>
        <div style={styles.tabList}>
          <button
            style={{
              ...styles.tabBtn,
              ...(activeTab === "view" ? styles.activeTabBtn : {}),
            }}
            onClick={() => setActiveTab("view")}
          >
            <i className="fas fa-eye" style={styles.tabIcon}></i> View Full Blog
          </button>

          <button
            style={{
              ...styles.tabBtn,
              ...(activeTab === "edit" ? styles.activeTabBtn : {}),
            }}
            onClick={() => setActiveTab("edit")}
          >
            <i className="fas fa-edit" style={styles.tabIcon}></i> Edit Blog
          </button>

          <button
            style={{
              ...styles.tabBtn,
              ...(activeTab === "delete" ? styles.deleteTabBtn : {}),
            }}
            onClick={() => setActiveTab("delete")}
          >
            <i className="fas fa-trash-alt" style={styles.tabIcon}></i> Delete Blog
          </button>
        </div>
      </aside>

      <main style={styles.mainViewport}>
        {activeTab === "view" && (
          <article style={styles.articleWrapper}>
            <h1 style={styles.articleTitle}>{blog.title}</h1>
            <div style={styles.metaRow}>
              <span>
                Engineered by:{" "}
                <strong style={{ color: "#ffffff" }}>
                  {blog.author || "Anonymous"}
                </strong>
              </span>
              <span>•</span>
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
            <p style={styles.articleDesc}>{blog.description}</p>
            <div style={styles.articleBody}>{blog.content}</div>
          </article>
        )}

        {activeTab === "edit" && (
          <div style={styles.actionPanel}>
            <h2 style={styles.panelHeader}>Modify Component Parameters</h2>
            <form onSubmit={handleUpdate} style={styles.editForm}>
              <input
                type="text"
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
                style={styles.input}
                required
              />
              <input
                type="text"
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                style={styles.input}
                required
              />
              <textarea
                value={editData.content}
                onChange={(e) =>
                  setEditData({ ...editData, content: e.target.value })
                }
                style={styles.textarea}
                rows="10"
                required
              />
              <button type="submit" style={styles.saveBtn}>
                Commit Dynamic Overrides
              </button>
            </form>
          </div>
        )}

        {activeTab === "delete" && (
          <div style={styles.dangerPanel}>
            <h2 style={{ color: "#ef4444", marginBottom: "15px" }}>
              System Destruction Authorization
            </h2>
            <p
              style={{
                color: "#9ca3af",
                marginBottom: "25px",
                lineHeight: "1.6",
              }}
            >
              Warning: Executing this function completely wipes this record from
              the MongoDB Atlas server cluster. This operational routine cannot
              be inverted.
            </p>
            <button onClick={handleDelete} style={styles.destroyBtn}>
              Execute Absolute Purge
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

const styles = {
  dashboardContainer: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#0b0f19",
  },
  sidebar: {
    width: "260px",
    background: "rgba(20, 27, 45, 0.4)",
    backdropFilter: "blur(10px)",
    borderRight: "1px solid rgba(255, 255, 255, 0.05)",
    padding: "30px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
    position: "sticky",
    top: 0,
    height: "100vh",
  },
  backWrapper: {
    color: "#4facfe",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  tabList: { display: "flex", flexDirection: "column", gap: "10px" },
  tabBtn: {
    background: "none",
    border: "none",
    borderRadius: "10px",
    padding: "14px 16px",
    color: "#9ca3af",
    textAlign: "left",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "all 0.2s",
  },
  activeTabBtn: {
    background: "rgba(255, 255, 255, 0.04)",
    color: "#00f2fe",
    borderLeft: "3px solid #00f2fe",
  },
  deleteTabBtn: {
    color: "#ef4444",
    "&:hover": { background: "rgba(239, 68, 68, 0.05)" },
  },
  tabIcon: { marginRight: "12px", fontSize: "1rem" },
  mainViewport: { flex: 1, padding: "60px 50px", overflowY: "auto" },
  articleWrapper: { maxWidth: "750px" },
  articleTitle: {
    fontSize: "2.4rem",
    fontWeight: "800",
    marginBottom: "15px",
    color: "#ffffff",
    letterSpacing: "-1px",
  },
  metaRow: {
    display: "flex",
    gap: "15px",
    color: "#6b7280",
    fontSize: "0.9rem",
    marginBottom: "35px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    paddingBottom: "20px",
  },
  articleDesc: {
    fontSize: "1.2rem",
    color: "#9ca3af",
    lineHeight: "1.6",
    marginBottom: "25px",
    fontStyle: "italic",
  },
  articleBody: {
    fontSize: "1.1rem",
    color: "#e5e7eb",
    lineHeight: "1.8",
    whiteSpace: "pre-wrap",
  },
  actionPanel: { maxWidth: "700px" },
  panelHeader: { fontSize: "1.6rem", color: "#ffffff", marginBottom: "25px" },
  editForm: { display: "flex", flexDirection: "column", gap: "15px" },
  input: {
    background: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "10px",
    padding: "14px",
    color: "#ffffff",
    fontSize: "1rem",
    outline: "none",
  },
  textarea: {
    background: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "10px",
    padding: "14px",
    color: "#ffffff",
    fontSize: "1rem",
    outline: "none",
    resize: "none",
  },
  saveBtn: {
    background: 'linear-gradient(45deg, #0e1a43, #132738)',
    border: "none",
    borderRadius: "10px",
    padding: "15px",
    color: "#ffffff",
    fontWeight: "600",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "10px",
  },
  dangerPanel: {
    background: "rgba(239, 68, 68, 0.02)",
    border: "1px solid rgba(239, 68, 68, 0.15)",
    borderRadius: "16px",
    padding: "30px",
    maxWidth: "600px",
  },
  destroyBtn: {
    background: "#ef4444",
    border: "none",
    borderRadius: "10px",
    padding: "14px 24px",
    color: "#ffffff",
    fontWeight: "600",
    cursor: "pointer",
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    color: "#4facfe",
    fontSize: "1.2rem",
  },
};

export default BlogDetails;
