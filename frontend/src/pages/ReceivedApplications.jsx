import { useEffect, useState } from "react";
import {
  getReceivedApplicationsApi,
  updateApplicationStatusApi,
} from "../api/applicationApi";

const ReceivedApplications = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    getReceivedApplicationsApi()
      .then((res) => setApps(res.data))
      .catch(console.error);
  }, []);

  const updateStatus = async (id, status) => {
    await updateApplicationStatusApi(id, status);
    setApps((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status } : a
      )
    );
  };

  return (
    <div>
      <h2>Applications Received</h2>

      {apps.map((app) => (
        <div key={app.id} className="applications-card">
          <h3>{app.job.title}</h3>
          <p>👤 {app.applicantName}</p>
          <p>📞 {app.applicantPhone}</p>
          <p>🛠 {app.applicantSkills}</p>

          <button onClick={() => updateStatus(app.id, "APPROVED")}>
            ✅ Approve
          </button>

          <button onClick={() => updateStatus(app.id, "REJECTED")}>
            ❌ Reject
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReceivedApplications;
