import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { register } from "../api/auth";

export function RegisterPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await register(phone, password);
      setSuccess("Registration successful! Your ID: " + result.user_id);
      setTimeout(() => navigate("/login"), 1200);
    } catch {
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow-lg p-4" style={{ width: "420px" }}>
        <h2 className="text-center mb-4 fw-bold">Create Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Processing..." : "Sign Up"}
          </button>
        </form>

        {error && (
          <div className="alert alert-danger mt-3 text-center">{error}</div>
        )}
        {success && (
          <div className="alert alert-success mt-3 text-center">{success}</div>
        )}
      </div>
    </div>
  );
}
