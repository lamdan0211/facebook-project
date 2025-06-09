"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ProfileDropdown from './ProfileDropdown';
import NotificationDropdown from './NotificationDropdown';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import UserDropdown from './UserDropdown';
import { useAuth } from '@/components/auth/AuthContext';

const Header = () => {
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [isNotifOpen, setIsNotifOpen] = useState(false);
   const dropdownRef = useRef<HTMLDivElement>(null);
   const notifRef = useRef<HTMLDivElement>(null);
   const router = useRouter();
   const { user } = useAuth();

   const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
   };
   const toggleNotif = () => {
      setIsNotifOpen(!isNotifOpen);
   };

   // Close dropdowns when clicking outside
   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
         }
         if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
            setIsNotifOpen(false);
         }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [dropdownRef, notifRef]);

   return (
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md p-2 flex items-center justify-between z-40 h-14 relative">
         {/* Left section: Search Bar and Facebook Logo */}
         <div className="flex items-center flex-grow-0 mr-4">
            {/* Facebook Logo (Circular Blue) */}
            <Link href="/" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl min-w-[40px] mr-2">
               f
            </Link>
            {/* Search Bar */}
            <div className="relative flex items-center">
               {/* Search Icon inside input */}
               <svg className="absolute left-3 text-gray-500 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
               <input
                  type="text"
                  placeholder="Search Facebook"
                  className="bg-gray-100 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm hidden md:inline-block"
                  style={{ minWidth: '180px' }}
               />
            </div>
         </div>

         {/* Right section: User Icons and Menu */}
         <div className="flex items-center space-x-2 md:space-x-1 flex-grow-0 ml-4">
            {/* Menu Icon */}
            {/* Notifications Icon */}
            <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-full hover:bg-gray-200 cursor-pointer flex items-center justify-center" ref={notifRef}>
               <div onClick={toggleNotif}>
                 <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.60496 15.7774C4.57639 15.7774 6.17353 15.6881 8.33353 15.2902C7.95996 16.3059 6.98639 17.0338 5.84282 17.0338C4.89211 17.0338 4.05925 16.5302 3.58925 15.7774H3.60496ZM15.8021 10.2359C15.9785 11.1445 15.3414 11.9481 13.9071 12.6259C13.1214 12.9966 11.3742 13.7024 8.48853 14.2638C6.26282 14.6959 4.63211 14.7952 3.60568 14.7952C3.30068 14.7952 3.04853 14.7866 2.84996 14.7752C1.26711 14.6845 0.374249 14.1774 0.19782 13.2688C-0.0700372 11.8924 0.353534 11.3609 1.05568 10.4809L1.24068 10.2488C1.71425 9.64808 1.89925 9.05808 1.59639 7.50165C0.918534 4.01593 2.48853 1.63379 5.90282 0.966647C9.31854 0.307361 11.6671 1.92593 12.345 5.41236C12.6471 6.96879 13.04 7.44593 13.7042 7.82522V7.82593L13.9628 7.97236C14.9428 8.52522 15.5342 8.85879 15.8021 10.2359Z" fill="currentColor" />
                 </svg>
               </div>
               {isNotifOpen && <NotificationDropdown />}
            </div>
            {/* User Avatar with Dropdown hoặc Login */}
            {!user && (
              <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition-colors">
                Login
              </Link>
            )}
            {user && <UserDropdown />}
         </div>
      </header>
   );
};

export default Header; 