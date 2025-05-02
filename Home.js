import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    const backgroundStyle = {
        backgroundImage: 'url("https://wallpapers.com/images/high/silver-aesthetic-car-wash-av2eptgo6na7ybh8.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        height: '100vh',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
    };

    return (
        <div style={backgroundStyle}>
            <Container>
                <Row className="text-center">
                    <Col>
                    <h1 style={{ color: "white" }}>E-Wash : Eco-Friendly Car & Bike Wash</h1>
                    <p className="lead" style={{ color: "yellow" }}>Find the best eco-friendly wash services near you.</p>
                        <Link to="/services">
                            <Button variant="light">Explore Services</Button>
                        </Link>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col md={4}>
                        <Card className="shadow">
                            <Card.Body>
                                <Card.Title>Eco-Friendly</Card.Title>
                                <Card.Text>Water-efficient and biodegradable cleaning solutions.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="shadow">
                            <Card.Body>
                                <Card.Title>Convenient</Card.Title>
                                <Card.Text>Book a service online and track your appointment live.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="shadow">
                            <Card.Body>
                                <Card.Title>Affordable</Card.Title>
                                <Card.Text>Get the best service at an affordable price.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;
