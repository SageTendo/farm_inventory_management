import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export function SettingsPage() {
  const [form, setForm] = useState({
    fullName: "John Doe",
    username: "johndoe",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePasswordChange = () => {
    console.log("Changing password...", form.password, form.confirmPassword);
    // TODO: Add real logic
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden text-white bg-gray-950">
      {/* Header */}
      <div className="sticky top-0 z-60 px-4 py-4 bg-gray-900 flex items-center border-b border-gray-700 gap-3 font-bol">
        <FontAwesomeIcon icon={faCog} className="text-4xl text-blue-500" />
        <h1 className="text-4xl font-bold">Settings</h1>
      </div>

      {/* Account Section */}
      <div className="flex flex-col justify-center h-full space-y-6 max-w-5xl mx-auto">
        <div>
          <h2 className="text-xl font-semibold mb-4">Account</h2>

          {/* User Info (read-only) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block mb-1 text-sm">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                disabled
                className="w-full p-3 rounded bg-gray-800 text-gray-400 border border-gray-700"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                disabled
                className="w-full p-3 rounded bg-gray-800 text-gray-400 border border-gray-700"
              />
            </div>
          </div>

          {/* Password Fields */}
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm">New Password</label>
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
              <label className="block mb-1 text-sm">Confirm Password</label>
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
            <div className="col-span-1 sm:col-span-2 pt-2">
              <button
                type="button"
                onClick={handlePasswordChange}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 w-full rounded-lg transition"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
