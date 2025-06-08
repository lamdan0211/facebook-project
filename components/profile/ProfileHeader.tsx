import Image from 'next/image';

interface ProfileHeaderProps {
  coverPhotoUrl: string;
  profilePictureUrl: string;
  userName: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  coverPhotoUrl,
  profilePictureUrl,
  userName,
}) => {
  return (
    <div className="bg-white shadow-sm rounded-b-lg overflow-hidden mb-4 border-b border-gray-200 max-w-[1200px] mx-auto">
      {/* Cover Photo */}
      <div className="w-full h-40 md:h-60 lg:h-80 bg-gray-200 relative">
        <Image
          src={coverPhotoUrl}
          alt="Cover Photo"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Profile Info and Buttons */}
      <div className="relative px-4 md:px-6 -mt-12 md:-mt-16 flex flex-col md:flex-row items-center md:items-end pb-4 border-b border-gray-200">
        {/* Profile Picture */}
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-md z-10 bg-gray-300 flex-shrink-0">
          <Image
            src={profilePictureUrl}
            alt="Profile Picture"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="flex-1 mt-4 md:ml-4 md:mt-0 text-center md:text-left">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">{userName}</h1>
          <p className="text-gray-600 text-sm mt-1">X friends</p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 mt-4 md:mt-0 flex-wrap justify-center md:justify-start">
          <button className="flex items-center px-3 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 transition duration-300 text-sm">
            
            <span><span className="font-bold text-white text-[15]">+</span> Add to Story</span>
          </button>
          <button className="flex items-center px-3 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md shadow-sm hover:bg-gray-300 transition duration-300 text-sm">
            <Image src="/images/icon-edit.png" width={16} height={16} alt="Edit Profile"  className='gap-[10] flex mr-2'/>
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="mt-2">
        <nav className="-mb-px flex space-x-6 px-4 md:px-6 text-sm overflow-x-auto hide-scrollbar">
          {[ 'Posts', 'About', 'Friends', 'Photos', 'Videos', 'Check-ins', 'More' ].map((item, index) => (
            <a
              key={item}
              href="#"
              className={`whitespace-nowrap py-3 px-1 border-b-2 ${index === 0 ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} font-semibold`}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default ProfileHeader; 