import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getApplicantsForJobApi,
  updateApplicationStatusApi,
} from "../api/applicationApi";
import {
  createOrderApi,
  verifyPaymentApi,
} from "../api/paymentApi";
import "../styles/application.css";

const JobApplicants = () => {
  const { jobId } = useParams();
  const [apps, setApps] = useState([]);
  const [payingId, setPayingId] = useState(null);

  useEffect(() => {
    loadApplicants();
  }, [jobId]);

  const loadApplicants = async () => {
    try {
      const res = await getApplicantsForJobApi(jobId);
      setApps(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------------- APPROVE / REJECT ---------------- */
  const updateStatus = async (id, status) => {
    try {
      await updateApplicationStatusApi(id, status);
      loadApplicants();
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------------- PAY NOW ---------------- */
  const payNow = async (jobId, appId) => {
    try {
      setPayingId(appId);

      const res = await createOrderApi(jobId);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: res.data.amount * 100,
        currency: "INR",
        name: "JobMarketplace",
        description: "Job Payment",
        order_id: res.data.orderId,

        handler: async function (response) {
          await verifyPaymentApi({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });

          alert("✅ Payment Successful");
          loadApplicants();
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("❌ Payment failed");
    } finally {
      setPayingId(null);
    }
  };

  return (
    <div className="applications-page">
      <h2 className="page-title">Job Applicants</h2>

      {apps.length === 0 && (
        <p className="empty-text">No applicants yet</p>
      )}

      {apps.map((app) => (
        <div key={app.id} className="applications-card">
          <div className="applicant-header">
            <h3>{app.applicantName}</h3>
            <span className={`status-badge ${app.status.toLowerCase()}`}>
              {app.status}
            </span>
          </div>

          <p>📧 {app.applicantEmail}</p>
          <p>📞 {app.applicantPhone}</p>
          <p>🛠 {app.applicantSkills}</p>

          {/* ACTIONS */}
          <div className="action-row">

            {/* PENDING → APPROVE / REJECT */}
            {app.status === "PENDING" && (
              <>
                <button
                  className="btn approve"
                  onClick={() => updateStatus(app.id, "APPROVED")}
                >
                  Approve
                </button>

                <button
                  className="btn reject"
                  onClick={() => updateStatus(app.id, "REJECTED")}
                >
                  Reject
                </button>
              </>
            )}

            {/* APPROVED → PAY NOW */}
            {app.status === "APPROVED" && (
              <button
                className="btn pay"
                disabled={payingId === app.id}
                onClick={() => payNow(app.job.id, app.id)}
              >
                {payingId === app.id ? "Processing..." : "Pay Now"}
              </button>
            )}

            {/* PAID */}
            {app.status === "PAID" && (
              <span className="paid-label">✅ Payment Completed</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobApplicants;
