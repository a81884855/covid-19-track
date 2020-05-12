import React from "react";
import { Navbar } from "react-bootstrap";

const Nav = () => {
  return (
    <Navbar
      style={{
        paddingBottom: 0,
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
    </Navbar>
  );
};

export default Nav;
