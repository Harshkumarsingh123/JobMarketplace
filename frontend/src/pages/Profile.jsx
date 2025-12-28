import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import {
  getProfileApi,
  saveProfileApi,
  uploadProfilePhotoApi,
} from "../api/profileApi";
import { getUserFromToken } from "../utils/jwtUtils";
import "../styles/auth.css";
import { Navigate } from "react-router-dom";

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
  height: "250px",
};

const defaultCenter = {
  lat: 28.6139,
  lng: 77.209,
};

/* ---------------- Map Click Component ---------------- */
const LocationPicker = ({ setMapCenter, setProfile }) => {
  useMapEvents({
    click: async (e) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      const address = await getAddressFromLatLng(lat, lng);

      setMapCenter({ lat, lng });
      setProfile((prev) => ({
        ...prev,
        latitude: lat,
        longitude: lng,
        address,
      }));
    },
  });

  return null;
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

const Profile = () => {
  const user = getUserFromToken();
  if (!user) return <Navigate to="/login" replace />;

  const [mapCenter, setMapCenter] = useState(defaultCenter);

  const [profile, setProfile] = useState({
    email: user.email,
    name: "",
    age: "",
    phone: "",
    address: "",
    city: "",
    status: "",
    skills: "",
    about: "",
    latitude: null,
    longitude: null,
    image: null,
    imagePreview: "",
    photoPath: "",
  });

  const [successMsg, setSuccessMsg] = useState("");

  /* ---------------- Load Profile ---------------- */
  useEffect(() => {
    getProfileApi().then((res) => {
      if (res.data) {
        const filename = res.data.photoPath
          ? res.data.photoPath.split("/").pop()
          : "";

        setProfile((prev) => ({
          ...prev,
          ...res.data,
          imagePreview: filename
            ? `http://localhost:8080/api/images/profile/${filename}`
            : "",
        }));

        if (res.data.latitude && res.data.longitude) {
          setMapCenter({
            lat: res.data.latitude,
            lng: res.data.longitude,
          });
        }
      }
    });
  }, []);

  /* ---------------- Auto Detect Location ---------------- */
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      const address = await getAddressFromLatLng(lat, lng);

      setMapCenter({ lat, lng });
      setProfile((prev) => ({
        ...prev,
        latitude: lat,
        longitude: lng,
        address,
      }));
    });
  }, []);

  /* ---------------- Handlers ---------------- */
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfile({
      ...profile,
      image: file,
      imagePreview: URL.createObjectURL(file),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...profile };
    delete payload.image;
    delete payload.imagePreview;

    await saveProfileApi(payload);

    if (profile.image) {
      await uploadProfilePhotoApi(profile.image);
    }

    setSuccessMsg("✅ Profile updated successfully");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div className="auth-container">
      <form className="auth-box profile-box animate-up" onSubmit={handleSubmit}>
        <h2>My Profile</h2>

        {successMsg && <div className="success-banner">{successMsg}</div>}

        {/* Avatar */}
        <div className="avatar-section">
          <img
            src={
              profile.imagePreview ||
              "https://ui-avatars.com/api/?name=" +
                (profile.name || "User")
            }
            alt="Profile"
            className="avatar"
          />
          <label className="upload-btn">
            Upload Photo
            <input type="file" hidden onChange={handleImageChange} />
          </label>
        </div>

        <input value={profile.email} disabled />

        <div className="form-grid">
          <input name="name" placeholder="Full Name" value={profile.name} onChange={handleChange} />
          <input name="age" placeholder="Age" value={profile.age} onChange={handleChange} />
          <input name="phone" placeholder="Phone" value={profile.phone} onChange={handleChange} />
          <input name="city" placeholder="City" value={profile.city} onChange={handleChange} />
        </div>

        {/* FREE MAP */}
        <MapContainer center={mapCenter} zoom={14} style={mapStyle}>
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <LocationPicker setMapCenter={setMapCenter} setProfile={setProfile} />

          {profile.latitude && (
            <Marker position={[profile.latitude, profile.longitude]} />
          )}
        </MapContainer>

        <input
          name="address"
          placeholder="Your Location (auto-filled from map)"
          value={profile.address || ""}
          onChange={handleChange}
          required
        />

        <select name="status" value={profile.status} onChange={handleChange}>
          <option value="">Currently you are...</option>
          <option value="STUDENT">Student</option>
          <option value="WORKING">Working</option>
          <option value="JOB_SEEKER">Looking for Job</option>
        </select>

        <input
          name="skills"
          placeholder="Skills (e.g. Waiter, Delivery)"
          value={profile.skills}
          onChange={handleChange}
        />

        <textarea
          name="about"
          placeholder="Tell us about yourself"
          value={profile.about}
          onChange={handleChange}
        />

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default Profile;
