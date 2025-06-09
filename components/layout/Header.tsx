"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ProfileDropdown from './ProfileDropdown';
import NotificationDropdown from './NotificationDropdown';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Header = () => {
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [isNotifOpen, setIsNotifOpen] = useState(false);
   const dropdownRef = useRef<HTMLDivElement>(null);
   const notifRef = useRef<HTMLDivElement>(null);
   const router = useRouter();

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
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md p-2 flex items-center justify-between z-99 h-14 relative">
         {/* Left section: Search Bar and Facebook Logo */}
         <div className="flex items-center flex-grow-0 mr-4">
            {/* Facebook Logo (Circular Blue) */}
            <Link href="/dashboard" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl min-w-[40px] mr-2">
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

         {/* Center section: Navigation Icons */}
         {/* <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center justify-between w-[400px]">
               <div className="flex items-center justify-center px-2 md:px-4 py-2 md:py-1 rounded-lg cursor-pointer border-b-2 border-blue-600 text-blue-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
               </div>
               <div className="flex items-center justify-center px-2 md:px-9 py-2 md:py-1 rounded-lg hover:bg-gray-200 cursor-pointer text-gray-500 hover:text-gray-700">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M6.75 23.25C6.336 23.25 6 22.914 6 22.5C6 22.086 6.336 21.75 6.75 21.75H17.25C17.664 21.75 18 22.086 18 22.5C18 22.914 17.664 23.25 17.25 23.25H6.75ZM15.163 10.846L10.055 13.923C9.591 14.202 9 13.869 9 13.327V7.172C9 6.631 9.591 6.297 10.055 6.576L15.163 9.654C15.612 9.924 15.612 10.575 15.163 10.846ZM19.75 18.25C20.992 18.25 22 17.242 22 16V4.5C22 3.258 20.992 2.25 19.75 2.25H4.25C3.008 2.25 2 3.258 2 4.5V16C2 17.242 3.008 18.25 4.25 18.25H19.75ZM19.75 19.75H4.25C2.179 19.75 0.5 18.071 0.5 16V4.5C0.5 2.429 2.179 0.75 4.25 0.75H19.75C21.821 0.75 23.5 2.429 23.5 4.5V16C23.5 18.071 21.821 19.75 19.75 19.75Z" fill="currentColor" />
                  </svg>
               </div>
               <div className="flex items-center justify-center px-2 md:px-4 py-2 md:py-1 rounded-lg hover:bg-gray-200 cursor-pointer text-gray-500 hover:text-gray-700">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M15.5 21.75H19.75C20.164 21.75 20.5 21.414 20.5 21V12H20.531C20.364 11.917 20.206 11.815 20.061 11.694L19.66 11.359C19.567 11.283 19.433 11.283 19.34 11.36L19.176 11.497C18.591 11.983 17.855 12.25 17.095 12.25H16.869C16.114 12.25 15.382 11.987 14.8 11.506L14.616 11.354C14.523 11.278 14.39 11.278 14.298 11.354L14.113 11.507C13.53 11.987 12.798 12.25 12.044 12.25H11.907C11.162 12.25 10.439 11.994 9.861 11.525L9.645 11.35C9.552 11.275 9.419 11.276 9.328 11.352L9.155 11.497C8.57 11.984 7.834 11.984 7.074 12.25H6.896C6.143 12.25 5.414 11.989 4.832 11.511L4.638 11.351C4.545 11.275 4.413 11.275 4.32 11.351L3.849 11.739C3.726 11.84 3.592 11.928 3.452 12H3.5V21C3.5 21.414 3.836 21.75 4.25 21.75H8.5V15.5C8.5 14.81 9.06 14.25 9.75 14.25H14.25C14.94 14.25 15.5 14.81 15.5 15.5V21.75ZM1.673 6.75H22.327C22.3 6.66 22.271 6.571 22.238 6.483L21.087 3.355C20.823 2.688 20.178 2.25 19.461 2.25H4.54C3.822 2.25 3.177 2.688 2.919 3.338L1.762 6.483C1.729 6.571 1.7 6.66 1.673 6.75ZM22.5 8.25H1.5V10C1.5 10.414 1.836 10.75 2.25 10.75H2.421C2.595 10.75 2.763 10.69 2.897 10.58L3.368 10.193C4.013 9.662 4.945 9.662 5.59 10.193L5.784 10.352C6.097 10.609 6.49 10.75 6.896 10.75H7.074C7.483 10.75 7.88 10.607 8.194 10.345L8.368 10.2C9.01 9.665 9.941 9.659 10.589 10.185L10.805 10.359C11.117 10.612 11.506 10.75 11.907 10.75H12.044C12.45 10.75 12.844 10.608 13.158 10.35L13.343 10.197C13.989 9.663 14.924 9.663 15.571 10.197L15.755 10.35C16.068 10.608 16.462 10.75 16.869 10.75H17.095C17.504 10.75 17.901 10.606 18.216 10.344L18.38 10.208C19.028 9.666 19.972 9.666 20.62 10.207L21.022 10.542C21.183 10.676 21.387 10.75 21.598 10.75C22.097 10.75 22.5 10.347 22.5 9.85V8.25ZM22 12.217V21C22 22.243 20.993 23.25 19.75 23.25H4.25C3.007 23.25 2 22.243 2 21V12.236C0.875 12.112 0 11.158 0 10V7.951C0 7.272 0.12 6.6 0.354 5.964L1.518 2.802C2.01 1.563 3.207 0.75 4.54 0.75H19.461C20.793 0.75 21.99 1.563 22.488 2.819L23.646 5.964C23.88 6.6 24 7.272 24 7.951V9.85C24 11.039 23.135 12.026 22 12.217ZM14 21.75V15.75H10V21.75H14Z" fill="currentColor" />
                  </svg>
               </div>
               <div className="flex items-center justify-center px-2 md:px-4 py-2 md:py-1 rounded-lg hover:bg-gray-200 cursor-pointer text-gray-500 hover:text-gray-700">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M24.5 13C24.5 6.649 19.351 1.5 13 1.5C6.649 1.5 1.5 6.649 1.5 13C1.5 19.351 6.649 24.5 13 24.5C19.351 24.5 24.5 19.351 24.5 13ZM26 13C26 20.18 20.18 26 13 26C5.82 26 0 20.18 0 13C0 5.82 5.82 0 13 0C20.18 0 26 5.82 26 13ZM6.479 13H6.631C6.933 13 7.102 13.338 6.934 13.591C6.334 14.491 5.983 15.568 5.983 16.724V17.221C5.983 17.342 5.99 17.461 6.004 17.578C6.03 17.802 5.862 18 5.637 18H5.123C4.228 18 3.5 17.25 3.5 16.327C3.5 14.492 4.727 13 6.479 13ZM19.521 13C21.274 13 22.5 14.492 22.5 16.327C22.5 17.25 21.772 18 20.878 18H20.364C20.139 18 19.970 17.802 19.997 17.578C20.010 17.461 20.017 17.342 20.017 17.221V16.724C20.017 15.568 19.667 14.491 19.067 13.591C18.899 13.338 19.067 13 19.369 13H19.521ZM7.25 12C6.147 12 5.25 10.991 5.25 9.75C5.25 8.384 6.035 7.5 7.25 7.5C8.465 7.5 9.25 8.384 9.25 9.75C9.25 10.991 8.353 12 7.25 12ZM18.75 12C17.647 12 16.75 10.991 16.75 9.75C16.75 8.384 17.535 7.5 18.75 7.5C19.965 7.5 20.75 8.384 20.75 9.75C20.75 10.991 19.853 12 18.75 12ZM14.172 12.5C16.558 12.5 18.5 14.395 18.5 16.724V17.221C18.5 18.202 17.683 19 16.677 19H9.323C8.317 19 7.5 18.202 7.5 17.221V16.724C7.5 14.395 9.441 12.5 11.828 12.5H14.172ZM15.75 8C15.75 9.655 14.517 11 13 11C11.484 11 10.25 9.655 10.25 8C10.25 6.15 11.304 5 13 5C14.697 5 15.75 6.15 15.75 8Z" fill="currentColor" />
                  </svg>
               </div>
            </div>
         </div> */}
         

         {/* Right section: User Icons and Menu */}
         <div className="flex items-center space-x-2 md:space-x-1 flex-grow-0 ml-4">
            {/* Menu Icon */}
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full hover:bg-gray-200 cursor-pointer flex items-center justify-center">
               <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.18186 5.90914C4.68809 5.90914 5.90914 4.68809 5.90914 3.18186C5.90914 1.67563 4.68809 0.45459 3.18186 0.45459C1.67563 0.45459 0.45459 1.67563 0.45459 3.18186C0.45459 4.68809 1.67563 5.90914 3.18186 5.90914Z" fill="currentColor" />
                  <path d="M10.0002 5.90914C11.5065 5.90914 12.7275 4.68809 12.7275 3.18186C12.7275 1.67563 11.5065 0.45459 10.0002 0.45459C8.49399 0.45459 7.27295 1.67563 7.27295 3.18186C7.27295 4.68809 8.49399 5.90914 10.0002 5.90914Z" fill="currentColor" />
                  <path d="M16.8181 5.90914C18.3243 5.90914 19.5454 4.68809 19.5454 3.18186C19.5454 1.67563 18.3243 0.45459 16.8181 0.45459C15.3119 0.45459 14.0908 1.67563 14.0908 3.18186C14.0908 4.68809 15.3119 5.90914 16.8181 5.90914Z" fill="currentColor" />
                  <path d="M3.18186 12.7275C4.68809 12.7275 5.90914 11.5065 5.90914 10.0002C5.90914 8.49399 4.68809 7.27295 3.18186 7.27295C1.67563 7.27295 0.45459 8.49399 0.45459 10.0002C0.45459 11.5065 1.67563 12.7275 3.18186 12.7275Z" fill="currentColor" />
                  <path d="M10.0002 12.7275C11.5065 12.7275 12.7275 11.5065 12.7275 10.0002C12.7275 8.49399 11.5065 7.27295 10.0002 7.27295C8.49399 7.27295 7.27295 8.49399 7.27295 10.0002C7.27295 11.5065 8.49399 12.7275 10.0002 12.7275Z" fill="currentColor" />
                  <path d="M16.8181 12.7275C18.3243 12.7275 19.5454 11.5065 19.5454 10.0002C19.5454 8.49399 18.3243 7.27295 16.8181 7.27295C15.3119 7.27295 14.0908 8.49399 14.0908 10.0002C14.0908 11.5065 15.3119 12.7275 16.8181 12.7275Z" fill="currentColor" />
                  <path d="M3.18186 19.5454C4.68809 19.5454 5.90914 18.3243 5.90914 16.8181C5.90914 15.3119 4.68809 14.0908 3.18186 14.0908C1.67563 14.0908 0.45459 15.3119 0.45459 16.8181C0.45459 18.3243 1.67563 19.5454 3.18186 19.5454Z" fill="currentColor" />
                  <path d="M10.0002 19.5454C11.5065 19.5454 12.7275 18.3243 12.7275 16.8181C12.7275 15.3119 11.5065 14.0908 10.0002 14.0908C8.49399 14.0908 7.27295 15.3119 7.27295 16.8181C7.27295 18.3243 8.49399 19.5454 10.0002 19.5454Z" fill="currentColor" />
                  <path d="M16.8181 19.5454C18.3243 19.5454 19.5454 18.3243 19.5454 16.8181C19.5454 15.3119 18.3243 14.0908 16.8181 14.0908C15.3119 14.0908 14.0908 15.3119 14.0908 16.8181C14.0908 18.3243 15.3119 19.5454 16.8181 19.5454Z" fill="currentColor" />
               </svg>

            </div>
            {/* Messenger Icon */}
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full hover:bg-gray-200 cursor-pointer flex items-center justify-center">
               <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.6132 7.65479L12.4599 12.5298C12.4217 12.5886 12.3723 12.6393 12.3146 12.679C12.2568 12.7187 12.1918 12.7466 12.1232 12.7612C12.0546 12.7757 11.9838 12.7767 11.9149 12.7638C11.846 12.751 11.7803 12.7248 11.7215 12.6865L8.79987 10.7965C8.7446 10.7607 8.67997 10.7421 8.61412 10.743C8.54827 10.7439 8.48415 10.7642 8.42987 10.8015L5.13654 13.0732C4.65654 13.4048 4.06988 12.8348 4.38655 12.3448L7.53988 7.46985C7.5779 7.41091 7.62717 7.35998 7.68488 7.32011C7.7426 7.28024 7.80761 7.25222 7.87619 7.23751C7.94477 7.2228 8.01559 7.22176 8.08458 7.23446C8.15356 7.24715 8.21936 7.2733 8.27821 7.31146L11.1999 9.20152C11.2551 9.23733 11.3198 9.25592 11.3856 9.25503C11.4515 9.25414 11.5156 9.23372 11.5699 9.19643L14.8632 6.9248C15.3432 6.5948 15.9299 7.16479 15.6132 7.65479ZM9.99987 0.569824C4.46154 0.569824 0.283203 4.62319 0.283203 9.99986C0.283203 12.7365 1.36987 15.2131 3.33987 16.9765C3.39534 17.0257 3.44031 17.0857 3.4721 17.1527C3.50389 17.2197 3.52183 17.2924 3.52487 17.3665L3.57487 19.0498C3.5786 19.2098 3.62179 19.3664 3.7006 19.5057C3.77941 19.645 3.89139 19.7626 4.02662 19.8482C4.16184 19.9338 4.31611 19.9847 4.47572 19.9963C4.63533 20.0079 4.79534 19.9799 4.94153 19.9148L6.82487 19.0815C6.94027 19.03 7.07022 19.0211 7.19154 19.0565C8.09321 19.3031 9.03821 19.4282 9.99987 19.4282C15.5382 19.4282 19.7165 15.3749 19.7165 9.99986C19.7165 4.62319 15.5382 0.569824 9.99987 0.569824Z" fill="currentColor" />
               </svg>

            </div>
            {/* Notifications Icon */}
            <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-full hover:bg-gray-200 cursor-pointer flex items-center justify-center" ref={notifRef}>
               <div onClick={toggleNotif}>
                 <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.60496 15.7774C4.57639 15.7774 6.17353 15.6881 8.33353 15.2902C7.95996 16.3059 6.98639 17.0338 5.84282 17.0338C4.89211 17.0338 4.05925 16.5302 3.58925 15.7774H3.60496ZM15.8021 10.2359C15.9785 11.1445 15.3414 11.9481 13.9071 12.6259C13.1214 12.9966 11.3742 13.7024 8.48853 14.2638C6.26282 14.6959 4.63211 14.7952 3.60568 14.7952C3.30068 14.7952 3.04853 14.7866 2.84996 14.7752C1.26711 14.6845 0.374249 14.1774 0.19782 13.2688C-0.0700372 11.8924 0.353534 11.3609 1.05568 10.4809L1.24068 10.2488C1.71425 9.64808 1.89925 9.05808 1.59639 7.50165C0.918534 4.01593 2.48853 1.63379 5.90282 0.966647C9.31854 0.307361 11.6671 1.92593 12.345 5.41236C12.6471 6.96879 13.04 7.44593 13.7042 7.82522V7.82593L13.9628 7.97236C14.9428 8.52522 15.5342 8.85879 15.8021 10.2359Z" fill="currentColor" />
                 </svg>
               </div>
               {isNotifOpen && <NotificationDropdown />}
            </div>
            {/* User Avatar with Dropdown */}
            <div className="relative" ref={dropdownRef}>
               <div
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full hover:bg-gray-200 cursor-pointer flex items-center justify-center overflow-hidden"
                  onClick={toggleDropdown}
               >
                  <Image
                     src="https://images.pexels.com/photos/3768166/pexels-photo-3768166.jpeg"
                     alt="User avatar"
                     width={36}
                     height={36}
                     className="w-full h-full object-cover "
                  />
               </div>

               {/* Dropdown Menu */}
               {isDropdownOpen && (
                  <ProfileDropdown />
               )}
            </div>
         </div>
      </header>
   );
};

export default Header; 