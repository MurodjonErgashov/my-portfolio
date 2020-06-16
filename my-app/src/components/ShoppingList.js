import React, { Component } from "react";
import { Container, Button } from "reactstrap";
import { connect } from "react-redux";
import { getItem, deleteItem } from "../actions/itemAction";
import PropTypes from "prop-types";

class ShoppingList extends Component {
  componentDidMount() {
    this.props.getItem();
  }
  static propTypes = {
    getItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  render() {
    const { items } = this.props.item;

    return (
      <Container>
        <ul className="list-group">
          {items.map((item) => (
            <li
              key={item._id}
              className="list-group-item d-flex justify-content-around"
            >
              {this.props.isAuthenticated ? (
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={() => {
                    this.props.deleteItem(item._id);
                  }}
                >
                  &times;
                </Button>
              ) : null}

              {item.name}
            </li>
          ))}
        </ul>
      </Container>
    );
  }
}

const mapToStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapToStateToProps, { getItem, deleteItem })(
  ShoppingList
);
