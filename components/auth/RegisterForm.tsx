import React from 'react';
import Link from 'next/link';

const RegisterForm = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-blue-600">Sign Up</h1>
          <p className="text-gray-600 mt-2">It's quick and easy.</p>
        </div>

        <form className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First name"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Surname"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <input
            type="text"
            placeholder="Mobile number or email address"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="New password"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />

          <div className="space-y-2">
            <label className="block text-gray-700">Date of birth</label>
            <div className="flex gap-4">
              <select className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                <option value="">Day</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                <option value="">Year</option>
                {Array.from({ length: 100 }, (_, i) => (
                  <option key={i} value={2024 - i}>
                    {2024 - i}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Gender</label>
            <div className="flex gap-4">
              <label className="flex-1 border border-gray-300 rounded-md p-3 flex items-center">
                <input type="radio" name="gender" className="mr-2" />
                Female
              </label>
              <label className="flex-1 border border-gray-300 rounded-md p-3 flex items-center">
                <input type="radio" name="gender" className="mr-2" />
                Male
              </label>
              <label className="flex-1 border border-gray-300 rounded-md p-3 flex items-center">
                <input type="radio" name="gender" className="mr-2" />
                Custom
              </label>
            </div>
          </div>

          <p className="text-xs text-gray-600">
            By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive SMS notifications from us and can opt out at any time.
          </p>

          <div className="text-center">
            <button
              type="submit"
              className="bg-green-500 text-white px-8 py-3 rounded-md font-bold hover:bg-green-600 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <Link href="#" className="text-blue-600 hover:underline">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm; 