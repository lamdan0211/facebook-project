import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const LoginForm = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-6xl w-full flex">
        {/* Left side - Facebook info */}
        <div className="w-1/2 pr-8 pt-8">
          <div className="text-4xl font-bold text-blue-600 mb-4">facebook</div>
          <h2 className="text-2xl">
            Facebook helps you connect and share with the people in your life.
          </h2>
        </div>

        {/* Right side - Login form */}
        <div className="w-1/2">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Email address or phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 transition-colors"
              >
                Log in
              </button>
              <div className="text-center">
                <Link href="#" className="text-blue-600 hover:underline">
                  Forgotten password?
                </Link>
              </div>
              <hr className="my-4" />
              <div className="text-center">
                <button
                  type="button"
                  className="bg-green-500 text-white px-6 py-3 rounded-md font-bold hover:bg-green-600 transition-colors"
                >
                  Create new account
                </button>
              </div>
            </form>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm">
              <span className="font-bold">Create a Page</span> for a celebrity, brand or business.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 