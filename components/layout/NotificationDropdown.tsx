import React from 'react';
import Image from 'next/image';

const notifications = [
  {
    id: 1,
    user: {
      name: 'Anna Becklund',
      avatar: 'https://images.pexels.com/photos/1031081/pexels-photo-1031081.jpeg',
    },
    content: 'Anna Becklund liked your post.',
    time: '2m ago',
    image: 'https://images.pexels.com/photos/9072375/pexels-photo-9072375.jpeg',
    read: false,
  },
  {
    id: 2,
    user: {
      name: 'Eric Jones',
      avatar: 'https://images.pexels.com/photos/842871/pexels-photo-842871.jpeg',
    },
    content: 'Eric Jones commented: "Nice work!"',
    time: '10m ago',
    image: '',
    read: true,
  },
  {
    id: 3,
    user: {
      name: 'Cynthia Lopez',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg',
    },
    content: 'Cynthia Lopez sent you a friend request.',
    time: '1h ago',
    image: '',
    read: false,
  },
];

const NotificationDropdown = () => {
  return (
    <div className="absolute right-0 top-14 w-96 md:w-50 bg-white rounded-lg shadow-lg py-2 z-30 border border-gray-200">
      <div className="px-4 py-2 border-b border-gray-100 font-bold text-lg text-gray-800">Notifications</div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer ${notif.read ? '' : 'bg-blue-50'}`}
          >
            <div className="relative mr-3">
              <Image
                src={notif.user.avatar}
                alt={notif.user.name}
                width={40}
                height={40}
                className="rounded-full object-cover w-10 h-10"
              />
              {!notif.read && (
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-blue-500"></span>
              )}
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-800">
                <span className="font-semibold">{notif.user.name}</span> {notif.content}
              </div>
              <div className="text-xs text-gray-500 mt-1">{notif.time}</div>
            </div>
            {notif.image && (
              <div className="ml-3 w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={notif.image}
                  alt="Notification preview"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="px-4 py-2 text-center border-t border-gray-100">
        <button className="text-blue-600 font-semibold hover:underline text-sm">See all notifications</button>
      </div>
    </div>
  );
};

export default NotificationDropdown; 