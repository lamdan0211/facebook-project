"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Sender {
  id: number;
  fullname: string;
  profilepic?: string;
}

interface FriendRequest {
  id: number;
  sender: Sender;
  status: string;
}

const ReceivedFriendRequests = () => {
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReceivedRequests = async () => {
    const storedUser = sessionStorage.getItem('user');
    if (!storedUser) {
      setLoading(false);
      return;
    }
    const currentUser = JSON.parse(storedUser);
    const accessToken = sessionStorage.getItem('accessToken');

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3301/backend/friendrequest/pending/${currentUser.id}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setRequests(data.received || []);
      } else {
        setRequests([]);
      }
    } catch (error) {
      console.error("Failed to fetch received friend requests:", error);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReceivedRequests();
  }, []);

  const handleResponse = async (senderId: number, status: 'accepted' | 'declined') => {
    const accessToken = sessionStorage.getItem('accessToken');
    try {
      const res = await fetch('http://localhost:3301/backend/friendrequest/respond', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ senderId, status }),
      });

      if (res.ok) {
        setRequests(prevRequests => prevRequests.filter(req => req.sender.id !== senderId));
      } else {
        console.error('Failed to respond to friend request');
      }
    } catch (error) {
      console.error('Error responding to friend request:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h1 className="text-2xl font-bold mb-6">Friend Requests</h1>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : requests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {requests.filter(req => req && req.sender).map((req) => (
             <div key={req.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center">
                <Link href={`/profile/${req.sender.id}`}>
                    <div className="w-24 h-24 relative mb-3 cursor-pointer">
                    <Image
                        src={req.sender.profilepic || '/avatars/default-avatar.png'}
                        alt={req.sender.fullname}
                        fill
                        className="rounded-full object-cover"
                    />
                    </div>
                </Link>
                <Link href={`/profile/${req.sender.id}`}>
                    <h2 className="text-md font-semibold text-gray-900 hover:underline truncate w-full">{req.sender.fullname}</h2>
                </Link>
                <div className="w-full flex flex-col gap-2 mt-4">
                    <button
                    onClick={() => handleResponse(req.sender.id, 'accepted')}
                    className="w-full px-4 py-2 rounded-lg font-semibold text-sm transition-colors bg-blue-500 text-white hover:bg-blue-600"
                    >
                    Confirm
                    </button>
                    <button
                    onClick={() => handleResponse(req.sender.id, 'declined')}
                    className="w-full px-4 py-2 rounded-lg font-semibold text-sm transition-colors bg-gray-200 text-black hover:bg-gray-300"
                    >
                    Delete
                    </button>
                </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10 bg-white p-6 rounded-lg shadow">
            <p className="text-lg">No new friend requests.</p>
        </div>
      )}
    </div>
  );
};

export default ReceivedFriendRequests; 