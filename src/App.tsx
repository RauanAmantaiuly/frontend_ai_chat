import { Routes, Route } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { UploadPage } from "./pages/UploadPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { LoginPage } from "./pages/LoginPage";
import { ChatPage } from "./pages/ChatPage";

function App() {
  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="/">MyAI</a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/register">Register</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/upload">Upload</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/chat">Chat</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </>
  );
}

export default App;