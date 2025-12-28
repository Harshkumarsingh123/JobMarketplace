import "../styles/home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Earn Money in Your Free Hours <br /> Near Your Location
          </h1>

          <p className="hero-subtitle">
            Work for 3–4 hours at nearby restaurants, fuel stations, cafés,
            bars, delivery points & more. Perfect for students, part-timers,
            and anyone looking for extra income.
          </p>

          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={() => navigate("/signup")}
            >
              Register & Start Earning
            </button>

            <button
              className="btn-secondary"
              onClick={() => navigate("/login")}
            >
              Find Nearby Jobs
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2 className="section-title">Why Choose Our Platform?</h2>

        <div className="feature-grid">
          <div className="card">
            <span className="icon">📍</span>
            <h3>Location Based Jobs</h3>
            <p>
              Find work near your home, hostel, or college without long travel.
            </p>
          </div>

          <div className="card">
            <span className="icon">⏰</span>
            <h3>Flexible Working Hours</h3>
            <p>
              Work only when you are free – 2, 3 or 4 hours a day.
            </p>
          </div>

          <div className="card">
            <span className="icon">💰</span>
            <h3>Quick Earnings</h3>
            <p>
              Daily or weekly payments based on job type.
            </p>
          </div>

          <div className="card">
            <span className="icon">🔐</span>
            <h3>Safe & Secure</h3>
            <p>
              Verified employers and secure user profiles.
            </p>
          </div>
        </div>
      </section>

      {/* JOB CATEGORIES */}
      <section className="steps">
        <h2 className="section-title">Available Job Categories</h2>

        <div className="steps-grid">
          <div className="step-card">🍽 Restaurant / Café Helper</div>
          <div className="step-card">⛽ Fuel Station Assistant</div>
          <div className="step-card">🚗 Driver / Delivery Helper</div>
          <div className="step-card">🏪 Shop & Store Support</div>
          <div className="step-card">🎧 Event & Temporary Staff</div>
          <div className="step-card">🛠 Skill-Based Local Work</div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how">
        <h2 className="section-title">How It Works</h2>

        <div className="how-grid">
          <div className="how-card">
            <h3>1️⃣ Create Profile</h3>
            <p>Add your skills, location & availability.</p>
          </div>

          <div className="how-card">
            <h3>2️⃣ Find or Post Jobs</h3>
            <p>Search nearby jobs or post work as an employer.</p>
          </div>

          <div className="how-card">
            <h3>3️⃣ Work & Earn</h3>
            <p>Complete the job and get paid easily.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Turn Your Free Time Into Income</h2>
        <p>
          Students, job seekers & local businesses — this platform is built for you.
        </p>

        <button
          className="btn-primary"
          onClick={() => navigate("/signup")}
        >
          Get Started Now
        </button>
      </section>
    </>
  );
};

export default Home;
