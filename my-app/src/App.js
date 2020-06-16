import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/AppNavbar";
import ShoppinList from "./components/ShoppingList";
import ItemModal from "./components/ItemModal";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <ItemModal />
          <ShoppinList />
        </div>
      </Provider>
    );
  }
}

export default App;

//USER_LOADING
//USER_LOADED
//AUTH_ERROR
//LOGIN_SUCCESS
//LOGIN_FAIL
//LOGOUT_SUCCESS
//REGISTER_SUCCESS
//REGISTER_FAIL
//GET_ERRORS
//CLEAR_ERRORS
