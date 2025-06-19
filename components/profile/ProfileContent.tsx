"use client";
import PostCard from '@/components/profile/PostCard';
import Image from 'next/image';
import CreatePostModal from '@/components/modals/CreatePostModal';
import React, { useState } from 'react';
import { PostData } from '@/lib/dummyData';
import { usePostContext } from '@/context/PostContext';
import { useAuth } from '@/components/auth/AuthContext';
import Avatar from '../user/Avatar';

const ProfileContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { posts, addNewPost, updatePost } = usePostContext();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const myEmail = user?.email || '';
  const myName = user?.displayName || user?.email || 'User';
  const myPosts = posts.filter(post =>
    (post.author.email && post.author.email === myEmail) ||
    post.author.name === myName ||
    (post.taggedPeople && post.taggedPeople.some(p => p.name === myName))
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
        <div className="flex items-center mb-4 gap-2">
          <Avatar author={{name:user?.fullname, avatar: "from-red-600 to-red-300"}} />
           <div
             onClick={handleOpenModal}
             className="flex-1 p-2 bg-gray-100 rounded-full text-sm text-gray-500 cursor-pointer hover:bg-gray-200"
             style={{ minHeight: '40px', paddingTop: '10px', paddingBottom: '10px' }}
           >
             What's on your mind, {user?.fullname}?
           </div>
        </div>
        <div className="flex justify-around border-t border-gray-200 pt-3 -mx-4 px-4">
           <button 
             onClick={handleOpenModal}
             className="flex items-center text-gray-600 hover:bg-gray-100 px-2 py-1 rounded-md text-sm font-semibold">
             <Image src="/images/icon-video.png" width={20} height={20} alt="Live Video"  className='gap-[10] flex mr-1'/>
             Video
           </button>
           <button 
             onClick={handleOpenModal}
             className="flex items-center text-gray-600 hover:bg-gray-100 px-2 py-1 rounded-md text-sm font-semibold">
              <Image src="/images/icon-photo.png" width={20} height={20} alt="Photo/Video"  className='gap-[10] flex mr-1'/>
              Photo
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
        {loading ? (
          <div className="text-center text-gray-400 py-8">Đang tải bài viết...</div>
        ) : myPosts.length === 0 ? (
          <div className="text-center text-gray-400 py-8">Chưa có bài viết nào.</div>
        ) : (
          myPosts.map((post, index) => (
            <PostCard 
              key={index}
              post={post}
              onEdit={updatedPost => updatePost(index, updatedPost)}
              onDelete={() => {
                const postIndex = posts.findIndex(p => p === post);
                if (postIndex !== -1) {
                  posts.splice(postIndex, 1);
                  updatePost(postIndex, { ...post, deleted: true });
                }
              }}
              index={index}
            />
          ))
        )}
      </div>
       {/* Create Post Modal */}
       {isModalOpen && <CreatePostModal onClose={handleCloseModal} addNew={addNewPost} />} {/* Render modal conditionally */}
    </div>
  );
};

export default ProfileContent; 