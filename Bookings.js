import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, Button } from "@mui/material";

const Bookings = () => {
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const storedCenter = localStorage.getItem("selectedCenter");
    const storedService = localStorage.getItem("selectedService");

    if (storedCenter) setSelectedCenter(JSON.parse(storedCenter));
    if (storedService) setSelectedService(JSON.parse(storedService));
  }, []);

  const backgroundStyle = {
    backgroundImage: 'url("https://wallpapers.com/images/high/professional-car-detailing-in-progress-opndbez1pz9a19t6.webp")', // Replace with your image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: -1,
  };

  const overlayStyle = {
    backgroundColor: "rgba(0, 0, 0, 0)",
    minHeight: "100vh",
    padding: "20px",
    color: "white",
  };

  if (!selectedCenter || !selectedService) {
    return (
      <>
        <div style={backgroundStyle}></div>
        <div style={overlayStyle}>
          <Typography variant="h5">No Service or Center Selected</Typography>
        </div>
      </>
    );
  }

  const handleConfirmBooking = () => {
    alert(`Booking confirmed for ${selectedService.name} at ${selectedCenter.name}`);
  };

  return (
    <>
      <div style={backgroundStyle}></div>
      <div style={overlayStyle}>
        <Typography variant="h4" gutterBottom>Booking Confirmation</Typography>
        <Card style={{ backgroundColor: "rgba(198, 229, 227, 0.85)", color: "black" }}>
          <CardContent>
            <Typography variant="h6">Service: {selectedService.name}</Typography>
            <Typography>💰 Price: {selectedService.price}</Typography>
            <Typography>📍 Center: {selectedCenter.name}, {selectedCenter.city}</Typography>
            <Button
              variant="contained"
              color="success"
              onClick={handleConfirmBooking}
              style={{ marginTop: "15px" }}
            >
              Confirm Booking
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Bookings;
