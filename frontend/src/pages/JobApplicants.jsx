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

const JobApplicants = () => {
  const { jobId } = useParams();
  const [apps, setApps] = useState([]);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    loadApplicants();
  }, [jobId]);

  const loadApplicants = () => {
    getApplicantsForJobApi(jobId)
      .then((res) => setApps(res.data))
      .catch(console.error);
  };

  // ✅ APPROVE / REJECT
  const updateStatus = async (id, status) => {
    await updateApplicationStatusApi(id, status);
    loadApplicants();
  };

  // ✅ PAY NOW (ONLY AFTER APPROVAL)
  const payNow = async (jobId) => {
    try {
      setPaying(true);

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
      setPaying(false);
    }
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

          <p>
            Status: <b>{app.status}</b>
          </p>

          {/* PENDING */}
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

          {/* APPROVED → PAY */}
          {app.status === "APPROVED" && (
            <button
              disabled={paying}
              onClick={() => payNow(app.job.id)}
            >
              💳 Pay Now (5% Commission)
            </button>
          )}

          {/* PAID */}
          {app.status === "PAID" && (
            <span className="paid-badge">✅ Paid</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default JobApplicants;
