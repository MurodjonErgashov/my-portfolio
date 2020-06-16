const axios = require("axios");

export const returnErrors = (msg, status, id) => {
  return {
    type: "GET_ERRORS",
    payload: { msg, status, id },
  };
};

export const clearErrors = () => {
  return {
    type: "CLEAR_ERRORS",
  };
};
