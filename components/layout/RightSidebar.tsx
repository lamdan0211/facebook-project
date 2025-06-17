"use client";
import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/components/auth/AuthContext';

const RightSidebar = () => {
  const { user } = useAuth();

  // Updated example data for Suggested Groups and Contacts with realistic image URLs
  const suggestedGroups = [
    { id: 1, name: 'React Developers', cover: 'https://images.pexels.com/photos/11035398/pexels-photo-11035398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', members: '50k members' }, // Updated cover URL
    { id: 2, name: 'Next.js Enthusiasts', cover: 'https://images.pexels.com/photos/7117521/pexels-photo-7117521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', members: '30k members' }, // Updated cover URL
    { id: 3, name: 'Tailwind CSS Ninjas', cover: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', members: '20k members' }, // Updated cover URL
  ];

  const contacts = [
    { name: 'Dennis Han', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', isOnline: true }, // Updated avatar URL
    { name: 'Eric Jones', avatar: 'https://images.pexels.com/photos/842871/pexels-photo-842871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', isOnline: false }, // Updated avatar URL
    { name: 'Cynthia Lopez', avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', isOnline: true }, // Updated avatar URL
    { name: 'Anna Becklund', avatar: 'https://images.pexels.com/photos/1031081/pexels-photo-1031081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', isOnline: false }, // Updated avatar URL
    { name: 'Aiden Brown', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', isOnline: true }, // Updated avatar URL
    { name: 'Betty Chen', avatar: 'https://images.pexels.com/photos/3768166/pexels-photo-3768166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', isOnline: true }, // Updated avatar URL
    { name: 'Dan Brown', avatar: 'https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', isOnline: false }, // Updated avatar URL
    { name: 'Henri Cook', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', isOnline: true }, // Updated avatar URL
  ];

  return (
    <div className="p-4 flex flex-col">
      {/* Contacts Section */}
      <div>
        <h3 className="text-base font-semibold text-gray-700 mb-3 flex justify-between items-center">
          Contacts
         
        </h3>
        <ul className="space-y-2">
          {contacts.map((contact) => (
            <li key={contact.name} className="flex items-center p-2 rounded-md hover:bg-gray-200 cursor-pointer text-gray-700 -ml-2 -mr-2">
              {/* Avatar with Online Status */}
              <div className="relative mr-3 w-8 h-8">
                 <Image
                  src={contact.avatar}
                  alt={`${contact.name}'s avatar`}
                  width={32}
                  height={32}
                  className="w-full h-full rounded-full object-cover"
                />
                {contact.isOnline && (
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-500"></span>
                )}
              </div>
              <span className="font-medium text-gray-800 text-sm">{contact.name}</span>
            </li>
          ))}
        </ul>
      </div>
     
    </div>
  );
};

export default RightSidebar; 