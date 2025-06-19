'use client';
import Image from 'next/image';
import { useAuth } from '../auth/AuthContext';
import EditDetailsModal, { DetailsData } from '../modals/EditDetailsModal';
import { useState } from 'react';
import { createPortal } from 'react-dom';

interface ProfileHeaderProps {
  coverPhotoUrl: string;
  profilePictureUrl: string;
  userName: string;
}

const defaultDetails: DetailsData = {
  workAt: '',
  studiedAt: '',
  livesIn: '',
  from: '',
  bio: '',
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  coverPhotoUrl,
  profilePictureUrl,
  userName,
}) => {
  const { user } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [details, setDetails] = useState<DetailsData>(defaultDetails);

  return (
    <div className="bg-white shadow-sm rounded-b-lg overflow-hidden mb-4 border-b border-gray-200 max-w-[1200px] mx-auto">
      {/* Cover Photo */}
      <div className="w-full h-40 md:h-60 lg:h-80 bg-gray-200 relative">
        <Image
          src={'https://images.pexels.com/photos/32601540/pexels-photo-32601540.jpeg'}
          alt="Cover Photo"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Profile Info and Buttons */}
      <div className="relative px-4 md:px-6 -mt-12 md:-mt-16 flex flex-col md:flex-row items-center md:items-end pb-4 border-b border-gray-200">
        {/* Profile Picture */}
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-md z-10 bg-gray-300 flex-shrink-0 relative">
          <Image
            src={profilePictureUrl}
            alt="Profile Picture"
            layout="fill"
            objectFit="cover"
            className='rounded-full max-w-[130px] max-h-[130px] absolute top-0 left-0'
          />
        </div>

        <div className="flex-1 mt-4 md:ml-4 md:mt-0 text-center md:text-left">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">{user?.fullname}</h1>
          <p className="text-gray-600 text-sm mt-1">54 friends</p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 mt-4 md:mt-0 flex-wrap justify-center md:justify-start">
          <button className="flex items-center px-3 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 transition duration-300 text-sm cursor-pointer">
            <span><span className="font-bold text-white text-[15]">+</span> Add to Story</span>
          </button>

          <button
            className="z-50 flex items-center px-3 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md shadow-sm hover:bg-gray-300 transition duration-300 text-sm cursor-pointer"
            onClick={() => {
              setShowEditModal(true)
              console.log('showEditModal', showEditModal)
            }}
          >
            <Image src="/images/icon-edit.png" width={16} height={16} alt="Edit Profile"  className='gap-[10] flex mr-2'/>
            <span>Edit Profile</span>
          </button>


        </div>
      </div>

      {/* Navigation Menu */}
      <div className="mt-2">
        <nav className="-mb-px flex space-x-6 px-4 md:px-6 text-sm overflow-x-auto hide-scrollbar">
          {[
            { name: 'Posts', href: '/profile' },
            { name: 'About', href: '/profile/about' },
            { name: 'Friends', href: '/friends' },
            { name: 'Videos', href: '/watch' }
          ].map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              className={`whitespace-nowrap py-3 px-1 border-b-2 ${index === 0 ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} font-semibold`}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Modal sẽ được render qua portal ra ngoài root layout để tránh bị che */}
      {typeof window !== 'undefined' && createPortal(
        <EditDetailsModal
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={(data) => { setDetails(data); setShowEditModal(false); }}
          initialData={details}
        />,
        document.body
      )}
    </div>
  );
};

export default ProfileHeader; 