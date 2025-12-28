import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../api/authApi";
import "../styles/auth.css";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginApi(loginData);

      login(res.data.token);

      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-box animate-up" onSubmit={handleSubmit}>
        <h2>Welcome Back 👋</h2>
        <p className="auth-subtitle">Login to continue earning</p>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

        {error && <p className="error-text">{error}</p>}

        <p className="auth-text">
          Not registered? <Link to="/signup">Create account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
