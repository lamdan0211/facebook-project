"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import EditDetailsModal, { DetailsData } from '../modals/EditDetailsModal';

const defaultDetails: DetailsData = {
  workAt: 'Your Company',
  studiedAt: 'Your University',
  livesIn: 'Your City',
  from: 'Your Hometown',
  bio: '',
};

const ProfileSidebar = ({ profile }: { profile?: any }) => {
  const [details, setDetails] = useState<DetailsData>(defaultDetails);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (profile) {
      setDetails({
        workAt: profile.workingPlace || '',
        studiedAt: profile.studiedAt || '',
        livesIn: profile.birthplace || '',
        from: profile.birthplace || '',
        bio: profile.bio || '',
      });
    }
  }, [profile]);

  // Using online placeholder image URLs for photos and friends
  const photos = [
    'https://images.pexels.com/photos/31173336/pexels-photo-31173336.jpeg',
    'https://images.pexels.com/photos/15367435/pexels-photo-15367435.jpeg',
    'https://images.pexels.com/photos/23719794/pexels-photo-23719794.jpeg',
    'https://images.pexels.com/photos/6498732/pexels-photo-6498732.jpeg',
    'https://images.pexels.com/photos/10983885/pexels-photo-10983885.jpeg',
    'https://images.pexels.com/photos/18051140/pexels-photo-18051140.jpeg',
    'https://images.pexels.com/photos/6498283/pexels-photo-6498283.jpeg',
    'https://images.pexels.com/photos/18253365/pexels-photo-18253365.jpeg',
    'https://images.pexels.com/photos/7849511/pexels-photo-7849511.jpeg',
  ];

  const friends = [
    'https://images.pexels.com/photos/32371659/pexels-photo-32371659.jpeg',
    'https://images.pexels.com/photos/30173732/pexels-photo-30173732.jpeg',
    'https://images.pexels.com/photos/21085358/pexels-photo-21085358.jpeg',
    'https://images.pexels.com/photos/7915359/pexels-photo-7915359.jpeg',
    'https://images.pexels.com/photos/3761264/pexels-photo-3761264.jpeg',
    'https://images.pexels.com/photos/7849511/pexels-photo-7849511.jpeg',
  ];

  const [isEditDetailOpen, setIsEditDetailOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [photoModalIndex, setPhotoModalIndex] = useState<number | null>(null);

  return (
    <div className="w-full md:w-1/3 p-2 md:p-0 md:pr-4 space-y-4">
      {/* Intro section */}
      <div className="bg-white p-4 rounded-lg shadow-sm text-gray-700 text-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Intro</h2>
        <div className="space-y-2">
          <p className="flex items-center"><span className="font-semibold mr-1">Works at:</span> {details.workAt}</p>
          {/* <p className="flex items-center"><span className="font-semibold mr-1">Studied at:</span> {details.studiedAt}</p> */}
          <p className="flex items-center"><span className="font-semibold mr-1">Lives in:</span> {details.livesIn}</p>
          <p className="flex items-center"><span className="font-semibold mr-1">From:</span> {details.from}</p>
          {details.bio && <p className="flex items-center"><span className="font-semibold mr-1">Bio:</span> {details.bio}</p>}
        </div>
        <button className="w-full py-2 mt-4 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition duration-300 text-sm" onClick={() => setShowModal(true)}>Edit Details</button>
        <EditDetailsModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onSave={(data) => { setDetails(data); setShowModal(false); }}
          initialData={details}
        />

      </div>
      {/* Photos section */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Photos</h2>
        </div>
        {/* Responsive photo grid giống dashboard */}
        {(() => {
          const count = photos.length;
          if (count === 0) return <div className="text-gray-400 text-center py-4">No photos yet.</div>;
          if (count === 1) {
            return (
              <div className="relative w-full aspect-square bg-gray-300 rounded overflow-hidden cursor-pointer" onClick={() => { setPhotoModalIndex(0); setIsPhotoModalOpen(true); }}>
                <Image src={photos[0]} alt="Photo 1" fill style={{objectFit:'cover'}} />
              </div>
            );
          }
          if (count === 2) {
            return (
              <div className="grid grid-cols-2 gap-1 rounded-lg overflow-hidden">
                {photos.slice(0,2).map((url, i) => (
                  <div key={i} className="relative w-full aspect-square bg-gray-300 cursor-pointer" onClick={() => { setPhotoModalIndex(i); setIsPhotoModalOpen(true); }}>
                    <Image src={url} alt={`Photo ${i+1}`} fill style={{objectFit:'cover'}} />
                  </div>
                ))}
              </div>
            );
          }
          if (count === 3) {
            return (
              <div className="grid grid-cols-2 grid-rows-2 gap-1 rounded-lg overflow-hidden" style={{height: 200}}>
                <div className="relative row-span-2 col-span-1 w-full h-full cursor-pointer" onClick={() => { setPhotoModalIndex(0); setIsPhotoModalOpen(true); }}>
                  <Image src={photos[0]} alt="Photo 1" fill style={{objectFit:'cover'}} />
                </div>
                {[1,2].map(i => (
                  <div key={i} className="relative w-full h-full cursor-pointer" onClick={() => { setPhotoModalIndex(i); setIsPhotoModalOpen(true); }}>
                    <Image src={photos[i]} alt={`Photo ${i+1}`} fill style={{objectFit:'cover'}} />
                  </div>
                ))}
              </div>
            );
          }
          // 4+ ảnh: 2x2 grid, ảnh cuối overlay số lượng còn lại
          return (
            <div className="grid grid-cols-2 grid-rows-2 gap-1 rounded-lg overflow-hidden" style={{height: 200}}>
              {photos.slice(0,4).map((url, i) => (
                <div key={i} className="relative w-full h-full cursor-pointer" onClick={() => { setPhotoModalIndex(i); setIsPhotoModalOpen(true); }}>
                  <Image src={url} alt={`Photo ${i+1}`} fill style={{objectFit:'cover'}} />
                  {i === 3 && count > 4 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-2xl font-bold z-10">
                      +{count-4}
                    </div>
                  )}
                </div>
              ))}
            </div>
          );
        })()}
        {isPhotoModalOpen && photoModalIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setIsPhotoModalOpen(false)}>
            <div className="relative max-w-2xl w-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
              <div className="relative">
                {/* Button X luôn nằm trên ảnh */}
                <button
                  className="absolute top-2 right-2 p-1 bg-blue-500 rounded-full z-20"
                  onClick={() => setIsPhotoModalOpen(false)}
                  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {/* Nút prev */}
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 rounded-full p-2 z-10"
                  onClick={() => setPhotoModalIndex(i => (i !== null && i > 0 ? i - 1 : i))}
                  disabled={photoModalIndex === 0}
                  aria-label="Previous photo"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                {/* Nút next */}
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 rounded-full p-2 z-10"
                  onClick={() => setPhotoModalIndex(i => (i !== null && i < photos.length - 1 ? i + 1 : i))}
                  disabled={photoModalIndex === photos.length - 1}
                  aria-label="Next photo"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
                <Image src={photos[photoModalIndex]} alt={`Photo ${photoModalIndex + 1}`} width={600} height={600} className="object-contain rounded-lg max-h-[80vh] max-w-full" />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Friends section */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className='flex flex-row gap-2 items-center justify-between'>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Friends</h2>
          </div>
          <p className="text-gray-700 text-base mb-3">54 friends</p>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {friends.map((avatarUrl, index) => (
            <div key={index} className="w-full h-full aspect-square bg-gray-300">
               <Image src={avatarUrl} alt={`Friend ${index + 1}`} width={100} height={100} style={{objectFit:'cover', width:'100%', height:'100%'}} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar; 