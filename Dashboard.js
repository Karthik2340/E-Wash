import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent } from "@mui/material";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ No token found. Redirecting to login...");
      window.location.href = "/login"; // Redirect to login if token is missing
      return;
    }

    // Fetch user details from the backend
    axios
      .get("http://localhost:5000/api/user/details", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });

    // Fetch booking details from localStorage
    const storedBooking = localStorage.getItem("bookingDetails");
    if (storedBooking) {
      setBookingDetails(JSON.parse(storedBooking));
    }
  }, []);

  if (!user || !bookingDetails) {
    return <Typography variant="h5">No Booking Found</Typography>;
  }

  const backgroundStyle = {
    backgroundImage: 'url("https://wallpapers.com/images/high/shower-on-car-detailing-4ku0zkg9sz11anys.webp")', // 🔄 Replace with your background image URL
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
    backgroundColor: "rgba(240,248,255,0)",
    minHeight: "100vh",
    paddingTop: "80px",
    color: "white",
  };

  return (
    <>
      <div style={backgroundStyle}></div>
      <div style={overlayStyle}>
        <div style={styles.container}>
        <Typography variant="h4" style={{ ...styles.heading, color: 'white' }}>🚗 Booking Confirmed!</Typography>

          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h6" style={{ ...styles.subheading, color:'black'}}>📌 User Details</Typography>
              <Typography><strong>Name:</strong> {user.name}</Typography>
              <Typography><strong>Phone:</strong> {user.phone}</Typography>
              <Typography><strong>Address:</strong> {user.address}, {user.city}, {user.state}, {user.pincode}</Typography>
            </CardContent>
          </Card>

          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h6" style={{ ...styles.subheading, color:'black'}}>🛠️ Booking Details</Typography>
              <Typography><strong>Service:</strong> {bookingDetails.service.name}</Typography>
              <Typography><strong>💰 Price:</strong> {bookingDetails.service.price}</Typography>
              <Typography><strong>📍 Service Center:</strong> {bookingDetails.serviceCenter.name}</Typography>
              <Typography><strong>🗓️ Date:</strong> {bookingDetails.date}</Typography>
              <Typography><strong>⏰ Time:</strong> {bookingDetails.time}</Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

// **💡 Custom CSS Styles**
const styles = {
  container: {
    padding: "20px",
  },
  heading: {
    textAlign: "center",
    color: "#000", // black text
    marginBottom: "20px",
  },
  subheading: {
    fontSize: "18px",
    marginBottom: "10px",
    color: "#000", // black text
  },
  card: {
    marginBottom: "15px",
    padding: "15px",
    boxShadow: "0px 4px 10px rgba(225, 221, 107, 0.6)",
    borderRadius: "10px",
    backgroundColor: "#ffffff", // keep this to ensure card content is readable
  },
};



export default Dashboard;
