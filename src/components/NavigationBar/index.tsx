import React from "react";
import {Navbar, Container, Nav} from 'react-bootstrap';
import './style.sass';

interface NavbarProps {}

const NavigationBar: React.FC<NavbarProps> = () => {
  return(
    <Navbar bg="light" expand="lg" className="mb-5">
      <Container>
        <Navbar.Brand href="#home">E-learning</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/contact">Contact</Nav.Link>
            <Nav.Link href="/course">Course</Nav.Link>
            <Nav.Link href="/feedback">Feedback</Nav.Link>
            <Nav.Link href="/user">User</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar