import React from "react";
import { Navbar } from "react-bootstrap";

const Nav = () => {
  return (
    <Navbar>
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
    </Navbar>
  );
};

export default Nav;
