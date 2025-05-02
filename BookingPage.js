import React, { useState, useEffect } from 'react';
import { bookService, fetchServiceCenters } from '../api';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Select, MenuItem, Typography } from '@mui/material';

const BookingPage = () => {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loadServices = async () => {
            const { data } = await fetchServiceCenters();
            setServices(data);
        };
        loadServices();
    }, []);

    const handleBooking = async () => {
        if (!selectedService) return alert("Select a service center!");
        try {
            const { data } = await bookService({ serviceId: selectedService });
            alert("Booking confirmed!");
            navigate(`/track/${data.bookingId}`);
        } catch (error) {
            alert("Booking failed.");
        }
    };

    const backgroundStyle = {
        backgroundImage: 'url("https://wallpapers.com/images/high/caption-gleaming-bmw-enjoying-professional-car-detailing-ppoih0l3xdidr9st.webp")', // 🔄 Replace with your background image URL
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
                <Container maxWidth="sm">
                    <Typography variant="h4" color="white" gutterBottom>Book a Service</Typography>
                    <Select fullWidth value={selectedService} onChange={(e) => setSelectedService(e.target.value)} style={{ marginBottom: "20px" }}>
                        {services.map(service => (
                            <MenuItem key={service._id} value={service._id}>{service.name}</MenuItem>
                        ))}
                    </Select>
                    <Button variant="contained" color="primary" fullWidth onClick={handleBooking}>
                        Book Now
                    </Button>
                </Container>
            </div>
        </>
    );
};

export default BookingPage;
