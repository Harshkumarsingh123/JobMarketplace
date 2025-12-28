import { useState } from "react";
import "../styles/jobs.css";

const dummyJobs = [
  {
    id: 1,
    title: "Restaurant Helper",
    location: "Delhi",
    hours: "3 Hours",
    pay: 450,
    type: "Food",
  },
  {
    id: 2,
    title: "Fuel Station Assistant",
    location: "Noida",
    hours: "4 Hours",
    pay: 600,
    type: "Petrol Pump",
  },
  {
    id: 3,
    title: "Cafe Waiter",
    location: "Delhi",
    hours: "3 Hours",
    pay: 500,
    type: "Food",
  },
  {
    id: 4,
    title: "Delivery Helper",
    location: "Gurgaon",
    hours: "4 Hours",
    pay: 700,
    type: "Delivery",
  },
];

const Jobs = () => {
  const [filters, setFilters] = useState({
    location: "",
    type: "",
  });

  const filteredJobs = dummyJobs.filter(
    (job) =>
      (filters.location === "" || job.location === filters.location) &&
      (filters.type === "" || job.type === filters.type)
  );

  return (
    <section className="jobs-page">
      {/* HERO */}
      <div className="jobs-hero">
        <h1>Available Part-Time Jobs</h1>
        <p>
          Find nearby jobs that fit your free hours and start earning today.
        </p>
      </div>

      {/* FILTERS */}
      <div className="jobs-filters">
        <select
          onChange={(e) =>
            setFilters({ ...filters, location: e.target.value })
          }
        >
          <option value="">All Locations</option>
          <option value="Delhi">Delhi</option>
          <option value="Noida">Noida</option>
          <option value="Gurgaon">Gurgaon</option>
        </select>

        <select
          onChange={(e) =>
            setFilters({ ...filters, type: e.target.value })
          }
        >
          <option value="">All Job Types</option>
          <option value="Food">Food</option>
          <option value="Petrol Pump">Petrol Pump</option>
          <option value="Delivery">Delivery</option>
        </select>
      </div>

      {/* JOB CARDS */}
      <div className="jobs-grid">
        {filteredJobs.map((job) => (
          <div className="jobs-card" key={job.id}>
            <h3>{job.title}</h3>
            <p>📍 Location: {job.location}</p>
            <p>⏰ Hours: {job.hours}</p>
            <p className="pay">💰 ₹ {job.pay}</p>

            <span className="job-type">{job.type}</span>

            <button className="apply-btn">Apply Now</button>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <p className="no-jobs">No jobs found for selected filters.</p>
        )}
      </div>
    </section>
  );
};

export default Jobs;
