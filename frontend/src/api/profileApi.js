import axios from "axios";

const API_URL = "http://localhost:8080/api/profile";

const authHeader = () => ({
  Authorization: "Bearer " + localStorage.getItem("token"),
});

export const getProfileApi = () =>
  axios.get(API_URL, { headers: authHeader() });

export const saveProfileApi = (data) =>
  axios.put(API_URL, data, { headers: authHeader() });

export const uploadProfilePhotoApi = (file) => {
  const formData = new FormData();
  formData.append("photo", file);

  return axios.post(
    "http://localhost:8080/api/profile/upload-photo",
    formData,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
};

