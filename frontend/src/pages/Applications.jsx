import "../styles/application.css";

const dummyApplications = [
  {
    id: 1,
    title: "Restaurant Helper",
    location: "Delhi",
    hours: "3 Hours",
    pay: 450,
    status: "PENDING",
  },
  {
    id: 2,
    title: "Delivery Helper",
    location: "Gurgaon",
    hours: "4 Hours",
    pay: 700,
    status: "APPROVED",
  },
  {
    id: 3,
    title: "Cafe Waiter",
    location: "Noida",
    hours: "3 Hours",
    pay: 500,
    status: "REJECTED",
  },
];

const Applications = () => {
  return (
    <section className="applications-page">
      {/* HERO */}
      <div className="applications-hero">
        <h1>My Applications</h1>
        <p>Track the status of jobs you have applied for</p>
      </div>

      {/* APPLICATION CARDS */}
      <div className="applications-grid">
        {dummyApplications.map((job) => (
          <div className="applications-card" key={job.id}>
            <h3>{job.title}</h3>
            <p>📍 Location: {job.location}</p>
            <p>⏰ Hours: {job.hours}</p>
            <p className="pay">💰 ₹ {job.pay}</p>

            <span className={`status ${job.status.toLowerCase()}`}>
              {job.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Applications;
