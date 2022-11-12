import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';

import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function MyNavBar({ currUser, logOutHandler }) {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">LazyTypeR</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav className="me-auto">
              {currUser.id
                ? (
                  <>
                    <Nav>
                      <Link to="/snippets" className="nav-link">
                        Saved Snippets
                      </Link>
                    </Nav>
                    <Nav className="pipe-separate mgL t-light-green left">
                      <Button className="nav-link" onClick={logOutHandler} variant="link">
                        Logout
                      </Button>
                    </Nav>
                    <span className="nav-link">
                      {currUser?.id ? `Hello ${currUser.name}!` : ''}
                    </span>
                  </>
                )
                : (
                  <>
                    <Nav className="pipe-separate t-light-green left"><NavLink className="nav-link" to="/auth/registration">Sign Up</NavLink></Nav>
                    <Nav className="pipe-separate t-light-green left"><NavLink className="nav-link" to="/auth/authorization">Sign In</NavLink></Nav>
                  </>
                )}
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavBar;
