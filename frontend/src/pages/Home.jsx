import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import { getUserFromToken } from "../utils/jwtUtils";
import { useReveal } from "../hooks/useReveal";

const Home = () => {
  const navigate = useNavigate();
  const user = getUserFromToken();

  const isLoggedIn = Boolean(user);
  const role = user?.role;

  // reveal hooks
  const [statsRef, statsShow] = useReveal();
  const [audienceRef, audienceShow] = useReveal();
  const [earnRef, earnShow] = useReveal();
  const [testRef, testShow] = useReveal();
  const [trustRef, trustShow] = useReveal();

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Earn Money in Your Free Hours <br /> Near Your Location
          </h1>

          <p className="hero-subtitle">
            Work for 3–4 hours at nearby restaurants, fuel stations, cafés,
            bars, delivery points & more.
          </p>

          <div className="hero-buttons">
            {!isLoggedIn && (
              <>
                <button className="btn-primary" onClick={() => navigate("/signup")}>
                  Register & Start Earning
                </button>
                <button className="btn-secondary" onClick={() => navigate("/login")}>
                  Find Nearby Jobs
                </button>
              </>
            )}

            {isLoggedIn && role === "JOB_SEEKER" && (
              <>
                <button className="btn-primary" onClick={() => navigate("/jobs")}>
                  Find Jobs
                </button>
                <button className="btn-secondary" onClick={() => navigate("/applications")}>
                  My Applications
                </button>
              </>
            )}

            {isLoggedIn && role === "JOB_PROVIDER" && (
              <>
                <button className="btn-primary" onClick={() => navigate("/post-job")}>
                  Post a Job
                </button>
                <button className="btn-secondary" onClick={() => navigate("/my-jobs")}>
                  My Jobs
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2 className="section-title">Why Choose Our Platform?</h2>

        <div className="feature-grid">
          {[
            ["📍", "Location Based Jobs", "Find work near your home or college"],
            ["⏰", "Flexible Hours", "Work only when you are free"],
            ["💰", "Quick Earnings", "Daily or weekly payments"],
            ["🔐", "Safe & Secure", "Verified employers"],
          ].map(([icon, title, desc], i) => (
            <div className="card animate-up" style={{ animationDelay: `${i * 0.1}s` }} key={title}>
              <span className="icon">{icon}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className={`stats ${statsShow ? "show" : ""}`}>
        <div className="stat-card"><h3>10K+</h3><p>Job Seekers</p></div>
        <div className="stat-card"><h3>2K+</h3><p>Employers</p></div>
        <div className="stat-card"><h3>15K+</h3><p>Jobs Done</p></div>
        <div className="stat-card"><h3>₹1Cr+</h3><p>Earnings</p></div>
      </section>

      {/* AUDIENCE */}
      <section ref={audienceRef} className={`audience ${audienceShow ? "show" : ""}`}>
        <h2 className="section-title">Who Is This Platform For?</h2>

        <div className="audience-grid">
          <div className="audience-card">🎓<h3>Students</h3><p>Earn without affecting studies</p></div>
          <div className="audience-card">🧑‍💼<h3>Part-Timers</h3><p>Flexible income</p></div>
          <div className="audience-card">🏪<h3>Businesses</h3><p>Hire fast for short shifts</p></div>
        </div>
      </section>

      {/* EARN */}
      <section ref={earnRef} className={`earn ${earnShow ? "show" : ""}`}>
        <h2 className="section-title">How You Earn</h2>

        <div className="earn-grid">
          <div className="earn-card">1️⃣ Pick Job</div>
          <div className="earn-card">2️⃣ Work 3–4 Hours</div>
          <div className="earn-card">3️⃣ Get Paid</div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section ref={testRef} className={`testimonials ${testShow ? "show" : ""}`}>
        <h2 className="section-title">What Users Say</h2>

        <div className="testimonial-grid">
          <div className="testimonial-card">“Earn daily after college.” — Rohit</div>
          <div className="testimonial-card">“Found staff quickly.” — Ankit</div>
          <div className="testimonial-card">“Simple & real jobs.” — Neha</div>
        </div>
      </section>

      {/* TRUST */}
      <section ref={trustRef} className={`trust ${trustShow ? "show" : ""}`}>
        <h2 className="section-title">Why Trust Us?</h2>

        <div className="trust-grid">
          <div className="trust-card">✅ Verified Employers</div>
          <div className="trust-card">🔐 Secure Payments</div>
          <div className="trust-card">📍 Local Jobs</div>
          <div className="trust-card">⚡ Fast Hiring</div>
        </div>
      </section>

      {/* CTA */}
      {!isLoggedIn && (
        <section className="cta">
          <h2>Turn Your Free Time Into Income</h2>
          <button className="btn-primary" onClick={() => navigate("/signup")}>
            Get Started Now
          </button>
        </section>
      )}
    </>
  );
};

export default Home;
