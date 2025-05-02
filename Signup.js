import React, { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Signup Data:", { name, email, phone, password });

    if (!name || !email || !phone || !password) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await response.json();
      console.log("Signup Response:", data);

      if (response.ok) {
        alert("Signup successful! Please log in.");
        window.location.href = "/login";
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const backgroundStyle = {
    backgroundImage: 'url("https://wallpapers.com/images/high/sleek-sports-car-detailing-mastery-n7b3m3iaji5r4hwf.webp")', // 🔄 Replace this URL with your actual image
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
                <h2 className="text-center mb-4">Signup</h2>
                <form onSubmit={handleSignup}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

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
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Enter Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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

                  <button type="submit" className="btn btn-primary w-100">
                    Signup
                  </button>
                </form>
                <p className="text-center mt-3">
                  Already have an account?{" "}
                  <a href="/login">Login here</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
