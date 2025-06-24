"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GoogleSignInButton from './GoogleSignInButton';
import { useAuth } from '@/components/auth/AuthContext';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

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
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address or phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 transition-colors cursor-pointer"
                disabled={loading}
              >
                Log in
              </button>
              <div className="text-center">
                <Link href="/forgot-password" className="text-blue-600 hover:underline">
                  Forgotten password?
                </Link>
              </div>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>
              <GoogleSignInButton />
              <div className="text-center">
                <Link href="/register">
                  <button
                    type="button"
                    className="bg-green-500 text-white px-6 py-3 rounded-md font-bold hover:bg-green-600 transition-colors cursor-pointer"
                  >
                    Create new account
                  </button>
                </Link>
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