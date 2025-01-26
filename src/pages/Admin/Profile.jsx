import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS

function Profile() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    year: "2nd Year",
    department: "Computer Science",
    email: "johndoe@example.com",
    phone: "1234567890",
    skills: "JavaScript, React, Python",
    interests: "Web Development, AI, Open Source",
    availability: "Part-time",
    bio: "Passionate about technology and open source contributions.",
    location: "Tamil Nadu, India",
    volunteerInterests: "Helping in education, Community Outreach",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSave = () => {
    console.log("Profile saved:", profile);
    toast.success("Profile updated successfully!"); // Show success toast
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 p-6 md:p-12 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl font-extrabold text-white mb-3">Edit Profile</h1>
            <p className="text-indigo-200">Update your personal details and preferences.</p>
          </div>
        </header>

        {/* Profile Editing Content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 space-y-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-3xl font-semibold text-white">Personal Information</h3>
            <button
              className="bg-indigo-600 text-white font-semibold text-lg px-6 py-3 rounded-lg hover:bg-indigo-500 transition"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>

          {/* Profile Fields */}
          {Object.entries(profile).map(
            ([key, value]) =>
              key !== "volunteerInterests" &&
              key !== "bio" &&
              key !== "location" && (
                <div key={key} className="mb-6">
                  <label className="block mb-2 text-xl font-semibold text-indigo-200 capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                  {key !== "availability" ? (
                    <input
                      type={key === "email" ? "email" : "text"}
                      name={key}
                      value={value}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full p-4 bg-transparent border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 transition"
                    />
                  ) : (
                    <select
                      name={key}
                      value={value}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full p-4 bg-transparent border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 transition"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Weekends">Weekends</option>
                      <option value="Evenings">Evenings</option>
                    </select>
                  )}
                </div>
              )
          )}

          {/* New Fields: Bio, Location, Volunteer Interests */}
          <div className="mb-6">
            <label className="block mb-2 text-xl font-semibold text-indigo-200">Bio</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-4 bg-transparent border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 transition"
              rows="4"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-xl font-semibold text-indigo-200">Location</label>
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-4 bg-transparent border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-xl font-semibold text-indigo-200">Volunteer Interests</label>
            <textarea
              name="volunteerInterests"
              value={profile.volunteerInterests}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-4 bg-transparent border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 transition"
              rows="3"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-6 mt-8">
            {isEditing && (
              <>
                <button
                  className="bg-green-500 text-white text-lg px-8 py-3 rounded-lg hover:bg-green-600 transition"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ToastContainer component to show the toasts */}
      <ToastContainer />
    </div>
  );
}

export default Profile;
