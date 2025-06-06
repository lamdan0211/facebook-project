"use client";
import PostCard from '@/components/profile/PostCard';
import Image from 'next/image';
import CreatePostModal from '@/components/modals/CreatePostModal';
import React, { useState } from 'react';

const ProfileContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Placeholder post data with online image URLs for avatars and post images
  const posts = [
    {
      avatarUrl: 'https://source.unsplash.com/random/100x100?avatar,sig=20', // Online placeholder avatar
      userName: 'User Name 1',
      postTime: '2 hours ago',
      postContent: 'Đây là nội dung của bài viết đầu tiên với hình ảnh giả lập.',
      postImageUrl: 'https://source.unsplash.com/random/600x400?post,sig=21', // Online placeholder post image
    },
    {
      avatarUrl: 'https://source.unsplash.com/random/100x100?person,sig=22', // Online placeholder avatar
      userName: 'User Name 2',
      postTime: 'Yesterday',
      postContent: 'Đây là nội dung của bài viết thứ hai. Nó dài hơn một chút để kiểm tra bố cục mà không có hình ảnh.',
      // No image for this post
    },
    {
      avatarUrl: 'https://source.unsplash.com/random/100x100?profile,sig=23', // Online placeholder avatar
      userName: 'User Name 3',
      postTime: '2 days ago',
      postContent: 'Nội dung bài viết thứ ba với một hình ảnh giả lập khác.',
      postImageUrl: 'https://source.unsplash.com/random/600x400?nature,sig=24', // Online placeholder post image
    },
  ];

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
        {/* Render PostCard components */}
        {posts.map((post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </div>
       {/* Create Post Modal */}
       {isModalOpen && <CreatePostModal onClose={handleCloseModal} />} {/* Render modal conditionally */}
    </div>
  );
};

export default ProfileContent; 