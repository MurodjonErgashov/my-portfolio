import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorsAction";

export const getItem = () => (dispatch) => {
  dispatch(setItemsLoading());
  axios
    .get("/api/items")
    .then((res) =>
      dispatch({
        type: "GET_ITEM",
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = (name) => (dispatch, getState) => {
  axios
    .post("/api/items", name, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: "ADD_ITEM",
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteItem = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: "DELETE_ITEM",
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: "ITEMS_LOADING",
  };
};
