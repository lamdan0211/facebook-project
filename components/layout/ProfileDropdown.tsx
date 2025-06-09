import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ProfileDropdown = () => {
  return (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-20">
      {/* Profile Link */}
      <Link href="/profile" className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg mx-2">
        <Image
          src="https://images.pexels.com/photos/3768166/pexels-photo-3768166.jpeg"
          alt="User avatar"
          width={32}
          height={32}
          className="w-10 h-10 rounded-full object-cover mr-2"
        />
        <span className="font-semibold text-sm">Lam Dan</span>
      </Link>

      {/* Horizontal line */}
      <hr className="my-2 border-gray-200 mx-4" />

      {/* Navigation Links */}
      <div className="">
       
     
         <div className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                {/* Log Out Icon */}
                 <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </div>
            <span className="text-sm">Log out</span>
        </div>
      </div>

    </div>
  );
};

export default ProfileDropdown; 