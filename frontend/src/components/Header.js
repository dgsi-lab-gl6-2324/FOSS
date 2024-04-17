import React, { useState } from "react";
import logo from "../images/logo-FOSS.png";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar expand="md">
        <NavbarBrand href="/">
          <img
            alt="logo"
            src={logo}
            style={{
              height: 60,
              width: 60,
            }}
          />
          FOSS
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto ms-3" navbar>
            <NavItem className="me-3">
              <NavLink
                tag={Link}
                to="/players"
                className="text-decoration-none text-dark"
              >
                Jugadores
              </NavLink>
            </NavItem>
            <NavItem className="me-3">
              <NavLink
                tag={Link}
                to="/teams"
                className="text-decoration-none text-dark"
              >
                Equipos
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText className="me-3">
            <NavLink
              tag={Link}
              to="/teams"
              className="text-decoration-none text-dark"
            >
              Login
            </NavLink>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
