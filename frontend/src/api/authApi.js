import api from "./axios";

export const signupApi = (data) => {
  return api.post("/api/auth/signup", data);
};

export const loginApi = (data) => {
  return api.post("/api/auth/login", data);
};
