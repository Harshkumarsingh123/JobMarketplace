import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getApplicantsForJobApi,
  updateApplicationStatusApi,
} from "../api/applicationApi";

const JobApplicants = () => {
  const { jobId } = useParams();
  const [apps, setApps] = useState([]);

  useEffect(() => {
    getApplicantsForJobApi(jobId)
      .then((res) => setApps(res.data))
      .catch(console.error);
  }, [jobId]);

  const updateStatus = async (id, status) => {
    await updateApplicationStatusApi(id, status);
    setApps((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status } : a
      )
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Applicants</h2>

      {apps.length === 0 && <p>No applicants yet</p>}

      {apps.map((app) => (
        <div key={app.id} className="applications-card">
          <h3>{app.applicantName}</h3>
          <p>📧 {app.applicantEmail}</p>
          <p>📞 {app.applicantPhone}</p>
          <p>🛠 {app.applicantSkills}</p>

          <p>Status: <b>{app.status}</b></p>

          {app.status === "PENDING" && (
            <>
              <button onClick={() => updateStatus(app.id, "APPROVED")}>
                ✅ Approve
              </button>
              <button onClick={() => updateStatus(app.id, "REJECTED")}>
                ❌ Reject
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default JobApplicants;
