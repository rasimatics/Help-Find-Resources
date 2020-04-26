import React  from 'react';
import { Navbar,Nav } from 'react-bootstrap'


function Navigation() {
  
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Share-Resources</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav.Link href='/' >Əsas səhifə</Nav.Link>
        <Nav.Link href='resources' >Mənbələr</Nav.Link>
        <Nav.Link href='courses'>Pulsuz Kurslar</Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
