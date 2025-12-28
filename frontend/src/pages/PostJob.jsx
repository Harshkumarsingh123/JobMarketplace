import { useState } from "react";
import "../styles/postJob.css";

const PostJob = () => {
  const [job, setJob] = useState({
    title: "",
    location: "",
    hours: "",
    pay: "",
    type: "",
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Job posted successfully (dummy)");
    setJob({ title: "", location: "", hours: "", pay: "", type: "" });
  };

  return (
    <section className="postjob-page">
      {/* HERO */}
      <div className="postjob-hero">
        <h1>Post a Part-Time Job</h1>
        <p>Hire workers for 3–4 hours near your location</p>
      </div>

      {/* FORM CARD */}
      <div className="postjob-card">
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Job Title"
            value={job.title}
            onChange={handleChange}
            required
          />
          <input
            name="location"
            placeholder="Location"
            value={job.location}
            onChange={handleChange}
            required
          />
          <input
            name="hours"
            placeholder="Working Hours (3 / 4)"
            value={job.hours}
            onChange={handleChange}
            required
          />
          <input
            name="pay"
            placeholder="Pay Amount"
            value={job.pay}
            onChange={handleChange}
            required
          />
          <input
            name="type"
            placeholder="Job Type (Food, Delivery, Cafe)"
            value={job.type}
            onChange={handleChange}
            required
          />

          <button type="submit">Post Job</button>
        </form>
      </div>
    </section>
  );
};

export default PostJob;
