import axios from "axios";
import { urlServer } from "../constants";

export const instance = (token = "") =>
  axios.create({
    baseURL: urlServer,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
