import { useEffect, useState } from "react";
import { getMyApplicationsApi } from "../api/applicationApi";
import "../styles/application.css";

const Applications = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    getMyApplicationsApi()
      .then((res) => setApps(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="applications-page">
      <div className="applications-hero">
        <h1>My Applications</h1>
        <p>Track the status of jobs you applied for</p>
      </div>

      <div className="applications-grid">
        {apps.map((app) => (
          <div className="applications-card" key={app.id}>
            <h3>{app.job.title}</h3>
            <p>📍 {app.job.address}</p>
            <p>⏰ {app.job.hours}</p>
            <p className="pay">💰 ₹ {app.job.pay}</p>

            <span className={`status ${app.status.toLowerCase()}`}>
              {app.status}
            </span>
          </div>
        ))}

        {apps.length === 0 && (
          <p className="no-jobs">You haven’t applied to any jobs yet</p>
        )}
      </div>
    </section>
  );
};

export default Applications;
