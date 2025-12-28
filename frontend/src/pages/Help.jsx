import "../styles/help.css";

const Help = () => {
  return (
    <section className="help-page">
      {/* HERO */}
      <div className="help-hero">
        <h1>Help & Support</h1>
        <p>
          Everything you need to know about using JobMarketplace.
        </p>
      </div>

      {/* FAQ */}
      <div className="help-grid">
        <div className="help-card">
          <h3>🔍 How do I find jobs?</h3>
          <p>
            Login and allow location access to view jobs
            available near you based on your skills.
          </p>
        </div>

        <div className="help-card">
          <h3>💰 How do I earn money?</h3>
          <p>
            Complete the assigned work and receive payment
            as mentioned by the employer.
          </p>
        </div>

        <div className="help-card">
          <h3>🆓 Is registration free?</h3>
          <p>
            Yes, registration is completely free for job seekers.
          </p>
        </div>

        <div className="help-card">
          <h3>✅ Are employers verified?</h3>
          <p>
            Yes, all employers are verified before posting jobs.
          </p>
        </div>

        <div className="help-card">
          <h3>📞 Still need help?</h3>
          <p>
            Contact our support team anytime via email or phone.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Help;
