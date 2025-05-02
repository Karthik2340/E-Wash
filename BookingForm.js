import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Button, TextField, Card, CardContent } from "@mui/material";

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { service, serviceCenter } = location.state || {};

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  if (!service || !serviceCenter) {
    console.error("Service or Service Center details missing. Redirecting...");
    navigate("/services");
    return null;
  }

  const handleConfirmBooking = () => {
    if (!date || !time) {
      setError("❌ Please select both Date and Time before confirming.");
      return;
    }

    const bookingDetails = { service, serviceCenter, date, time };
    localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));

    console.log("✅ Booking Confirmed! Redirecting...");
    navigate("/dashboard");
  };

  const backgroundStyle = {
    backgroundImage: 'url("https://wallpapers.com/images/thumbnail/professional-car-detailing-in-action-5bk8iz3g1eaqlwqr.webp")', // 🔄 Replace with your background image URL
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
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    minHeight: "100vh",
    paddingTop: "80px",
    color: "white",
  };

  return (
    <>
      <div style={backgroundStyle}></div>
      <div style={overlayStyle}>
        <div style={styles.container}>
          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h4" style={styles.heading}>Confirm Booking</Typography>
              <Typography variant="h6" style={styles.text}><strong>Service:</strong> {service.name}</Typography>
              <Typography style={styles.text}><strong>💰 Price:</strong> {service.price}</Typography>
              <Typography style={styles.text}><strong>📍 Service Center:</strong> {serviceCenter.name}</Typography>

              <TextField
                label="Select Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                fullWidth
                style={styles.input}
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                label="Select Time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                fullWidth
                style={styles.input}
                InputLabelProps={{ shrink: true }}
              />

              {error && <Typography style={styles.error}>{error}</Typography>}

              <Button
                variant="contained"
                color="primary"
                onClick={handleConfirmBooking}
                style={styles.button}
              >
                Confirm Booking
              </Button>
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  card: {
    width: "400px",
    padding: "20px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  text: {
    fontSize: "16px",
    marginBottom: "10px",
    color: "#555",
  },
  input: {
    marginTop: "15px",
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "10px",
    textAlign: "center",
  },
  button: {
    marginTop: "20px",
    width: "100%",
    padding: "10px",
    fontSize: "16px",
  },
};

export default BookingForm;
