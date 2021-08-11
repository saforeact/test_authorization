import axios from "axios";

export const instance = (token = "") =>
  axios.create({
    baseURL: process.env.REACT_APP_URL_SERVER,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
