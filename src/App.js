// export default App;
import React from "react";

// import react router dom
import { Routes, Route } from "react-router-dom";

// import component Register
import Register from "./pages/Register";

// import component Login
import Login from "./pages/Login";

// import component Dashboard
import Dashboard from "./pages/Dashboard";
import McpeIndex from "./pages/mcpe";
import McpeCreate from "./pages/mcpe/create";
import McpeEdit from "./pages/mcpe/edit";
import PostIndex from "./pages/posts";
import PostCreate from "./pages/posts/create";
import PostEdit from "./pages/posts/edit";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mcpe" element={<McpeIndex />} />
        <Route path="/mcpe/create" element={<McpeCreate />} />
        <Route path="/mcpe/edit/:id" element={<McpeEdit />} />
        <Route path="/posts" element={<PostIndex/>} />
        <Route path="/posts/create" element={<PostCreate />} />
        <Route path="/posts/edit/:id" element={<PostEdit />} />
      </Routes>
    </div>
  );
}

export default App;