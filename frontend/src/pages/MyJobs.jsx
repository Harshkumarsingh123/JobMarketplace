import "../styles/myJobs.css";

const dummyMyJobs = [
  {
    id: 1,
    title: "Cafe Helper",
    location: "Delhi",
    hours: "4 Hours",
    pay: 600,
    applicants: 5,
    status: "ACTIVE",
  },
  {
    id: 2,
    title: "Petrol Pump Assistant",
    location: "Noida",
    hours: "3 Hours",
    pay: 450,
    applicants: 2,
    status: "COMPLETED",
  },
];

const MyJobs = () => {
  return (
    <section className="myjobs-page">
      {/* HERO */}
      <div className="myjobs-hero">
        <h1>My Posted Jobs</h1>
        <p>Manage jobs you have posted</p>
      </div>

      {/* JOB CARDS */}
      <div className="myjobs-grid">
        {dummyMyJobs.map((job) => (
          <div className="myjobs-card" key={job.id}>
            <h3>{job.title}</h3>
            <p>📍 Location: {job.location}</p>
            <p>⏰ Hours: {job.hours}</p>
            <p className="pay">💰 ₹ {job.pay}</p>

            <div className="job-footer">
              <span className={`status ${job.status.toLowerCase()}`}>
                {job.status}
              </span>
              <span className="applicants">
                👥 {job.applicants} applicants
              </span>
            </div>

            <button className="manage-btn">Manage Job</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyJobs;
