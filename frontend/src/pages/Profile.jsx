import { useEffect, useState } from "react";
import {
  getProfileApi,
  saveProfileApi,
  uploadProfilePhotoApi,
} from "../api/profileApi";
import { getUserFromToken } from "../utils/jwtUtils";
import "../styles/auth.css";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const user = getUserFromToken();
  if (!user) return <Navigate to="/login" replace />;

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
    image: null,
    imagePreview: "",
    photoPath: "",
  });

  const [successMsg, setSuccessMsg] = useState("");

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
      }
    });
  }, []);

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

    // 1️⃣ Save profile data (JSON)
    const payload = { ...profile };
    delete payload.image;
    delete payload.imagePreview;

    await saveProfileApi(payload);

    // 2️⃣ Upload image if selected
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

        {/* AVATAR */}
        <div className="avatar-section">
          <img
            src={
              profile.imagePreview ||
              "https://ui-avatars.com/api/?name=" + (profile.name || "User")
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
          <input
            name="name"
            placeholder="Full Name"
            value={profile.name}
            onChange={handleChange}
          />

          <input
            name="age"
            placeholder="Age"
            value={profile.age}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone"
            value={profile.phone}
            onChange={handleChange}
          />

          <input
            name="city"
            placeholder="City"
            value={profile.city}
            onChange={handleChange}
          />
        </div>

        <input
          name="address"
          placeholder="Address"
          value={profile.address}
          onChange={handleChange}
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
