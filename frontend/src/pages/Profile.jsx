import { useEffect, useState } from "react";
import { getProfileApi, saveProfileApi } from "../api/profileApi";
import { getUserFromToken } from "../utils/jwtUtils";
import "../styles/auth.css";
import { Navigate } from "react-router-dom";


const Profile = () => {
  const user = getUserFromToken();
  if (!user) return <Navigate to="/login" replace />;

  const [profile, setProfile] = useState({
    email: user?.name || "",
    name: "",
    age: "",
    phone: "",
    address: "",
    city: "",
    status: "",
    skills: "",
    about: "",
  });

  useEffect(() => {
    getProfileApi().then((res) => {
      if (res.data) {
        setProfile((prev) => ({ ...prev, ...res.data }));
      }
    });
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveProfileApi(profile);
    alert("Profile updated successfully");
  };

  return (
    <div className="auth-container">
      <form className="auth-box profile-box animate-up" onSubmit={handleSubmit}>
        <h2>My Profile</h2>

        <input value={profile.email} disabled />

        <input name="name" placeholder="Name" value={profile.name || ""} onChange={handleChange} />
        <input name="age" placeholder="Age" value={profile.age || ""} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={profile.phone || ""} onChange={handleChange} />
        <input name="address" placeholder="Address" value={profile.address || ""} onChange={handleChange} />
        <input name="city" placeholder="City" value={profile.city || ""} onChange={handleChange} />

        <select name="status" value={profile.status || ""} onChange={handleChange}>
          <option value="">Currently you are...</option>
          <option value="STUDENT">Student</option>
          <option value="WORKING">Working</option>
          <option value="JOB_SEEKER">Looking for Job</option>
        </select>

        <input name="skills" placeholder="Skills" value={profile.skills || ""} onChange={handleChange} />
        <textarea name="about" placeholder="About you" value={profile.about || ""} onChange={handleChange} />

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default Profile;
