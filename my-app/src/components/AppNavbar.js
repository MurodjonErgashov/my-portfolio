import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import RegisterModal from "./auth/RegisterModal";
import LogOut from "./auth/LogOut";
import LogIn from "./auth/LogIn";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class AppNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  static propsTypes = {
    auth: PropTypes.object.isRequired,
  };

  toogle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLink = (
      <React.Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user ? `Welcome ${user.name}` : ""}</strong>
          </span>
        </NavItem>
        <NavItem>
          <LogOut />
        </NavItem>
      </React.Fragment>
    );
    const guestLink = (
      <React.Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LogIn />
        </NavItem>
      </React.Fragment>
    );

    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">ShoppingList</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? authLink : guestLink}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapToStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapToStateToProps, null)(AppNavbar);
