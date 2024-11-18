"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/PostPage.module.css";

export default function PostPage() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [expandedPost, setExpandedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategory("");
    setImage(null);
    setMessage("");
    setEditMode(false);
    setCurrentPost(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title && content && category && image) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("image", image);

      try {
        const url = editMode
          ? `http://localhost:8000/api/posts/${currentPost.id}`
          : "http://localhost:8000/api/posts";
        const method = editMode ? "PUT" : "POST";

        const response = await fetch(url, {
          method,
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        const result = await response.json();

        if (response.ok) {
          if (editMode) {
            setPosts(
              posts.map((post) => (post.id === currentPost.id ? result : post))
            );
            setMessage("Post updated successfully!");
          } else {
            setPosts([...posts, result]);
            setMessage("Post created successfully!");
          }
          resetForm(); // Reset form fields after submit
          setShowForm(false);
        } else {
          setMessage(result.message || "Failed to create or update post.");
        }
      } catch (error) {
        setMessage("An error occurred while creating or updating the post.");
        console.error(error);
      }
    } else {
      setMessage("Please fill out all fields.");
    }
  };

  const handleEdit = (post) => {
    setEditMode(true);
    setShowForm(true);
    setCurrentPost(post);
    setTitle(post.title);
    setContent(post.content);
    setCategory(post.category);
  };

  const handleDelete = async (postId) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/posts/${postId}`,
          {
            method: "DELETE",
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (response.ok) {
          setPosts(posts.filter((post) => post.id !== postId));
          setMessage("Post deleted successfully!");
        } else {
          const result = await response.json();
          setMessage(result.message || "Failed to delete post.");
        }
      } catch (error) {
        setMessage("An error occurred while deleting the post.");
        console.error(error);
      }
    }
  };

  const handleReadMore = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  return (
    <div className={styles.postPageContainer}>
      <div className={styles.buttonContainer}>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className={styles.createButton}
        >
          Create Post
        </button>
        <button
          onClick={() => setShowForm(false)}
          className={styles.manageButton}
        >
          Manage Posts
        </button>
      </div>

      {showForm ? (
        <div className={styles.createPostContainer}>
          <h2>{editMode ? "Edit Post" : "Create New Post"}</h2>
          {message && <p className={styles.message}>{message}</p>}
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a Category</option>
                <option value="tech">Tech</option>
                <option value="health">Health</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="education">Education</option>
                <option value="entertainment">Entertainment</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="image">Upload Image</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              {editMode ? "Update Post" : "Submit Post"}
            </button>
          </form>
        </div>
      ) : (
        <>
          <h2>Posts</h2>
          {posts.length > 0 ? (
            <div className={styles.postList}>
              {posts.map((post) => (
                <div key={post.id} className={styles.postCard}>
                  <h3>{post.title}</h3>
                  <p className={styles.category}>{post.category}</p>
                  <p>{post.content.substring(0, 150)}...</p>
                  {expandedPost === post.id && (
                    <div className={styles.fullContent}>
                      <p>{post.content}</p>
                    </div>
                  )}
                  <div className={styles.cardActions}>
                    <div className={styles.editDeleteButtons}>
                      <button
                        onClick={() => handleEdit(post)}
                        className={styles.editButton}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className={styles.deleteButton}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </div>
                    <button
                      onClick={() => handleReadMore(post.id)}
                      className={styles.readMoreButton}
                    >
                      {expandedPost === post.id ? "Show Less" : "Read More"}
                    </button>
                  </div>
                  <div className={styles.dateTime}>
                    <p>{new Date(post.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No posts available.</p>
          )}
        </>
      )}
    </div>
  );
}
