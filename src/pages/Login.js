import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  // define state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState([]);
  const navigate = useNavigate();

  // check if token exists and redirect if logged in
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  // login handler
  const loginHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    await axios.post('http://localhost:8000/api/login', formData)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://i.pinimg.com/564x/1c/35/5a/1c355a72ace613f0134ac9d551397272.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "400px",
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          color: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.6)"
        }}
      >
        <h4 className="fw-bold text-center mb-4">LOGIN</h4>
        <hr />
        {validation.message && (
          <div className="alert alert-danger text-center">
            {validation.message}
          </div>
        )}
        <form onSubmit={loginHandler}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email...."
              required
            />
          </div>
          {validation.email && (
            <div className="alert alert-danger">
              {validation.email[0]}
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password...."
              required
            />
          </div>
          {validation.password && (
            <div className="alert alert-danger">
              {validation.password[0]}
            </div>
          )}
          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{
                backgroundColor: "#007bff",
                borderColor: "#007bff",
                color: "#fff",
                padding: "10px",
                fontSize: "16px",
                fontWeight: "bold"
              }}
            >
              LOGIN
            </button>
          </div>
        </form>
        <hr />
        <div className="text-center">
          <span>Don't have an account? </span>
          <Link to="/register" className="btn btn-link text-white p-0" style={{ fontWeight: "bold" }}>
            Sign Up Here!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;