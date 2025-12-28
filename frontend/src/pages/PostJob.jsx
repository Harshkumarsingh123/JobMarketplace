import { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { postJobApi } from "../api/jobApi";
import "../styles/postJob.css";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const defaultCenter = {
  lat: 28.6139,
  lng: 77.209,
};

const PostJob = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  });

  const [mapCenter, setMapCenter] = useState(defaultCenter);

  const [job, setJob] = useState({
    title: "",
    address: "",     // ✅ mandatory
    location: "",    // ❌ optional
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

  /* ---------------- Reverse Geocoding ---------------- */
  const getAddressFromLatLng = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_KEY}`
      );
      const data = await res.json();

      if (data.status === "OK") {
        return data.results[0].formatted_address;
      }
    } catch (err) {
      console.error(err);
    }
    return "";
  };

  /* ---------------- Auto Detect User Location ---------------- */
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
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
      },
      () => console.warn("Location permission denied")
    );
  }, []);

  /* ---------------- Handlers ---------------- */
  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleMapClick = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const fullAddress = await getAddressFromLatLng(lat, lng);

    setMapCenter({ lat, lng });
    setJob((prev) => ({
      ...prev,
      lat,
      lng,
      address: fullAddress,
    }));
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

  if (!isLoaded) return <p>Loading Map...</p>;

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

          {/* MAP */}
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={14}
            center={mapCenter}
            onClick={handleMapClick}
          >
            {job.lat && <Marker position={{ lat: job.lat, lng: job.lng }} />}
          </GoogleMap>

          {/* FULL ADDRESS (MANDATORY) */}
          <input
            name="address"
            placeholder="Full Address"
            value={job.address}
            onChange={handleChange}
            required
          />

          {/* LOCATION / AREA (OPTIONAL) */}
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
              placeholder="End Time (optional)"
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
