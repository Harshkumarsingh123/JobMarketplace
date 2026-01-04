import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyJobsApi } from "../api/jobApi";
import "../styles/myJobs.css";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getMyJobsApi()
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading jobs...</p>;
  }

  return (
    <section className="myjobs-page">
      {/* HERO */}
      <div className="myjobs-hero">
        <h1>My Posted Jobs</h1>
        <p>Manage jobs you have posted</p>
      </div>

      {/* JOB CARDS */}
      <div className="myjobs-grid">
        {jobs.length === 0 && <p>No jobs posted yet</p>}

        {jobs.map(({ job, applicants }) => (
          <div className="myjobs-card" key={job.id}>
            <h3>{job.title}</h3>

            <p>📍 {job.address}</p>

            <p>
              ⏰{" "}
              {job.startDateTime
                ? new Date(job.startDateTime).toLocaleString()
                : "Not specified"}
            </p>

            <p className="pay">💰 ₹ {job.pay}</p>

            <div className="job-footer">
              <span className={`status ${job.active ? "active" : "closed"}`}>
                {job.active ? "ACTIVE" : "CLOSED"}
              </span>

              <span className="applicants">👥 {applicants} applicants</span>
            </div>

            <button
              className="manage-btn"
              onClick={() => navigate(`/my-jobs/${job.id}`)}
            >
              Manage Job
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyJobs;
