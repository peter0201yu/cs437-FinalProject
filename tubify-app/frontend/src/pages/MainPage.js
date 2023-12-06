import React, { useState, useEffect } from 'react';
import { Spinner, Alert, Container, Row, Col } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar';
import pic from './pic.jpg'; // Adjust the path according to your file structure

const MainPage = () => {
  return(
    <>
      <NavigationBar />

      <Container className="flex-grow-1 custom-padding my-3">
        <Row className="justify-content-center">
          <Col md={6}>
            <img src={pic} alt="Descriptive Alt Text" className="img-fluid" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MainPage;
