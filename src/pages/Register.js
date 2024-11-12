import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  // define state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  // define state validation
  const [validation, setValidation] = useState([]);

  // define navigate
  const navigate = useNavigate();

  // function "registerHandler"
  const registerHandler = async (e) => {
    e.preventDefault();

    // initialize formData
    const formData = new FormData();

    // append data to formData
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', passwordConfirmation);

    // send data to server
    await axios.post('http://localhost:8000/api/register', formData)
      .then(() => {
        // redirect to login page
        navigate('/');
      })
      .catch((error) => {
        // assign error to state "validation"
        setValidation(error.response.data);
      })
  };

  return (
    <div
      style={{
        backgroundImage: 'url("https://i.pinimg.com/564x/1c/35/5a/1c355a72ace613f0134ac9d551397272.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div className="container" style={{ maxWidth: "600px" }}>
        <div className="card border-0 rounded shadow-lg" style={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}>
          <div className="card-body">
            <h4 className="fw-bold text-center text-dark">Register</h4>
            <hr />
            <form onSubmit={registerHandler}>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label className="form-label text-dark">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Your Name"
                    required
                  />
                  {validation.name && (
                    <div className="alert alert-danger mt-2">
                      {validation.name[0]}
                    </div>
                  )}
                </div>

                <div className="col-md-12 mb-3">
                  <label className="form-label text-dark">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email"
                    required
                  />
                  {validation.email && (
                    <div className="alert alert-danger mt-2">
                      {validation.email[0]}
                    </div>
                  )}
                </div>

                <div className="col-md-12 mb-3">
                  <label className="form-label text-dark">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Your Password"
                    required
                  />
                  {validation.password && (
                    <div className="alert alert-danger mt-2">
                      {validation.password[0]}
                    </div>
                  )}
                </div>

                <div className="col-md-12 mb-3">
                  <label className="form-label text-dark">Password Confirmation</label>
                  <input
                    type="password"
                    className="form-control"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    placeholder="Confirm Your Password"
                    required
                  />
                </div>
              </div>
              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#007bff",
                    borderColor: "#007bff",
                    fontWeight: "bold",
                  }}
                >
                  Register Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;