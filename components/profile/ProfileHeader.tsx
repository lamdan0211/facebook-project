'use client';
import Image from 'next/image';
import { useAuth } from '../auth/AuthContext';
import EditDetailsModal, { DetailsData } from '../modals/EditDetailsModal';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import EditAvatarModal from '../modals/EditAvatarModal';
import { FolderDot } from 'lucide-react';
import EditCoverPhotoModal from '../modals/EditCoverPhotoModal';

interface ProfileHeaderProps {
  coverPhotoUrl: string;
  profilePictureUrl: string;
  userName: string;
  profileId: number;
  currentUserId: number;
  onProfileUpdated?: () => void;
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
  profileId,
  currentUserId,
  onProfileUpdated,
}) => {
  const { user } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [details, setDetails] = useState<DetailsData>(defaultDetails);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showCoverModal, setShowCoverModal] = useState(false);

  const isOwner = profileId === currentUserId;

  // Lấy cover photo tạm nếu có
  let coverPhoto = coverPhotoUrl;
  if (typeof window !== 'undefined') {
    const temp = localStorage.getItem('temp_cover_photo');
    if (temp) coverPhoto = temp;
  }

  return (
    <div className="bg-white shadow-sm rounded-b-lg overflow-hidden mb-4 border-b border-gray-200 max-w-[1200px] mx-auto">
      {/* Cover Photo */}
      <div className="w-full h-40 md:h-60 lg:h-80 bg-gray-200 relative group">
        <Image
          src={coverPhoto}
          alt="Cover Photo"
          layout="fill"
          objectFit="cover"
        />
        {isOwner && (
          <button
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition"
            onClick={() => setShowCoverModal(true)}
            title="Cập nhật cover photo"
          >
            <FolderDot className="w-10 h-10 text-white" />
          </button>
        )}
      </div>

      {/* Profile Info and Buttons */}
      <div className="flex flex-col md:flex-row items-center gap-4 px-6 py-4">
        {/* Profile Picture */}
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-md z-10 bg-gray-300 flex-shrink-0 relative group">
          <Image
            src={profilePictureUrl}
            alt="Profile Picture"
            layout="fill"
            objectFit="cover"
            className='rounded-full max-w-[130px] max-h-[130px] absolute top-0 left-0'
          />
          {isOwner && (
            <button
              className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition rounded-full"
              onClick={() => setShowAvatarModal(true)}
              title="Cập nhật avatar"
            >
              <FolderDot className="w-6 h-6 text-white" />
            </button>
          )}
        </div>

        <div className="flex-1 mt-4 md:ml-4 md:mt-0 text-center md:text-left">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">{userName}</h1>
          <p className="text-gray-600 text-sm mt-1">54 friends</p>
        </div>

        {/* Action Buttons */}
        {isOwner && (
          <>
            <button className="flex items-center px-3 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 transition duration-300 text-sm cursor-pointer">
              <span><span className="font-bold text-white text-[15]">+</span> Add to Story</span>
            </button>
          </>
        )}
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

      {showAvatarModal && (
        <EditAvatarModal 
          onClose={() => setShowAvatarModal(false)}
          userId={currentUserId}
          accessToken={typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') || '' : ''}
          onUploaded={typeof onProfileUpdated === 'function' ? onProfileUpdated : undefined}
        />
      )}

      {showCoverModal && (
        <EditCoverPhotoModal 
          onClose={() => setShowCoverModal(false)}
          userId={currentUserId}
          accessToken={typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') || '' : ''}
          onUploaded={typeof onProfileUpdated === 'function' ? onProfileUpdated : undefined}
        />
      )}
    </div>
  );
};

export default ProfileHeader; 