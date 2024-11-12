import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import api from "../../api";

export default function McpeIndex() {
  const [mcpe, setMcpe] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Function to fetch data
  const fetchDataMcpe = async () => {
    await api.get("/api/mcpe").then((response) => {
      setMcpe(response.data.data.data);
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
    fetchDataMcpe();
  }, []);

  const deleteMcpe = async (id) => {
    await api.delete(`/api/mcpe/${id}`).then(() => {
      fetchDataMcpe();
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
        }}
      >
        {/* Overlay for readability */}
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            padding: "20px",
            borderRadius: "8px",
            width: "90%",
            maxWidth: "1200px",
          }}
        >
          <div
            className="d-flex justify-content-between align-items-center mb-4"
            style={{ color: "white" }}
          >
            <h2 className="fw-bold">MCPE Items</h2>
            <Link to="/mcpe/create" className="btn btn-success rounded shadow">
              ADD NEW MCPE ITEM
            </Link>
          </div>
          <div className="row">
            {mcpe.length > 0 ? (
              mcpe.map((item, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <div
                    className="card h-100 border-0 shadow-sm rounded"
                    style={{ minHeight: "450px" }}
                  >
                    <img
                      src={item.image}
                      alt={item.item}
                      className="card-img-top"
                      style={{
                        height: "250px",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title fw-bold">{item.item}</h5>
                      <p className="card-text text-muted">{item.deskripsi}</p>
                    </div>
                    <div className="card-footer bg-transparent border-0 d-flex justify-content-between">
                      <Link
                        to={`/mcpe/edit/${item.id}`}
                        className="btn btn-primary btn-sm rounded shadow"
                      >
                        EDIT
                      </Link>
                      <button
                        onClick={() => {
                          const isConfirmed = window.confirm(
                            "Are you sure you want to delete this item?"
                          );

                          if (isConfirmed) {
                            deleteMcpe(item.id);
                          }
                        }}
                        className="btn btn-danger btn-sm rounded shadow"
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="alert alert-danger text-center">
                  Data Belum Tersedia!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
