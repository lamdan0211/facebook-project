'use client';
import React from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';

const userDetails = {
  workAt: 'Your Company',
  studiedAt: 'Your University',
  livesIn: 'Your City',
  from: 'Your Hometown',
  bio: 'This is a short bio about the user. You can update this in your profile settings.'
};

export default function AboutPage() {
  const { user } = useAuth();
  const userName = user?.displayName || user?.fullname || user?.name || user?.email || 'User';
  return (
    <div className="flex flex-1 overflow-hidden md:flex">
      {/* Sidebar left */}
      <div className="md:w-1/4 w-full">
        <LeftSidebar />
      </div>
      {/* About content right */}
      <div className="flex-1 overflow-auto scrollbar-hide p-4 flex justify-center pt-10">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6 text-blue-700">About {userName}</h1>
          <div className="space-y-4 text-gray-800 text-base">
            <div>
              <span className="font-semibold">Works at:</span> {userDetails.workAt}
            </div>
            <div>
              <span className="font-semibold">Studied at:</span> {userDetails.studiedAt}
            </div>
            <div>
              <span className="font-semibold">Lives in:</span> {userDetails.livesIn}
            </div>
            <div>
              <span className="font-semibold">From:</span> {userDetails.from}
            </div>
            <div>
              <span className="font-semibold">Bio:</span> <span className="italic text-gray-600">{userDetails.bio}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block lg:w-72 bg-gray-100 p-4 overflow-y-auto flex-shrink-0">
        <RightSidebar />
      </div>
    </div>
  );
} 