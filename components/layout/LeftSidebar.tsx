"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthContext';
import Avatar from '../user/Avatar';

const LeftSidebar = () => {
  const { user } = useAuth();
  const menuItems = [
    { name: 'Friends', icon: '👥' }, 
    { name: 'Watch', icon: '📺' },
    { name: 'Saved', icon: '🔖' }, 
  ];

  return (
    <div className="p-4 flex flex-col">
      {/* User Section */}
      <Link href="/profile" className="flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer mb-4 -ml-2 -mr-2 gap-[10]">
      <Avatar author={{avatar: "from-red-600 to-red-300", name: user?.displayName || "User"}} />
        <span className="font-semibold text-gray-800">{user?.displayName || user?.email || 'User'}</span>
      </Link>

      {/* Divider */}
      <hr className="border-t border-gray-300 my-2" />

      {/* Menu Items */}
      <ul className="space-y-1 flex-grow">
        {menuItems.map((item) => {
          let href = null;
          if (item.name === 'Friends') href = '/friends';
          else if (item.name === 'Watch') href = '/watch';
          else if (item.name === 'Saved') href = '/saved';
          if (href) {
            return (
              <li key={item.name}>
                <Link href={href} className="flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer text-gray-700 -ml-2 -mr-2">
                  <div className="w-8 h-8 flex items-center justify-center mr-3 text-xl">
                    {item.icon}
                  </div>
                  <span className="font-medium text-gray-800 text-sm">{item.name}</span>
                </Link>
              </li>
            );
          }
          return (
            <li key={item.name} className="flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer text-gray-700 -ml-2 -mr-2">
              <div className="w-8 h-8 flex items-center justify-center mr-3 text-xl">
                {item.icon}
              </div>
              <span className="font-medium text-gray-800 text-sm">{item.name}</span>
            </li>
          );
        })}
      </ul>

    </div>
  );
};

export default LeftSidebar; 