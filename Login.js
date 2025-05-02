import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        console.log("✅ Login successful! Token saved.");
        navigate("/address-form");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
      console.error("❌ Login failed:", error.response?.data?.message);
    }
  };

  const backgroundStyle = {
    backgroundImage: 'url("https://c4.wallpaperflare.com/wallpaper/767/446/464/mercedes-benz-slk-amg-ducati-streetfighter-yellow-mercedez-benz-convertible-car-and-sports-bike-wallpaper-preview.jpg")', // Replace with your image
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: -1,
  };

  const overlayStyle = {
    backgroundColor: "rgba(0, 0, 0, 0)",
    minHeight: "100vh",
    paddingTop: "80px",
    color: "white",
  };

  return (
    <>
      <div style={backgroundStyle}></div>
      <div style={overlayStyle}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow p-4">
                <h2 className="text-center mb-4">Login</h2>
                {error && (
                  <p className="text-danger text-center">{error}</p>
                )}
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success w-100"
                  >
                    Login
                  </button>
                </form>
                <p className="text-center mt-3">
                  Don't have an account?{" "}
                  <a href="/signup">Sign up here</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
