import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";

export default function McpeEdit() {
  const [image, setImage] = useState("");
  const [item, setItem] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchDetailMcpe = async () => {
    await api.get(`/api/mcpe/${id}`).then((response) => {
      setItem(response.data.data.item);
      setDeskripsi(response.data.data.deskripsi);
    });
  };

  useEffect(() => {
    fetchDetailMcpe();
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const updateMcpe = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("item", item);
    formData.append("deskripsi", deskripsi);
    formData.append("_method", "PUT");

    await api
      .post(`/api/mcpe/${id}`, formData)
      .then(() => {
        navigate("/mcpe");
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
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
      }}
    >
      <div
        className="container mt-5"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Slight opacity for better readability
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
                <form onSubmit={updateMcpe}>
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
                      value={item}
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
                      value={deskripsi}
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
                    Update Mcpe
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
