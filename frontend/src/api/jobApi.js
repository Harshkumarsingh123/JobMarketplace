import axios from "axios";

const API_URL = "http://localhost:8080/api/jobs";

const authHeader = () => ({
  Authorization: "Bearer " + localStorage.getItem("token"),
});

export const postJobApi = (jobData) => {
  return axios.post(API_URL, jobData, {
    headers: authHeader(),
  });
};

export const getMyJobsApi = () =>
  axios.get(`${API_URL}/my`, { headers: authHeader() });

export const getNearbyJobsApi = (lat, lng) =>
  axios.get(`${API_URL}/nearby`, {
    params: { lat, lng },     
    headers: authHeader(),
  });

  