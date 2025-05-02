import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Bookings from "./pages/Bookings";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./components/Dashboard";
import AddressForm from "./components/AddressForm";
import Navbar from "./components/Navbar";
import ServiceCenters from "./components/ServiceCenters";
import "bootstrap/dist/css/bootstrap.min.css";
import BookingForm from "./components/BookingForm";

// ✅ Create a Private Route Component
const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          
          {/* ✅ Protect these routes */}
          <Route path="/address-form" element={<PrivateRoute element={<AddressForm />} />} />
          <Route path="/service-centers" element={<ServiceCenters />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<BookingForm/>} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
