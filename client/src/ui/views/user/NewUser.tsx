import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export function NewUser() {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = () => {
    console.log("Saving user...", form);
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden text-white bg-gray-950">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 px-4 py-4 bg-gray-900 flex justify-between items-center border-b border-gray-700">
        <Link to="/users">
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 text-sm sm:text-base">
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Cancel</span>
          </button>
        </Link>
        <h1 className="text-xl md:text-3xl font-bold">Add User</h1>
      </div>

      {/* Scrollable Form Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-10 sm:px-10">
        <form className="space-y-6 max-w-5xl mx-auto">
          {/* Full Name */}
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter user's full name"
              value={form.fullName}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          {/* Username */}
          <div>
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={form.username}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Role Select */}
          <div>
            <label className="block mb-1 font-medium">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
              required
            >
              <option value="">Select user's role...</option>
              <option value="admin">Admin</option>
              <option value="owner">Owner</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button
              type="button"
              onClick={handleSave}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
            >
              Save User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
