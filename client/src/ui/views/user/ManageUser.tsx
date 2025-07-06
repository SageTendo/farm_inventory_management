import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export function ManageUser() {
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

  const doDeleteUser = () => {
    if (confirm("Are you sure you want to delete this user?")) {
      console.log("Deleting user...");
    }
  };

  const doSaveUser = () => {
    console.log("Saving user...");
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden text-white bg-gray-950">
      {/* Sticky Header */}
      <div className="sticky top-0 z-60 px-4 py-4 bg-gray-900 flex justify-between items-center border-b border-gray-700">
        <Link to="/users">
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 text-sm sm:text-base">
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Users</span>
          </button>
        </Link>
        <h1 className="text-xl md:text-3xl font-bold">Manage User</h1>
      </div>

      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-10 sm:px-10">
        <form className="space-y-6 max-w-5xl mx-auto">
          {/* Full Name */}
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Enter user's full name"
              className="w-full p-3 rounded text-white bg-gray-800 border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          {/* Username */}
          <div>
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full p-3 rounded text-white bg-gray-800 border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full p-3 rounded text-white bg-gray-800 border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full p-3 rounded text-white bg-gray-800 border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Role Select */}
          <div>
            <label className="block mb-1 font-medium">Role</label>
            <select
              className="w-full p-3 text-white rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
              required
            >
              <option value="">Select User's Role</option>
              <option value="admin">Admin</option>
              <option value="user">Owner</option>
              <option value="guest">Staff</option>
            </select>
          </div>

          {/* Immutable Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-gray-400">
                Created At:
              </label>
              <input
                type="text"
                readOnly
                value="2023-01-01"
                className="w-full p-3 text-gray-400 rounded bg-gray-700 border border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-400">
                Updated At:
              </label>
              <input
                type="text"
                readOnly
                value="2023-01-01"
                className="w-full p-3 text-gray-400 rounded bg-gray-700 border border-gray-700"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm mb-1 text-gray-400">
                Added By:
              </label>
              <input
                type="text"
                readOnly
                value="John Doe"
                className="w-full p-3 text-gray-400 rounded bg-gray-700 border border-gray-700"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={doDeleteUser}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition"
            >
              Delete User
            </button>
            <button
              type="button"
              onClick={doSaveUser}
              disabled={saveButtonDisabled}
              className={`w-full py-3 rounded-lg font-bold transition ${
                saveButtonDisabled
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
