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
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemAction";
import PropTypes from "prop-types";

class ItemModal extends Component {
  state = {
    modal: false,
    name: "",
  };

  static propsTypes = {
    isAuthenticated: PropTypes.bool,
  };

  toogle = () => {
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

    const newItem = {
      name: this.state.name,
    };
    this.props.addItem(newItem);
    this.setState({
      name: "",
    });
    this.toogle();
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toogle}
          >
            Add Item
          </Button>
        ) : (
          <h4 className="mb-3 ml-4">Please log in to manage items</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toogle}>
          <ModalHeader /*toogle={this.toogle}*/>Add To ShoppinList</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add shopping item"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Item
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
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapToStateToProps, { addItem })(ItemModal);
