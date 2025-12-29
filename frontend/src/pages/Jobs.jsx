import { useEffect, useState } from "react";
import { getNearbyJobsApi } from "../api/jobApi";
import "../styles/jobs.css";
import { applyJobApi } from "../api/applicationApi";


const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [filters, setFilters] = useState({
    type: "",
  });

  /* ---------------- Load Nearby Jobs ---------------- */
  useEffect(() => {
    if (!navigator.geolocation) {
      setErrorMsg("Geolocation not supported by browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        try {
          const res = await getNearbyJobsApi(lat, lng);
          setJobs(res.data || []);
        } catch (err) {
          console.error(err);
          setErrorMsg("Failed to load nearby jobs");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setErrorMsg("Location permission denied");
        setLoading(false);
      }
    );
  }, []);

  const handleApply = async (jobId) => {
  try {
    await applyJobApi(jobId);

    // remove job after apply
    setJobs((prev) => prev.filter((job) => job.id !== jobId));

    alert("✅ Application sent successfully");
  } catch (err) {
    alert(err.response?.data || "❌ Already applied");
  }
};


  /* ---------------- Filter ---------------- */
  const filteredJobs = jobs.filter(
    (job) => filters.type === "" || job.type === filters.type
  );

  /* ---------------- UI States ---------------- */
  if (loading) {
    return (
      <section className="jobs-page">
        <p className="loading-text">📍 Finding jobs near you...</p>
      </section>
    );
  }

  if (errorMsg) {
    return (
      <section className="jobs-page">
        <p className="error-banner">{errorMsg}</p>
      </section>
    );
  }

  return (
    <section className="jobs-page">
      {/* HERO */}
      <div className="jobs-hero">
        <h1>Nearby Part-Time Jobs</h1>
        <p>Jobs closest to your current location</p>
      </div>

      {/* FILTER */}
      <div className="jobs-filters">
        <select
          value={filters.type}
          onChange={(e) =>
            setFilters({ ...filters, type: e.target.value })
          }
        >
          <option value="">All Job Types</option>
          <option value="Food">Food</option>
          <option value="Delivery">Delivery</option>
          <option value="Cafe">Cafe</option>
        </select>
      </div>

      {/* JOBS */}
      <div className="jobs-grid">
        {filteredJobs.map((job) => (
          <div className="jobs-card" key={job.id}>
            <h3>{job.title}</h3>
            <p>📍 {job.address}</p>
            <p>⏰ {job.hours}</p>
            <p className="pay">💰 ₹ {job.pay}</p>

            <span className="job-type">{job.type}</span>
            <button className="apply-btn" onClick={() => handleApply(job.id)}>
              Apply Now
              </button>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <p className="no-jobs">No nearby jobs found</p>
        )}
      </div>
    </section>
  );
};

export default Jobs;
