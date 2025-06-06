import Image from 'next/image';

const ProfileSidebar = () => {
  // Placeholder data for Intro, Photos, Friends
  const introDetails = [
    { label: 'Works at', value: 'Your Company' },
    { label: 'Studied at', value: 'Your University' },
    { label: 'Lives in', value: 'Your City' },
    { label: 'From', value: 'Your Hometown' },
  ];

  // Using online placeholder image URLs for photos and friends
  const photos = [
    'https://source.unsplash.com/random/100x100?landscape,sig=1',
    'https://source.unsplash.com/random/100x100?landscape,sig=2',
    'https://source.unsplash.com/random/100x100?landscape,sig=3',
    'https://source.unsplash.com/random/100x100?landscape,sig=4',
    'https://source.unsplash.com/random/100x100?landscape,sig=5',
    'https://source.unsplash.com/random/100x100?landscape,sig=6',
    'https://source.unsplash.com/random/100x100?landscape,sig=7',
    'https://source.unsplash.com/random/100x100?landscape,sig=8',
    'https://source.unsplash.com/random/100x100?landscape,sig=9',
  ]; // 9 placeholder photos

  const friends = [
    'https://source.unsplash.com/random/100x100?face,sig=10',
    'https://source.unsplash.com/random/100x100?face,sig=11',
    'https://source.unsplash.com/random/100x100?face,sig=12',
    'https://source.unsplash.com/random/100x100?face,sig=13',
    'https://source.unsplash.com/random/100x100?face,sig=14',
    'https://source.unsplash.com/random/100x100?face,sig=15',
  ]; // 6 placeholder friend avatars

  return (
    <div className="w-full md:w-1/3 p-2 md:p-0 md:pr-4 space-y-4">
      {/* Intro section */}
      <div className="bg-white p-4 rounded-lg shadow-sm text-gray-700 text-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Intro</h2>
        <div className="space-y-2">
          {/* Add placeholder icons for intro details if needed based on design */}
          {introDetails.map((detail, index) => (
            <p key={index} className="flex items-center">
              {/* <div className="w-4 h-4 mr-2 bg-gray-400"></div> Placeholder Icon */}
              <span className="font-semibold mr-1">{detail.label}:</span> {detail.value}
            </p>
          ))}
          {/* Add Followed by count with icon */}
          <p className="flex items-center">
             {/* <div className="w-4 h-4 mr-2 bg-gray-400"></div> Placeholder Icon */}
            <span className="font-semibold mr-1">Followed by:</span> X people
            </p>
        </div>
        <button className="w-full py-2 mt-4 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition duration-300 text-sm">Edit Details</button>
      </div>

      {/* Photos section */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Photos</h2>
          <a href="#" className="text-blue-600 hover:underline text-sm font-semibold">See All Photos</a>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {photos.map((photoUrl, index) => (
            <div key={index} className="w-full aspect-square bg-gray-300 rounded overflow-hidden">
              <Image src={photoUrl} alt={`Photo ${index + 1}`} width={100} height={100} objectFit="cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Friends section */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Friends</h2>
          <a href="#" className="text-blue-600 hover:underline text-sm font-semibold">See All Friends</a>
        </div>
        <p className="text-gray-700 text-base mb-3">X friends</p>
        <div className="grid grid-cols-3 gap-1">
          {friends.map((avatarUrl, index) => (
            <div key={index} className="w-full aspect-square bg-gray-300 rounded-lg overflow-hidden">
               <Image src={avatarUrl} alt={`Friend ${index + 1}`} width={100} height={100} objectFit="cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Add more sections as needed */}
    </div>
  );
};

export default ProfileSidebar; 