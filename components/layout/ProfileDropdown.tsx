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
                {/* Settings Icon */}
                 <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.421 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </div>
            <span className="text-sm flex-1">Settings & privacy</span>
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </div>
         <div className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                {/* Help Icon */}
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-.504 2.57-1.382 3.616a10.05 10.05 0 01-.419.423l-2.276 2.276a1 1 0 01-1.414 0l-.123-.123a1.002 1.002 0 00-.303-.234 1 1 0 00-.188-.164C9.846 16.44 9 17.72 9 19H8c0-.722.053-1.44.156-2.141.102-.7.22-1.403.356-2.106l.017-.042c.002-.006.003-.012.006-.018.004-.007.006-.014.01-.021.004-.007.007-.015.012-.022A2.002 2.002 0 0110 15a2 2 0 11-4 0c0-.733.434-1.337 1-1.619V10c0-.282.18-.517.428-.603.355-.127.723-.196 1.1-.196H8.228z"></path></svg>
            </div>
             <span className="text-sm flex-1">Help & support</span>
             <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </div>
     
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