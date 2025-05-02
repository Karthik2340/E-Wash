import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";

const ServiceCenters = () => {
  const [serviceCenters, setServiceCenters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/service-centers")
      .then(response => {
        setServiceCenters(response.data);
      })
      .catch(error => {
        console.error("Error fetching service centers:", error);
      });
  }, []);

  const handleSelectCenter = (center) => {
    localStorage.setItem("selectedCenter", JSON.stringify(center));
    navigate("/services");
  };

  return (
    <div style={styles.background}>
      <div style={styles.overlay}>
        <Typography variant="h4" gutterBottom style={styles.heading}>
          Choose a Service Center
        </Typography>
        {serviceCenters.map((center, index) => (
          <Card key={index} style={styles.card}>
            <CardContent>
              <Typography variant="h6">{center.name}</Typography>
              <Typography>📍 {center.address}, {center.city}</Typography>
              <Typography>⭐ Rating: {center.rating} | 📏 Distance: {center.distance} km</Typography>
              <Typography>🟢 {center.availability}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSelectCenter(center)}
                style={{ marginTop: "10px" }}
              >
                Select Center
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const styles = {
  background: {
    backgroundImage: "url('https://wallpapers.com/images/high/pristine-auto-detailing-showcasing-a-glossy-black-hood-2o710zro5gr4mnuh.webp')", // Replace with your image URL
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    overflowY: "auto",
  },
  overlay: {
    padding: "40px 20px",
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: "12px",
    marginTop: "40px",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  card: {
    marginBottom: "15px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
};

export default ServiceCenters;
