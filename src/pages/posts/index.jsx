import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import api from "../../api";

export default function PostIndex() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch posts data
  const fetchDataPosts = async () => {
    await api.get("/api/posts").then((response) => {
      setPosts(response.data.data.data);
    });
  };

  // Logout handler
  const logoutHandler = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios.post("http://localhost:8000/api/logout");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      navigate("/");
    } catch (error) {
      console.error("Gagal logout, coba lagi.");
    }
  };

  useEffect(() => {
    fetchDataPosts();
  }, []);

  const deletePost = async (id) => {
    await api.delete(`/api/posts/${id}`).then(() => {
      fetchDataPosts();
    });
  };

  return (
    <>
      {/* Navbar */}
      <div>
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
          <div className="container">
            <Link to="/" className="navbar-brand">
              Homepage
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    to="/posts"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Posts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/mcpe"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Minecraft
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <button
                    onClick={() => {
                      const isConfirmed = window.confirm(
                        "Are you sure you want to log out?"
                      );

                      if (isConfirmed) {
                        logoutHandler();
                      }
                    }}
                    className="btn btn-danger nav-link text-white"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div
        style={{
          backgroundImage:
            'url("https://i.pinimg.com/564x/1c/35/5a/1c355a72ace613f0134ac9d551397272.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                to="/posts/create"
                className="btn btn-md btn-success rounded shadow border-0 mb-3"
              >
                ADD NEW POST
              </Link>
              <div className="card border-0 rounded shadow">
                <div className="card-body">
                  <table className="table table-bordered">
                    <thead className="bg-dark text-white">
                      <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Content</th>
                        <th scope="col" style={{ width: "15%" }}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.length > 0 ? (
                        posts.map((post, index) => (
                          <tr key={index}>
                            <td className="text-center">
                              <img
                                src={post.image}
                                alt={post.title}
                                width="200"
                                className="rounded"
                              />
                            </td>
                            <td>{post.title}</td>
                            <td>{post.content}</td>
                            <td className="text-center">
                              <Link
                                to={`/posts/edit/${post.id}`}
                                className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2"
                              >
                                EDIT
                              </Link>
                              <button
                                onClick={() => {
                                  const isConfirmed = window.confirm(
                                    "Are you sure you want to delete this post?"
                                  );

                                  if (isConfirmed) {
                                    deletePost(post.id);
                                  }
                                }}
                                className="btn btn-sm btn-danger rounded-sm shadow border-0"
                              >
                                DELETE
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">
                            <div className="alert alert-danger mb-0">
                              Data Belum Tersedia!
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
