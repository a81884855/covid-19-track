import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar
      style={{
        padding: "0 0 0 2rem",
      }}
    >
      <Navbar.Brand href="/">
        <img
          style={{
            width: 100,
            marginTop: -10,
          }}
          alt="logo"
          src="/logo.jpeg"
        />
      </Navbar.Brand>
      <Nav.Link
        style={{
          color: "rgba(0,0,0,.7)",
          hover: {
            color: "black",
          },
        }}
        href="/"
      >
        Home
      </Nav.Link>
    </Navbar>
  );
};

export default Header;
