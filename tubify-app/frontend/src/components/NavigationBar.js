import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavigationBar = () => {
    return (
        <>
        <Navbar bg="light" expand="lg">
            <Container>
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="settings">Shuffle Settings</Nav.Link>
                <Nav.Link href="popularities">Shuffle Popularities</Nav.Link>
                <Nav.Link href="moods">Shuffle Moods</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
      </>
      );
}

export default NavigationBar;