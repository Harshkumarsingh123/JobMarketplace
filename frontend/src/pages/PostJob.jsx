import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { postJobApi } from "../api/jobApi";
import "../styles/postJob.css";

/* ---------------- Fix Leaflet Marker Icon ---------------- */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* ---------------- Constants ---------------- */
const mapStyle = {
  width: "100%",
  height: "300px",
};

const defaultCenter = {
  lat: 28.6139,
  lng: 77.209,
};

/* ---------------- Reverse Geocoding (FREE) ---------------- */
const getAddressFromLatLng = async (lat, lng) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await res.json();
    return data.display_name || "";
  } catch {
    return "";
  }
};

/* ---------------- Map Click Handler ---------------- */
const LocationPicker = ({ setJob, setMapCenter }) => {
  useMapEvents({
    click: async (e) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      const fullAddress = await getAddressFromLatLng(lat, lng);

      setMapCenter({ lat, lng });
      setJob((prev) => ({
        ...prev,
        lat,
        lng,
        address: fullAddress,
      }));
    },
  });

  return null;
};

const PostJob = () => {
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  const [job, setJob] = useState({
    title: "",
    address: "",      // mandatory
    location: "",     // optional
    lat: null,
    lng: null,
    startDate: "",
    startTime: "",
    endTime: "",
    hours: "",
    pay: "",
    type: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  /* ---------------- Auto Detect User Location ---------------- */
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      const fullAddress = await getAddressFromLatLng(lat, lng);

      setMapCenter({ lat, lng });
      setJob((prev) => ({
        ...prev,
        lat,
        lng,
        address: fullAddress,
      }));
    });
  }, []);

  /* ---------------- Handlers ---------------- */
  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (!job.lat || !job.lng || !job.address) {
      setErrorMsg("Please select job location on the map");
      return;
    }

    if (!job.startDate || !job.startTime) {
      setErrorMsg("Please select job start date & time");
      return;
    }

    try {
      await postJobApi(job);

      setSuccessMsg("✅ Job posted successfully");

      setJob({
        title: "",
        address: "",
        location: "",
        lat: null,
        lng: null,
        startDate: "",
        startTime: "",
        endTime: "",
        hours: "",
        pay: "",
        type: "",
      });

      setMapCenter(defaultCenter);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error(err);
      setErrorMsg("❌ Failed to post job");
    }
  };

  return (
    <section className="postjob-page">
      {/* HERO */}
      <div className="postjob-hero">
        <h1>Post a Part-Time Job</h1>
        <p>Hire workers near your location</p>
      </div>

      {/* FORM */}
      <div className="postjob-card">
        <form onSubmit={handleSubmit}>
          {successMsg && <div className="success-banner">{successMsg}</div>}
          {errorMsg && <div className="error-banner">{errorMsg}</div>}

          <input
            name="title"
            placeholder="Job Title"
            value={job.title}
            onChange={handleChange}
            required
          />

          {/* FREE MAP */}
          <MapContainer center={mapCenter} zoom={14} style={mapStyle}>
            <TileLayer
              attribution="© OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LocationPicker setJob={setJob} setMapCenter={setMapCenter} />

            {job.lat && <Marker position={[job.lat, job.lng]} />}
          </MapContainer>

          {/* FULL ADDRESS */}
          <input
            name="address"
            placeholder="Full Address"
            value={job.address || ""}
            onChange={handleChange}
            required
          />

          {/* AREA / LANDMARK */}
          <input
            name="location"
            placeholder="Area / Landmark (optional)"
            value={job.location}
            onChange={handleChange}
          />

          {/* DATE & TIME */}
          <div className="form-grid">
            <input
              type="date"
              name="startDate"
              value={job.startDate}
              onChange={handleChange}
              required
            />

            <input
              type="time"
              name="startTime"
              value={job.startTime}
              onChange={handleChange}
              required
            />

            <input
              type="time"
              name="endTime"
              value={job.endTime}
              onChange={handleChange}
            />
          </div>

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
            placeholder="Job Type (Cafe, Delivery)"
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
