import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

export default function McpeCreate() {
  // Define state
  const [image, setImage] = useState("");
  const [item, setItem] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  // State for validation errors
  const [errors, setErrors] = useState([]);

  // useNavigate
  const navigate = useNavigate();

  // Handle file change
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Store post method
  const storePost = async (e) => {
    e.preventDefault();

    // Initialize FormData
    const formData = new FormData();

    // Append data to FormData
    formData.append("image", image);
    formData.append("item", item);
    formData.append("deskripsi", deskripsi);

    // Send data with API
    await api
      .post("/api/mcpe", formData)
      .then(() => {
        // Redirect to mcpe index page
        navigate("/mcpe");
      })
      .catch((error) => {
        // Set errors response to state "errors"
        setErrors(error.response.data);
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
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="container mt-5"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Slight opacity for readability
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "800px",
        }}
      >
        <div className="row">
          <div className="col-md-12">
            <div className="card border-0 rounded shadow">
              <div className="card-body">
                <form onSubmit={storePost}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Image</label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="form-control"
                    />
                    {errors.image && (
                      <div className="alert alert-danger mt-2">
                        {errors.image[0]}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Item</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setItem(e.target.value)}
                      placeholder="Item Mcpe"
                    />
                    {errors.item && (
                      <div className="alert alert-danger mt-2">
                        {errors.item[0]}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Deskripsi</label>
                    <textarea
                      className="form-control"
                      onChange={(e) => setDeskripsi(e.target.value)}
                      rows="5"
                      placeholder="Deskripsi Mcpe"
                    ></textarea>
                    {errors.deskripsi && (
                      <div className="alert alert-danger mt-2">
                        {errors.deskripsi[0]}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-md btn-primary rounded-sm shadow border-0"
                  >
                    Save Item
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
