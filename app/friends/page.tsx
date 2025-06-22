"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useRequireAuth from '@/lib/useRequireAuth';
import FriendRequests from '@/components/friends/FriendRequests';
import SentRequestsPlaceholder from '@/components/friends/SentRequestsPlaceholder';
import { usePathname } from 'next/navigation';

interface User {
  id: number;
  fullname: string;
  email: string;
  profilepic?: string;
}

enum FriendRequestStatus {
  Default = 'Add Friend',
  Sending = 'Sending...',
  Sent = 'Request Sent',
}

const FriendsPage = () => {
  useRequireAuth();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [requestStatus, setRequestStatus] = useState<Record<number, FriendRequestStatus>>({});
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
        setLoading(false);
    }
  }, []);


  useEffect(() => {
    const fetchUsers = async () => {
      if (!currentUser) return;
      setLoading(true);
      const accessToken = sessionStorage.getItem('accessToken');
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('http://localhost:3301/backend/user', {
          headers: { 'Authorization': `Bearer ${accessToken}` },
        });
        if (res.ok) {
          const responseData = await res.json();
          const userList: User[] = Array.isArray(responseData) ? responseData : responseData.data || [];
          const filteredUsers = userList.filter(u => u.id !== currentUser.id);
          setUsers(filteredUsers);
        } else {
          console.error('Failed to fetch users', res);
          setUsers([]);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser]);

  const handleAddFriend = async (receiverId: number) => {
    if (!currentUser) return;

    setRequestStatus(prev => ({ ...prev, [receiverId]: FriendRequestStatus.Sending }));

    try {
      const accessToken = sessionStorage.getItem('accessToken');
      const res = await fetch(`http://localhost:3301/backend/friendrequest/send/${currentUser.id}/${receiverId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });

      if (res.ok) {
        setRequestStatus(prev => ({ ...prev, [receiverId]: FriendRequestStatus.Sent }));
      } else {
        console.error('Failed to send friend request');
        setRequestStatus(prev => ({ ...prev, [receiverId]: FriendRequestStatus.Default }));
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
      setRequestStatus(prev => ({ ...prev, [receiverId]: FriendRequestStatus.Default }));
    }
  };

  const UserCard = ({ user }: { user: User }) => (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center">
      <Link href={`/profile/${user.id}`}>
        <div className="w-24 h-24 relative mb-3 cursor-pointer">
          <Image
            src={user.profilepic || '/avatars/default-avatar.png'}
            alt={user.fullname}
            fill
            className="rounded-full object-cover"
          />
        </div>
      </Link>
      <Link href={`/profile/${user.id}`}>
        <h2 className="text-md font-semibold text-gray-900 hover:underline truncate w-full">{user.fullname}</h2>
      </Link>
      <p className="text-sm text-gray-500 mb-4 truncate w-full">{user.email}</p>
      <button
        onClick={() => handleAddFriend(user.id)}
        disabled={requestStatus[user.id] === FriendRequestStatus.Sending || requestStatus[user.id] === FriendRequestStatus.Sent}
        className={`w-full px-4 py-2 rounded-lg font-semibold text-sm transition-colors
          ${
            requestStatus[user.id] === FriendRequestStatus.Sent
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
          }
        `}
      >
        {requestStatus[user.id] || FriendRequestStatus.Default}
      </button>
    </div>
  );

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="flex gap-6">
        {/* Left Sidebar */}
        <div className="w-80 flex-shrink-0 hidden lg:block">
          <div className="bg-white rounded-lg shadow p-4 sticky top-20">
            <h2 className="text-xl font-bold mb-4">Friends</h2>
            <nav className="space-y-1">
              <Link href="/dashboard" className={`flex items-center px-4 py-2 rounded-lg font-medium ${pathname === '/dashboard' ? 'bg-gray-100' : 'hover:bg-gray-100'}`}>
                <span className="text-2xl mr-3">🏠</span> Trang chủ
              </Link>
              <Link href="/friends" className={`flex items-center px-4 py-2 rounded-lg font-medium ${pathname === '/friends' ? 'bg-gray-100' : 'hover:bg-gray-100'}`}>
                <span className="text-2xl mr-3">👥</span> Lời mời kết bạn
              </Link>
              <Link href="/saved" className={`flex items-center px-4 py-2 rounded-lg font-medium ${pathname === '/saved' ? 'bg-gray-100' : 'hover:bg-gray-100'}`}>
                <span className="text-2xl mr-3">🔖</span> Đã lưu
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h1 className="text-2xl font-bold">People You May Know</h1>
          </div>
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : users.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {users.map((user) => <UserCard key={user.id} user={user} />)}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-10 bg-white p-6 rounded-lg shadow">
              <p className="text-lg">No New Friends to Suggest</p>
              <p>Check back later!</p>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-80 flex-shrink-0 hidden xl:block">
          <div className="space-y-4 sticky top-20">
            <FriendRequests />
            <SentRequestsPlaceholder />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage; 