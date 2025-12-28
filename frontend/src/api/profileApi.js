import axios from "axios";

const PROFILE_URL = "http://localhost:8080/api/profile";

export const getProfileApi = () => {
  return axios.get(PROFILE_URL, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
};

export const saveProfileApi = (data) => {
  return axios.post(PROFILE_URL, data, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
};
