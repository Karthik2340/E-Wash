import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar bg="black" variant="dark" expand="lg">
      <Navbar.Brand href="/">E-Wash</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link href="/services">Services</Nav.Link>
        <Nav.Link href="/bookings">Bookings</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/signup">Signup</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
