import axios from "axios";

const API_URL = "http://localhost:8080/api/applications";

const authHeader = () => ({
  Authorization: "Bearer " + localStorage.getItem("token"),
});

// APPLY JOB
export const applyJobApi = (jobId) =>
  axios.post(`${API_URL}/apply/${jobId}`, {}, { headers: authHeader() });

// MY APPLICATIONS (JOB SEEKER)
export const getMyApplicationsApi = () =>
  axios.get(`${API_URL}/my`, { headers: authHeader() });

// RECEIVED APPLICATIONS (JOB PROVIDER)
export const getReceivedApplicationsApi = () =>
  axios.get(`${API_URL}/received`, { headers: authHeader() });

export const getApplicantsForJobApi = (jobId) =>
  axios.get(`${API_URL}/job/${jobId}`, {
    headers: authHeader(),
  });

// APPROVE / REJECT
export const updateApplicationStatusApi = (id, status) =>
  axios.patch(
    `${API_URL}/${id}/status`,
    null,
    {
      params: { status },
      headers: authHeader(),
    }
  );
