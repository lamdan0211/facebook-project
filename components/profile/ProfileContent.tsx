"use client";
import PostCard from '@/components/profile/PostCard';
import Image from 'next/image';
import CreatePostModal from '@/components/modals/CreatePostModal';
import React, { useState } from 'react';

interface PostData {
  author: {
    name: string;
    avatar: string;
  };
  timeAgo: string;
  content: string;
  imageUrl?: string;
  reactions: {
    like: number;
    love: number;
    haha: number;
    wow: number;
    sad: number;
    angry: number;
  };
  comments: Array<{
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    timeAgo: string;
  }>;
  shares: number;
}

const ProfileContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<PostData[]>([
    {
      author: {
        name: "John Doe",
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
      },
      timeAgo: "2 hours ago",
      content: "Having a great time!",
      imageUrl: "https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg",
      reactions: { like: 10, love: 5, haha: 2, wow: 1, sad: 0, angry: 0 },
      comments: [
        {
          author: {
            name: "Jane Smith",
            avatar: "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg"
          },
          content: "Looks amazing!",
          timeAgo: "1 hour ago"
        }
      ],
      shares: 3
    }
  ]);

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
        {/* Render PostCard components */}
        {posts.map((post, index) => (
          <PostCard 
            key={index} 
            avatarUrl={post.author.avatar}
            userName={post.author.name}
            postTime={post.timeAgo}
            postContent={post.content}
            postImageUrl={post.imageUrl}
            reactions={post.reactions}
            commentsCount={post.comments.length}
            sharesCount={post.shares}
          />
        ))}
      </div>
       {/* Create Post Modal */}
       {isModalOpen && <CreatePostModal onClose={handleCloseModal} />} {/* Render modal conditionally */}
    </div>
  );
};

export default ProfileContent; 