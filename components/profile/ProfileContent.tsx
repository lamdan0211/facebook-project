"use client";
import PostCard from '@/components/profile/PostCard';
import Image from 'next/image';
import CreatePostModal from '@/components/modals/CreatePostModal';
import React, { useState } from 'react';
import { PostData } from '@/lib/dummyData';
import { PostContext } from '@/context/PostContext';
import { useContext } from 'react';
import { useAuth } from '@/components/auth/AuthContext';

const ProfileContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { posts, addNewPost } = useContext(PostContext);
  const { user } = useAuth();

  // Lọc post: chỉ hiện bài của tôi, tôi được tag, hoặc tôi là người share
  const myName = user?.displayName || user?.email || 'User';
  const myPosts = posts.filter(post =>
    post.author.name === myName ||
    (post.taggedPeople && post.taggedPeople.some(p => p.name === myName))
    // Có thể mở rộng thêm điều kiện share nếu có trường shareBy
  );

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full md:w-2/3 space-y-4">
      {/* Create Post section */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Create Post</h2>
        <div className="flex items-center mb-4">
           <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-300 flex-shrink-0">
             {/* Placeholder for current user avatar */}
             {/* Using online placeholder image URL */}
             <Image src="https://source.unsplash.com/random/100x100?current-user-avatar,sig=25" alt="Your Avatar" width={40} height={40} objectFit="cover" />
           </div>
           <div
             onClick={handleOpenModal}
             className="flex-1 p-2 bg-gray-100 rounded-full text-sm text-gray-500 cursor-pointer hover:bg-gray-200"
             style={{ minHeight: '40px', paddingTop: '10px', paddingBottom: '10px' }}
           >
             What's on your mind, User Name?
           </div>
        </div>
        <div className="flex justify-around border-t border-gray-200 pt-3 -mx-4 px-4">
           <button 
             onClick={handleOpenModal}
             className="flex items-center text-gray-600 hover:bg-gray-100 px-2 py-1 rounded-md text-sm font-semibold">
             <Image src="/images/icon-video.png" width={20} height={20} alt="Live Video"  className='gap-[10] flex mr-1'/>
             Live Video
           </button>
           <button 
             onClick={handleOpenModal}
             className="flex items-center text-gray-600 hover:bg-gray-100 px-2 py-1 rounded-md text-sm font-semibold">
              <Image src="/images/icon-photo.png" width={20} height={20} alt="Photo/Video"  className='gap-[10] flex mr-1'/>
              Photo/Video
           </button>
           <button 
             onClick={handleOpenModal}
             className="flex items-center text-gray-600 hover:bg-gray-100 px-2 py-1 rounded-md text-sm font-semibold">
              <Image src="/images/icon-flag.png" width={20} height={20} alt="Feeling/Activity"  className='gap-[10] flex mr-1'/>
              Feeling/Activity
           </button>
        </div>
      </div>

      {/* Posts Feed section */}
      <div className="space-y-4">
        {myPosts.map((post, index) => (
          <PostCard 
            key={index}
            post={post}
          />
        ))}
      </div>
       {/* Create Post Modal */}
       {isModalOpen && <CreatePostModal onClose={handleCloseModal} addNew={addNewPost} />} {/* Render modal conditionally */}
    </div>
  );
};

export default ProfileContent; 