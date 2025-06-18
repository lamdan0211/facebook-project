"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import EditDetailsModal, { DetailsData } from '../modals/EditDetailsModal';

const defaultDetails: DetailsData = {
  workAt: 'Your Company',
  studiedAt: 'Your University',
  livesIn: 'Your City',
  from: 'Your Hometown',
  bio: '',
};

const ProfileSidebar = () => {
  const [details, setDetails] = useState<DetailsData>(defaultDetails);
  const [showModal, setShowModal] = useState(false);

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
  ];

  const friends = [
    'https://source.unsplash.com/random/100x100?face,sig=10',
    'https://source.unsplash.com/random/100x100?face,sig=11',
    'https://source.unsplash.com/random/100x100?face,sig=12',
    'https://source.unsplash.com/random/100x100?face,sig=13',
    'https://source.unsplash.com/random/100x100?face,sig=14',
    'https://source.unsplash.com/random/100x100?face,sig=15',
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
          <p className="flex items-center"><span className="font-semibold mr-1">Studied at:</span> {details.studiedAt}</p>
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
              <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full z-10" onClick={() => setIsPhotoModalOpen(false)}>
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <Image src={photos[photoModalIndex]} alt={`Photo ${photoModalIndex + 1}`} width={600} height={600} className="object-contain rounded-lg max-h-[80vh] max-w-full" />
            </div>
          </div>
        )}
      </div>
      {/* Friends section */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Friends</h2>
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
    </div>
  );
};

export default ProfileSidebar; 