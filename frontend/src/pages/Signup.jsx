import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupApi } from "../api/authApi";
import "../styles/auth.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "JOB_SEEKER",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await signupApi(formData);
      setSuccess(res.data);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-box animate-up" onSubmit={handleSubmit}>
        <h2>Create Account 🚀</h2>
        <p className="auth-subtitle">Start earning in your free hours</p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="JOB_SEEKER">Job Seeker</option>
          <option value="JOB_PROVIDER">Job Provider</option>
        </select>

        <button type="submit">Register</button>

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        <p className="auth-text">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
