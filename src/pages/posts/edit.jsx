import { useState, useEffect } from "react";

//import useNavigate
import { useNavigate, useParams } from "react-router-dom";

//import API
import api from "../../api";

export default function PostEdit() {
  //define state
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //state validation
  const [errors, setErrors] = useState([]);

  //useNavigate
  const navigate = useNavigate();

  //destruct ID
  const { id } = useParams();

  //method fetchDetailPost
  const fetchDetailPost = async () => {
    //fetch data
    await api.get(`/api/posts/${id}`).then((response) => {
      //assign to state
      setTitle(response.data.data.title);
      setContent(response.data.data.content);
    });
  };

  //hook useEffect
  useEffect(() => {
    //call method "fetchDetailPost"
    fetchDetailPost();
  }, []);

  //method handle file change
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  //method update post
  const updatePost = async (e) => {
    e.preventDefault();

    //init FormData
    const formData = new FormData();

    //append data
    formData.append("image", image);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("_method", "PUT");

    //send data with API
    await api
      .post(`/api/posts/${id}`, formData)
      .then(() => {
        //redirect to posts index
        navigate("/posts");
      })
      .catch((error) => {
        //set errors response to state "errors"
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
                <form onSubmit={updatePost}>
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
                    <label className="form-label fw-bold">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Title Post"
                    />
                    {errors.title && (
                      <div className="alert alert-danger mt-2">
                        {errors.title[0]}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Content</label>
                    <textarea
                      className="form-control"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows="5"
                      placeholder="Content Post"
                    ></textarea>
                    {errors.content && (
                      <div className="alert alert-danger mt-2">
                        {errors.content[0]}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-md btn-primary rounded-sm shadow border-0"
                  >
                    Update
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
