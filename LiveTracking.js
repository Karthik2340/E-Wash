import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Container, Typography, LinearProgress } from '@mui/material';

const socket = io(process.env.REACT_APP_BACKEND_URL);

const LiveTracking = () => {
    const { bookingId } = useParams();
    const [status, setStatus] = useState("Pending");

    useEffect(() => {
        socket.emit('trackBooking', bookingId);
        socket.on('bookingStatus', (updatedStatus) => {
            setStatus(updatedStatus);
        });
    }, [bookingId]);

    return (
        <Container maxWidth="sm">
            <Typography variant="h4">Live Booking Status</Typography>
            <Typography variant="h6">{status}</Typography>
            <LinearProgress variant="determinate" value={status === "Completed" ? 100 : 50} />
        </Container>
    );
};

export default LiveTracking;
