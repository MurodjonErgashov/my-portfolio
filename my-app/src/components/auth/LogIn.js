import React, { Component } from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorsAction";

class LogIn extends Component {
  state = {
    modal: false,
    email: "",
    password: "",
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
    // if Autentifikated close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toogle();
      }
    }
  }

  toogle = () => {
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal,
    });
  };
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    //create user object
    const newUser = {
      email,
      password,
    };

    this.props.login(newUser);

    // this.toogle();
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toogle} href="#">
          Login
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toogle}>
          <ModalHeader /*toogle={this.toogle}*/>Login</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Name"
                  onChange={this.onChange}
                />
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapToStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapToStateToProps, { login, clearErrors })(LogIn);
