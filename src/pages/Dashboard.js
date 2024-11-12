import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode"; // Corrected named import for jwtDecode

function Dashboard() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Function to decode JWT and fetch user data
  const decodeTokenAndFetchUser = () => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Corrected use of jwtDecode
        console.log(decodedToken);

        setUser(decodedToken);
        setLoading(false);
      } catch (error) {
        setError("Token tidak valid, silakan login kembali.");
        setLoading(false);
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    decodeTokenAndFetchUser();
  }, [navigate, token]);

  // Logout handler
  const logoutHandler = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios.post("http://localhost:8000/api/logout");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      navigate("/");
    } catch (error) {
      setError("Gagal logout, coba lagi.");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/posts" className="nav-link">
                  Posts
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/mcpe" className="nav-link">
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

      {/* Main Content */}
      <div
        style={{
          backgroundImage:
            'url("https://i.pinimg.com/564x/1c/35/5a/1c355a72ace613f0134ac9d551397272.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="p-5 mb-4 bg-light bg-opacity-75 rounded-3 shadow-lg">
          <div className="container-fluid py-5 text-center">
            <h1 className="display-5 fw-bold">REACT (VITE) + LARAVEL 11</h1>
            <p className="col-md-8 fs-4 mx-auto">Hoirul Anam (2312010003)</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
