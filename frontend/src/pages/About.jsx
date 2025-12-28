import "../styles/about.css";

const About = () => {
  return (
    <section className="about-page">
      {/* HERO */}
      <div className="about-hero">
        <h1>About JobMarketplace</h1>
        <p>
          A local part-time job platform that helps you earn money
          in your free hours near your location.
        </p>
      </div>

      {/* CONTENT */}
      <div className="about-grid">
        <div className="about-card">
          <h2>🎯 Our Mission</h2>
          <p>
            To empower students, job seekers, and skilled workers
            by connecting them with nearby short-hour jobs.
          </p>
        </div>

        <div className="about-card">
          <h2>👥 Who Can Use This?</h2>
          <ul>
            <li>🎓 Students earning pocket money</li>
            <li>🧑‍💼 Part-time job seekers</li>
            <li>🏪 Local business owners</li>
            <li>👨‍🔧 Skilled workers</li>
          </ul>
        </div>

        <div className="about-card">
          <h2>🚀 Why We Are Different</h2>
          <p>
            Unlike traditional job portals, we focus on
            location-based, short-hour work with quick payments
            and flexible schedules.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
