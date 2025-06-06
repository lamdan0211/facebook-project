import React from 'react';
import Image from 'next/image';

const LeftSidebar = () => {
  const menuItems = [
    { name: 'Friends', icon: '👥' }, 
    { name: 'Marketplace', icon: '🏪' }, 
    { name: 'Groups', icon: '🏞️' }, 
    { name: 'Watch', icon: '📺' },
    { name: 'Memories', icon: '⏰' }, 
    { name: 'Saved', icon: '🔖' }, 
    { name: 'Pages', icon: '📄' },
    { name: 'Events', icon: '📅' }, 
    { name: 'See More', icon: '⬇️' }, 
  ];

  return (
    <div className="p-4 flex flex-col">
      {/* User Section */}
      <div className="flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer mb-4 -ml-2 -mr-2 gap-[10]">
        {/* User Avatar */}
        <Image
          src="https://images.pexels.com/photos/3768166/pexels-photo-3768166.jpeg" // Keeping realistic user avatar
          alt="User avatar"
          width={36}
          height={36}
          className="w-10 h-10 rounded-full object-cover mr-3r gap-[10]"
        />
        <span className="font-semibold text-gray-800">Lam Dan</span>
      </div>

      {/* Divider */}
      <hr className="border-t border-gray-300 my-2" />

      {/* Menu Items */}
      <ul className="space-y-1 flex-grow">
        {menuItems.map((item) => (
          <li key={item.name} className="flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer text-gray-700 -ml-2 -mr-2">
            <div className="w-8 h-8 flex items-center justify-center mr-3 text-xl">
               {item.icon} 
              
            </div>
            <span className="font-medium text-gray-800 text-sm">{item.name}</span>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default LeftSidebar; 